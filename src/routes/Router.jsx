import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseOrderList from "../pages/PurchaseOrder/PurchaseOrderList";
import Cancellation from "../pages/FreezerManagement/Cancellation";
import ModifyAndForward from "../pages/PurchaseOrder/ModifyAndForword";
import ChangeRequest from "../pages/FreezerManagement/ChangeRequest";



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
              {
                path: "/purchase-orders",
                element: (
        
                    <PurchaseOrderList />
                 
                ),
              },
              {
                path: "/cancellation",
                element: (
        
                    <Cancellation/>
                 
                ),
              },
                {
                  path:"/change-requests",
                  element: (
        
                    <ChangeRequest/>
                 
                ),
              },

           
              {
                path: "/modify-forward",
                element: <ModifyAndForward/>,
              },
        ]
    }
])