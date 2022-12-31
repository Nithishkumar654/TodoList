import React from 'react'
import Root from './components/Root'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
function App() {
  let router=createBrowserRouter([
    {
      path:'/',
      element:<Root/>,
      children:[
        {
          path:'/',
          element:<AddTask/>
        },
        {
          path:'/tasklist',
          element:<TaskList/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App