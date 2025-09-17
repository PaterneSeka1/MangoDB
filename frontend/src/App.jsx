import AddUser from './adduser/AddUser'
import './App.css'
import User from './getuser/User'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Update from './updateuser/Update'

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <User />,
    },
    {
      path:"/add",
      element:<AddUser />
    },
    {
      path:"/update/:id",
      element:<Update />
    }
  ])

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  )
}

export default App
