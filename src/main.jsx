import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskDetailsPage from './pages/task-details.jsx'
import App from './App.jsx'
import { Toaster } from 'sonner'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/task/:taskId',
    element: <TaskDetailsPage></TaskDetailsPage>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        style: {
          color: '#35383e',
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
)
