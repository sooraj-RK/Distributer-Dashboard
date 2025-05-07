import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const StoreTypeDropdown = ({ anchorRef, isOpen, onClose, selected, setSelected }) => {
  const dropdownRef = useRef();
  const options = ["All", "Supermarket", "Convenience Store", "Dairy Outlet", "Ice Cream Parlor", "Grocery Store"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !anchorRef?.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-50 w-52 bg-white p-1 rounded-md shadow  mt-1"
      style={{
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        maxHeight: "200px",
        overflowY: "auto",
        scrollbarWidth: "none", 
        msOverflowStyle: "none"
      }}
    >

        <style>{`
                    ::-webkit-scrollbar {
                    display: none;
                    }
                `}</style>

                
      {options.map((option) => (
        <div
          key={option}
          onClick={() => {
            setSelected(option);
            onClose();
          }}
          className="flex items-center px-2 py-2 rounded cursor-pointer hover:bg-gray-100"
        >
          <input
            type="checkbox"
            checked={selected === option}
            readOnly
            className="form-checkbox text-green-500 rounded mr-2"
          />
          <span className="text-gray-800">{option}</span>
        </div>
      ))}
    </div>,
    document.body
  );
};

export default StoreTypeDropdown;
