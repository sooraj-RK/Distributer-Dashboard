import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import PurchaseOrderList from "../pages/PurchaseOrder/PurchaseOrderList";
import StoreView from "../pages/PurchaseOrder/StoreView";
import Cancellation from "../pages/FreezerManagement/Cancellation";
import FactoryOrders from "../pages/FactoryOrder/FactoryOrderList";



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
                path: "/store-view",
                element: <StoreView/>,
              },
              {
                path: "/factory-orders",
                element: <FactoryOrders/>,
              }
        ]
    }
])