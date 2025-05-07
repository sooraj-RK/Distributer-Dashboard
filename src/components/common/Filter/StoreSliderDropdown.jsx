import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const PrettoSlider = styled(Slider)({
  color: '#22c55e', // green-500
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#22c55e',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid #22c55e',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(34, 197, 94, 0.16)', // green-500 shadow
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#bbf7d0', // green-200
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  },
});

const StoreSliderDropdown = ({ anchorRef, isOpen, onClose, selected, setSelected, valueFormatter }) => {
  const dropdownRef = useRef();
  const sliderRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [displayValue, setDisplayValue] = useState(selected);

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

  useEffect(() => {
    setDisplayValue(selected);
  }, [selected]);

  if (!isOpen || !anchorRef?.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  const handleChange = (_, newValue) => {
    setSelected(newValue);
  };

  const handleChangeCommitted = (_, newValue) => {
    setDisplayValue(newValue);
  };

  return createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-50 bg-white rounded-md shadow p-4 w-72"
      style={{
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      }}
    >
      <div className="text-center font-semibold text-gray-700 mb-2">
        {valueFormatter ? valueFormatter(displayValue) : `0-${displayValue}`}
      </div>

      <div className="relative py-4 px-2">
        <PrettoSlider
          ref={sliderRef}
          value={displayValue}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          min={0}
          max={100}
          valueLabelDisplay="off"
          aria-labelledby="store-slider"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>0</span>
        <span>100</span>
      </div>
    </div>,
    document.body
  );
};

export default StoreSliderDropdown;
