import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseOrderList from "../pages/PurchaseOrder/PurchaseOrderList";
import StoreView from "../pages/PurchaseOrder/StoreView";



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
                path: "/store-view",
                element: <StoreView/>,
              },
        ]
    }
])