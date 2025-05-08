import React, { useState, useEffect } from "react";
import {
  ExpandMore,
  ExpandLess,
  ChevronRight,
  Settings,
} from "@mui/icons-material";
import sequel from "../../assets/images/sequel.png";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GrassIcon from '@mui/icons-material/Grass';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import DoNotDisturbOutlinedIcon from '@mui/icons-material/DoNotDisturbOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

export const Sidebar = () => {
  const location = useLocation();
  const [role, setRole] = useState();
  const [name, setName] = useState(""); 
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role") || "admin";
    const name = localStorage.getItem("name") || "User";
    // const firstName = localStorage.getItem("firstName") || "";
    // const lastName = localStorage.getItem("lastName") || "";
    setRole(role);
    setName(name); 
    
   
  }, [localStorage.getItem("role"), localStorage.getItem("name")]);

  const [dropdowns, setDropdowns] = useState({
    Dashboard: false,
    EmployeeManagement: false,
    DistributorManagement:false,
    StoreManagement: false,
    FreezerManagement: false,
    Task:false,
    Sales: false,
    ProductListing: false,
    FinderAI: false,
    Stock: false,
  });

  const menuItems = [
    {
      key: "Dashboard",
      icon: <DashboardIcon sx={{ fontSize: 17.5 }} />,
      title: "Dashboard",
      roles: ["admin"],
    //   submenus: [
    //     {
    //       key: "Overview",
    //       icon: <FormatListBulletedOutlinedIcon sx={{ fontSize: 17.5 }} />,
    //       title: "Overview",
    //       path: "/",
    //     },
    //   ],
    },
    {
      key: "Orders",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Orders",
      roles: ["admin"],
      submenus: [
        {
          key: "Purchase Orders",
          icon: <LocalOfferOutlinedIcon sx={{ fontSize: 17.5 }} />,
          title: "Purchase Orders",
          path: "/purchase-orders",
        },
        {
          key: "Factory Orders",
          icon: <StoreOutlinedIcon sx={{ fontSize: 17.5 }} />,
          title: "Factory Orders",
          path: "/factory-orders",
        },
      ],
    },
    {
      key: "Freezer Management",
      icon: <KitchenOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Freezer Management",
      roles: ["admin"],
      submenus: [
        {
          key: "Cancellations",
          icon: <DoNotDisturbOutlinedIcon sx={{ fontSize: 17.5 }} />,
          title: "Cancellations",
          path: "/cancellation",
        },
        // {
        //     key: "Change Requests",
        //     icon: <PersonIcon sx={{ fontSize: 17.5 }} />,
        //     title: "Change Requests",
        //     path: "/change-requests",
        //   },
          // {
          //   key: "New Freezer Request",
          //   icon: <AddBoxOutlinedIcon sx={{ fontSize: 17.5 }} />,
          //   title: "New Freezer Request",
          //   path: "/new-Freezer-request",
          // },
      ],
    },
    {
      key: "Freezer Tracking",
      icon: <LocalShippingOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Freezer Tracking",
      roles: ["admin"],
      submenus: [
        // {
        //   key: "Product Movement",
        //   icon: <FormatListBulletedOutlinedIcon sx={{ fontSize: 17.5 }} />,
        //   title: "Product Movement",
        //   path: "/product-movement",
        // },
        // {
        //   key: "Freezer Temperature",
        //   icon: <AcUnitOutlinedIcon sx={{ fontSize: 17.5 }} />,
        //   title: "Freezer Temperature",
        //   path: "/freezer-temperature",
        // },
      ],
    },
    {
      key: "Compliance",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Compliance",
      roles: ["admin", "distributor"],
      submenus: [
        // {
        //   key: "Purchase Orders",
        //   icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
        //   title: "Purchase Orders",
        //   path: "/purchase-orders",
        // },
      ],
    },
    {
      key: "Branding Management",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Branding Management",
      roles: ["admin"],
      submenus: [
        // {
        //   key: "Freezer lists",
        //   icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
        //   title: "Freezer lists",
        //   path: "/freezer-list",
        // },
      ],
    },

    {
      key: "Stoke Placement",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Stoke Placement",
      roles: ["admin"],
      submenus: [
        // {
        //   key: "Task lists",
        //   icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
        //   title: "Tasks Lists",
        //   path: "/task-list",
        // },
        // {
        //   key: "Task creation",
        //   icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
        //   title: "Tasks Creation",
        //   path: "/task-creation",
        // },
      ],
    },
    {
      key: "Incentives & Rewards",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Incentives & Rewards",
      roles: ["admin"],
      submenus: [
        // {
        //   key: "Products",
        //   icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
        //   title: "Products",
        //   path: "/product-list",
        // },
      ],
    },
  ];

  // Auto-open dropdown if current path is inside any submenu
  useEffect(() => {
    const updatedDropdowns = {};
    menuItems.forEach((menu) => {
      const match = menu.submenus?.some((submenu) =>
        location.pathname.startsWith(submenu.path)
      );
      updatedDropdowns[menu.key] = match;
    });
    setDropdowns(updatedDropdowns);
  }, [location.pathname]);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...Object.keys(prev).reduce((acc, k) => {
        acc[k] = k === key ? !prev[k] : false;
        return acc;
      }, {}),
    }));
  };

  return (
    <>
      <Navbar />
      <div className="hidden md:block w-[311px] min-h-screen fixed bg-white shadow-md p-4 z-50">
        <div className="flex items-center space-x-2">
          <img src={sequel} alt="Logo" className="w-[100px] mt-2 ml-2" />
          <span className="text-gray-500 italic font-bold text-sm">ERP</span>
        </div>
        <p className="text-gray-400 ml-2 mt-1 text-xs">Version 1.0</p>

        <div className="mt-6 space-y-3">
          {menuItems
            .filter((menu) => menu.roles.includes(role)) // 👈 filter by role
            .map((menu) => (
              <div key={menu.key}>
                <p
                  className={`flex justify-between items-center px-4 py-2 rounded-md cursor-pointer ${
                    dropdowns[menu.key]
                      ? "bg-[#F3FFF3] text-[#14BA6D]"
                      : "text-[#5A5862] text-[16px]"
                  }`}
                  onClick={() => toggleDropdown(menu.key)}
                >
                  <div className="flex gap-2 items-center">
                    {menu.icon}
                    <span>{menu.title}</span>
                  </div>
                  {menu.submenus &&
                    (dropdowns[menu.key] ? <ExpandLess /> : <ExpandMore />)}
                </p>

                {dropdowns[menu.key] &&
                  menu.submenus?.map((submenu) => {
                    const isActive = location.pathname === submenu.path;
                    return (
                      <Link to={submenu.path} key={submenu.key}>
                        <p
                          className={`ml-6 px-3 py-2 rounded-md cursor-pointer ${
                            isActive
                              ? "bg-[#14BA6D] text-white"
                              : "text-gray-600 text-[16px]"
                          }`}
                        >
                          <div className="flex gap-2 items-center">
                            {submenu.icon}
                            <span>{submenu.title}</span>
                          </div>
                        </p>
                      </Link>
                    );
                  })}
              </div>
            ))}
        </div>

  {/* Footer */}
<div className="absolute bottom-4 left-4 right-4 w-full">
  <div className="p-3 rounded-lg flex items-center justify-between w-full gap-3">
    <div className="flex gap-2 items-center justify-between bg-[#F3FFF3] w-[80%] rounded-md">
      <div className="flex items-center space-x-3 cursor-pointer">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <p className="text-gray-900 font-medium"> {name}</p> 
      </div>
      <ChevronRight className="text-gray-600 cursor-pointer" />
    </div>
    <div className="flex items-center justify-center bg-[#F3FFF3] w-[20%] h-10 me-8 rounded-md">
      <Settings className="text-gray-600 cursor-pointer" />
    </div>
  </div>
  <p className="text-gray-500 text-xs mt-1 ml-2">Department: F&L</p>
</div>
      </div>
    </>
  );
};
