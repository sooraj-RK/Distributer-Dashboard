import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from "react-dom";

const MerchandiserDropdown = ({ anchorRef, isOpen, onClose, selected, setSelected }) => {
    const dropdownRef = useRef();
    const [searchTerm, setSearchTerm] = useState("");
    const options = [
      "XIJK12RF4567",
      "ABJK12RF4567", 
      "CDJK12RF4567",
      "EFJK12RF4567",
      "GHJK12RF4567",
      "GHJK12RF4567"
    ];
  
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
      const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      return createPortal(
        <div
          ref={dropdownRef}
          className="absolute z-50 w-64 bg-white rounded-md shadow border-gray-400 mt-1"
          style={{ 
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            maxHeight: "300px",
            overflowY: "auto",
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none" // For IE and Edge
          }}
        >
          {/* Add this style tag to hide scrollbar for WebKit browsers */}
          <style>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="p-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border-b-1 border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex flex-col px-1 rounded ">
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setSelected(option);
                  onClose();
                }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <div className="text-gray-400 font-medium">{option}</div>
              </div>
            ))}
          </div>
        </div>,
        document.body
      );
};

export default MerchandiserDropdown;