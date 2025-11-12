import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> }
    ]
  }
])

export default router

