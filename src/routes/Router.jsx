import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseOrderList from "../pages/PurchaseOrder/PurchaseOrderList";
import Cancellation from "../pages/FreezerManagement/Cancellation";
import CancellationRequest from "../pages/FreezerManagement/CancellationRequest";
import ModifyAndForward from "../pages/PurchaseOrder/ModifyAndForword";




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

                path: "/cancellation-request",
                element: (
                    <CancellationRequest/>
                 ),
              },
              {
                path: "/store-view",
                element: <StoreView/>,

                path: "/modify-forward",
                element: <ModifyAndForward/>,

              },
        ]
    }
])