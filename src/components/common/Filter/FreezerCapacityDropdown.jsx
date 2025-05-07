import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import Slider from '@mui/material/Slider';

const FreezerCapacityDropdown = ({ anchorRef, isOpen, onClose, selected, setSelected }) => {
  const dropdownRef = useRef();
  const sliderRef = useRef();
  // parse incoming “selected” string or fall back to [100,350]
  const [range, setRange] = useState(
    typeof selected === 'string' && selected.includes(' - ')
      ? selected.split(' - ').map(Number)
      : [100, 350]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isSliderInteraction =
        sliderRef.current?.contains(e.target) ||
        e.target.closest('.MuiSlider-root');

      if (
        isOpen &&
        !isSliderInteraction &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        // commit the final value when clicking outside
        setSelected(`${range[0]} - ${range[1]}`);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, range, setSelected]);

  if (!isOpen || !anchorRef?.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();

  return createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-50 bg-white rounded-xl shadow p-4 w-72"
      style={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      }}
      role="dialog"
      aria-label="Freezer capacity range selector"
    >
      <div className="text-center font-semibold text-gray-800 mb-4 text-sm">
        Select Range
      </div>

      <div className="flex justify-between text-sm mb-2 px-1">
        <div className="px-2 py-1 bg-white shadow rounded">{range[0]}</div>
        <div className="px-2 py-1 bg-white shadow rounded">{range[1]}</div>
      </div>

      <div ref={sliderRef}>
        <Slider
          value={range}
          onChange={(_, newValue) => setRange(newValue)}
          onChangeCommitted={() => setSelected(`${range[0]} - ${range[1]}`)}
          min={0}
          max={600}
          disableSwap
          valueLabelDisplay="off"
          getAriaLabel={() => 'Freezer Capacity'}
          getAriaValueText={(value) => `${value} liters`}
          sx={{
            color: '#FF6B35',
            height: 8,
            '& .MuiSlider-thumb': {
              height: 20,
              width: 20,
              backgroundColor: '#fff',
              border: '2px solid #FF6B35',
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: '0 0 0 8px rgba(255, 107, 53, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              height: 8,
              borderRadius: 4,
            },
            '& .MuiSlider-rail': {
              height: 8,
              borderRadius: 4,
              backgroundColor: '#FFE8DF',
            },
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>600</span>
      </div>
    </div>,
    document.body
  );
};

export default FreezerCapacityDropdown;
