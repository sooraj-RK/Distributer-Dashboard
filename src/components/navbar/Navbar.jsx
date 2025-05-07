import React from "react";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let heading = "Page";

  if (pathname === "/" || pathname === "/dashboard") {
    heading = "Dashboard";
  } else if (pathname.startsWith("/employee-management")) {
    heading = "Employee Management";
  } else if (pathname.startsWith("/employee-list")) {
    heading = "Employee List";
  } else if (pathname.startsWith("/dash-overview")) {
    heading = "Overview";
  } else if (pathname.startsWith("/product-list")) {
    heading = "Products";
  } else if (
    /^\/view\/employee\/[^/]+\/(overview|attendance|tasks|routes-store)$/.test(
      pathname
    )
  ) {
    heading = "Employee Overview";
  } else if (pathname.startsWith("/purchase-orders")) {
    heading = "Orders";
  } else if (pathname.startsWith("/store-list")) {
    heading = "Store";
  } else if (pathname.startsWith("/finder-ai")) {
    heading = "Finder AI";
  } else if (pathname.startsWith("/store-row")) {
    heading = "Store Details";
  }else if (pathname.startsWith("/freezer-list")) {
    heading = "Freezer List";
  }else if (pathname.startsWith("/task-list")) {
    heading = "Tasks";
  }else if (pathname.startsWith("/task-creation")) {
    heading = "Tasks";
  }else if (pathname.startsWith("/add-employee")) {
    heading = "Add Employee";
  }else if (pathname.startsWith("/add-freezer")) {
    heading = "Add Freezer";
  }else if (pathname.startsWith("/newstore-request")) {
    heading = "New Store Request";
  }else if (pathname.startsWith("/storerequest-row")) {
    heading = "New Store Request";
  }else if (pathname.startsWith("/distributor-list")) {
    heading = "Distributor Listing";
  }else if (pathname.startsWith("/add-distributor")) {
    heading = "Add New Distributor";
  }else if (pathname.startsWith("/addnew-freezer")) {
    heading = "Add New Freezer";
  }else if (pathname.startsWith("/distributor-details")) {
    heading = "Distributor Listing";
  }

  

  const today = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const formattedDate = today
    .toLocaleDateString("en-US", options)
    .replace(",", " ,");

  return (
    <div className="w-full fixed h-[70px] border z-40 md:ps-[327px] px-[26px] flex justify-between items-center bg-white">
      <h2 className="text-[24px] text-[#585858] font-semibold">{heading}</h2>
      <p className="text-[#585858] text-[16px] font-normal">{formattedDate}</p>
    </div>
  );
};