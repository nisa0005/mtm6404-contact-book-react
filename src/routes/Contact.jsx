import { useState, useEffect } from 'react'
import db from '../utils/db'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { useParams, useNavigate } from "react-router-dom"
import { EditForm } from "../components/EditForm"

export const Contact = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [contact, setContact] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchContactById = async (contactId) => {
    setLoading(true)
    const docRef = doc(db, "contacts", contactId)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      setContact({ id: docSnapshot.id, ...docSnapshot.data() })
    } else {
      alert('Contact does not exist in our records.')
      navigate('/')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchContactById(id)
  }, [id])

  const handleUpdate = async (updatedContact) => {
    try {
      const docRef = doc(db, "contacts", id)
      await updateDoc(docRef, updatedContact)
      setContact({ id, ...updatedContact })
      setIsEditing(false)
    } catch (error) {
      alert("There was a problem updating the contact. Please try again.")
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const docRef = doc(db, "contacts", id)
      await deleteDoc(docRef)
      navigate('/')
    }
  }

  if (loading) return <p>Loading contact details...</p>

  return (
    <div>
      <h1>Contact Details</h1>

      {!isEditing ? (
        <div className="contact-details">
          <p><strong>First Name:</strong> {contact.firstName}</p>
          <p><strong>Last Name:</strong> {contact.lastName}</p>
          <p><strong>Email:</strong> {contact.email}</p>

          <button onClick={() => setIsEditing(true)}>Edit Contact</button>
          <button onClick={handleDelete}>Delete Contact</button>
          <button onClick={() => navigate('/')}>Back to List</button>
        </div>
      ) : (
        <EditForm contact={contact} onUpdate={handleUpdate} />
      )}
    </div>
  )
}

export default Contact
