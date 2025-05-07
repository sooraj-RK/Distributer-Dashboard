import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index: true,
                element: <Navigate to="/" replace />,
              },
              {
                path: "/dashboard",
                element: <Dashboard/>,
              },
        ]
    }
])