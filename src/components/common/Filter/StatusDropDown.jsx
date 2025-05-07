import React, { useRef,useState,useEffect } from 'react';
import { createPortal } from "react-dom";

const StatusDropdown = ({ anchorRef, isOpen, onClose, selected, setSelected, options = [] }) => {
    const dropdownRef = useRef();
  
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
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);
  
    if (!isOpen || !anchorRef?.current) return null;
  
    const rect = anchorRef.current.getBoundingClientRect();
  
    return createPortal(
      <div
        ref={dropdownRef}
        className="absolute z-50 w-52 bg-white px-1 rounded-md shadow-lg  mt-1"
        style={{
          top: rect.bottom + window.scrollY + 5,
          left: rect.left + window.scrollX,
        }}
      >
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
              className="form-radio text-green-500 rounded mr-2"
            />
            <span className="text-gray-800">{option}</span>
          </div>
        ))}
      </div>,
      document.body
    );
  };

export default StatusDropdown;