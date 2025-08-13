import { useState } from "react"
import db from "../utils/db"
import { collection, addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const Add = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const c = collection(db, "contacts")
        try {        
        const contact = await addDoc(c, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }) 
        
        setFormData ({
            firstName: '',
        lastName: '',
        email: ''
        })

        navigate ('/')
    } catch (error) {
        alert("There was a problem adding the contact. Please try again later.")
    }
    }

    return (
        <>
        <h1>Add Contact</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/>
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
            <button type="submit">Add Contact</button>
        </form>
        </>
    )
}

export default Add