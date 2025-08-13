import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from '../App.jsx'
import Contact from "../routes/Contact.jsx"
import Add from "../routes/Add.jsx"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/add',
        element: <Add />
    },
    {
        path: '/contact/:id',
        element: <Contact />
    }
])

export default router
