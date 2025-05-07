import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";

export const MainLayout = () => {


  return (
    <div className="flex">
      <Sidebar/>
      <div className="md:ms-[311px] mt-[70px] w-full px-6 py-7">
        <Outlet />
      </div>
    </div>
  );
};
