import React, { useState, useEffect } from "react";
import {
  ExpandMore,
  ExpandLess,
  ChevronRight,
  Settings,
} from "@mui/icons-material";
import sequel from "../../assets/images/sequel.png";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GrassIcon from '@mui/icons-material/Grass';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
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
      submenus: [
        {
          key: "Overview",
          icon: <FormatListBulletedOutlinedIcon sx={{ fontSize: 17.5 }} />,
          title: "Overview",
          path: "/",
        },
      ],
    },
    {
      key: "EmployeeManagement",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Employee Management",
      roles: ["admin"],
      submenus: [
        {
          key: "Employee Listing",
          icon: <PersonIcon sx={{ fontSize: 17.5 }} />,
          title: "Employee Listing",
          path: "/employee-list",
        },
        {
          key: "Attendence",
          icon: <PersonIcon sx={{ fontSize: 17.5 }} />,
          title: "Attendence",
          path: "/attendence",
        },
      ],
    },
    {
      key: "Distributor Management",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Distributor Management",
      roles: ["admin"],
      submenus: [
        {
          key: "Distributor Listing",
          icon: <PersonIcon sx={{ fontSize: 17.5 }} />,
          title: "Distributor Listing",
          path: "/distributor-list",
        },
      ],
    },
    {
      key: "StoreManagement",
      icon: <GrassIcon sx={{ fontSize: 17.5 }} />,
      title: "Store Management",
      roles: ["admin"],
      submenus: [
        {
          key: "Store Listing",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "Store Listing",
          path: "/store-list",
        },
        {
          key: "New Store Request",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "New Store Request",
          path: "/newstore-request",
        },
      ],
    },
    {
      key: "Sales",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Sales",
      roles: ["admin", "distributor"],
      submenus: [
        {
          key: "Purchase Orders",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "Purchase Orders",
          path: "/purchase-orders",
        },
      ],
    },
    {
      key: "FreezerManagement",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Freezer Management",
      roles: ["admin"],
      submenus: [
        {
          key: "Freezer lists",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "Freezer lists",
          path: "/freezer-list",
        },
      ],
    },

    {
      key: "Task",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Tasks",
      roles: ["admin"],
      submenus: [
        {
          key: "Task lists",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "Tasks Lists",
          path: "/task-list",
        },
        {
          key: "Task creation",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "Tasks Creation",
          path: "/task-creation",
        },
      ],
    },
    {
      key: "ProductListing",
      icon: <InventoryOutlinedIcon sx={{ fontSize: 17.5 }} />,
      title: "Product Listing",
      roles: ["admin"],
      submenus: [
        {
          key: "Products",
          icon: <Inventory2Icon sx={{ fontSize: 17.5 }} />,
          title: "Products",
          path: "/product-list",
        },
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
                      ? "bg-[#e6d9b2] text-[#b5930b]"
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
                              ? "bg-[#f69c26] text-white"
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
    <div className="flex gap-2 items-center justify-between bg-[#F7F8F9] w-[80%] rounded-md">
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
    <div className="flex items-center justify-center bg-[#F7F8F9] w-[20%] h-10 me-8 rounded-md">
      <Settings className="text-gray-600 cursor-pointer" />
    </div>
  </div>
  <p className="text-gray-500 text-xs mt-1 ml-2">Department: F&L</p>
</div>
      </div>
    </>
  );
};
