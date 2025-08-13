import { useState, useEffect, useMemo } from 'react'
import db from './utils/db'
import { collection, getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './App.css'

const App = () => {
  const [contactList, setContactList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)
      try {
        const snapshot = await getDocs(collection(db, "contacts"))
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setContactList(data)
      } catch (error) {
        console.error("Error fetching contacts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const filteredContacts = useMemo(() => {
    return contactList
      .filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => a.lastName.localeCompare(b.lastName))
  }, [contactList, search])

  if (loading) return <p>Loading contacts...</p>

  return (
    <div>
      <h1>Contact List</h1>
      <Link to="/add">
        <button>Add Contact</button>
      </Link>

      {/* Search bar */}
      <div style={{ margin: '10px 0' }}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <ul>
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <li key={contact.id}>
              <Link to={`/contact/${contact.id}`}>
                {`${contact.firstName} ${contact.lastName}`}
              </Link>
            </li>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </ul>
    </div>
  )
}

export default App
