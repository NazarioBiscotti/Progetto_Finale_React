import { RouterProvider } from 'react-router-dom'
import router from './routing/router'
import './App.css'
import UserContextProvider from './context/UserContext'
function App() {

  return (
    <>
  <UserContextProvider>

      <RouterProvider router={router} />
  </UserContextProvider>

    </>
  )
}

export default App
