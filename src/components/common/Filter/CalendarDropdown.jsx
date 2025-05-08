import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";

const CalendarDropdown = ({
  anchorRef,
  isOpen,
  onClose,
  selected,
  setSelected
}) => {
  const dropdownRef = useRef();

  // Main state
  const [dateRange, setDateRange] = useState(
    selected || [new Date(), new Date()]
  );
  const [tempEndDate, setTempEndDate] = useState(
    selected ? selected[1] : new Date()
  );
  const [focus, setFocus] = useState("start"); // 'start' or 'end'
  const [isSelecting, setIsSelecting] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [currentYearBlock, setCurrentYearBlock] = useState(0);

  // Sync external `selected` changes
  useEffect(() => {
    if (selected) {
      setDateRange(selected);
      setTempEndDate(selected[1]);
    }
  }, [selected]);

  // Init year block when year dropdown opens
  useEffect(() => {
    if (showYearDropdown) {
      const y = currDate().getFullYear();
      setCurrentYearBlock(Math.floor(y / 12) * 12);
    }
  }, [showYearDropdown]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        anchorRef?.current &&
        !anchorRef.current.contains(e.target)
      ) {
        onClose();
        setShowYearDropdown(false);
        setShowMonthDropdown(false);
        setShowDatePicker(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  // Finish selection on mouse up
  useEffect(() => {
    const handleMouseUp = () => {
      if (isSelecting) setIsSelecting(false);
    };
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [isSelecting]);

  if (!isOpen || !anchorRef?.current) return null;
  const rect = anchorRef.current.getBoundingClientRect();

  // Year & Month options
  const yearsPerBlock = 20;
  const years = Array.from({ length: yearsPerBlock }, (_, i) => currentYearBlock - 6 + i);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Helpers for shared focus
  const currIdx = focus === "start" ? 0 : 1;
  const currDate = () => (currIdx === 0 ? dateRange[0] : tempEndDate);
  const setCurrDate = (newDate) => {
    if (currIdx === 0) {
      setDateRange([newDate, tempEndDate]);
    } else {
      setTempEndDate(newDate);
      setDateRange([dateRange[0], newDate]);
    }
  };

  // Handlers for year/month selection
  const handleYearSelect = (year) => {
    const updated = new Date(currDate());
    updated.setFullYear(year);
    setCurrDate(updated);
    setShowYearDropdown(false);
    setShowDatePicker(true);
  };
  const handleMonthSelect = (mi) => {
    const updated = new Date(currDate());
    updated.setMonth(mi);
    setCurrDate(updated);
    setShowMonthDropdown(false);
    setShowDatePicker(true);
  };

  // Mouse drag for date range (only for end side)
  const handleDateMouseDown = (date) => {
    setIsSelecting(true);
    if (focus === "start") {
      setDateRange([date, date]);
      setTempEndDate(date);
    } else {
      setTempEndDate(date);
      if (date < dateRange[0]) setDateRange([date, date]);
      else setDateRange([dateRange[0], date]);
    }
  };
  const handleDateMouseEnter = (date) => {
    if (!isSelecting || focus === "start") return;
    setTempEndDate(date);
    if (date < dateRange[0]) setDateRange([date, date]);
    else setDateRange([dateRange[0], date]);
  };

  // Apply / Cancel
  const handleApply = () => {
    setSelected([dateRange[0], tempEndDate]);
    onClose();
  };
  const handleCancel = () => {
    setDateRange(selected || [new Date(), new Date()]);
    setTempEndDate(selected ? selected[1] : new Date());
    onClose();
  };

  // Build days grid for currDate()
  const getMonthDays = () => {
    const year = currDate().getFullYear();
    const month = currDate().getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    // prev month
    for (let i = firstDay.getDay() - 1; i >= 0; i--) {
      const d = new Date(firstDay);
      d.setDate(d.getDate() - (i + 1));
      days.push({ date: d, currentMonth: false });
    }
    // current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({ date: new Date(year, month, d), currentMonth: true });
    }
    // next fillers
    for (let i = 1; i <= 6 - lastDay.getDay(); i++) {
      const d = new Date(lastDay);
      d.setDate(d.getDate() + i);
      days.push({ date: d, currentMonth: false });
    }
    return days;
  };

  const monthDays = getMonthDays();
  const weeks = [];
  for (let i = 0; i < monthDays.length; i += 7) weeks.push(monthDays.slice(i, i + 7));

  return createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-50 bg-white rounded shadow-md p-4"
      style={{ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: 300 }}
    >
      {/* Focus Toggle */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setFocus("start")}
          className={`px-2 py-1 rounded ${focus==="start"?"bg-green-400 text-white":"hover:bg-gray-100"}`}
        >Start</button>
        <button
          onClick={() => setFocus("end")}
          className={`px-2 py-1 rounded ${focus==="end"?"bg-green-400 text-white":"hover:bg-gray-100"}`}
        >End</button>
      </div>

      {/* Date Picker */}
      {showDatePicker && (
        <>
          <div className="flex justify-between items-center mb-4">
            <button onClick={()=>{
                const prev=new Date(currDate()); prev.setMonth(prev.getMonth()-1); setCurrDate(prev);
              }} className="text-xl px-2 hover:text-green-500">‹</button>
            <div className="flex items-center gap-1">
              <button onClick={()=>{ setShowMonthDropdown(true); setShowDatePicker(false); }} className="text-sm font-medium hover:text-green-500">
                {format(currDate(), "MMMM")}
              </button>,
              <button onClick={()=>{ setShowYearDropdown(true); setShowDatePicker(false); }} className="text-sm font-medium hover:text-green-500">
                {currDate().getFullYear()}
              </button>
            </div>
            <button onClick={()=>{
                const nxt=new Date(currDate()); nxt.setMonth(nxt.getMonth()+1); setCurrDate(nxt);
              }} className="text-xl px-2 hover:text-green-500">›</button>
          </div>

          <table className="w-full">
            <thead><tr className="text-green-500 text-sm">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>(<th key={d} className="font-normal pb-2">{d}</th>))}
            </tr></thead>
            <tbody>
              {weeks.map((week, wi)=>(<tr key={wi}>
                {week.map(({date,currentMonth}, di)=>{
                  const inRange = date>=dateRange[0] && date<=tempEndDate;
                  const isStart = date.getTime()===dateRange[0].getTime();
                  const isEnd   = date.getTime()===tempEndDate.getTime();
                  const isSingle= isStart && isEnd;
                  return (<td key={di} className="text-center p-0 relative">
                    <div className="relative h-9 flex items-center justify-center">
                      {inRange && currentMonth && !isSingle && (
                        <div className={`absolute top-1/2 left-0 right-0 h-8 transform -translate-y-1/2 bg-green-400 z-0 ${isStart?"rounded-l-full":""} ${isEnd?"rounded-r-full":""}`}/>
                      )}
                      <button
                        className={`w-8 h-8 text-sm flex items-center justify-center relative z-10 ${!currentMonth?"text-gray-400":""} ${isSingle?"rounded-full bg-green-400 text-white":""} ${isStart&&!isSingle?"bg-green-400 text-white rounded-l-full":""} ${isEnd&&!isSingle?"bg-green-400 text-white rounded-r-full":""} ${inRange&&!isStart&&!isEnd?"text-white":""}`}
                        onMouseDown={()=>currentMonth && handleDateMouseDown(date)}
                        onMouseEnter={()=>currentMonth && handleDateMouseEnter(date)}
                      >{date.getDate()}</button>
                    </div>
                  </td>);
                })}
              </tr>))}
            </tbody>
          </table>

          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={handleCancel} className="px-4 py-2 text-sm hover:bg-gray-100 rounded">Cancel</button>
            <button onClick={handleApply} className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600">Apply</button>
          </div>
        </>
      )}

      {/* Year Dropdown */}
      {showYearDropdown && (
        <div className="w-64 p-2">
          <div className="flex justify-between items-center mb-2">
            <button onClick={()=>setCurrentYearBlock(b=>b-yearsPerBlock)} className="hover:text-green-500 px-2">‹</button>
            <div className="font-medium">{years[0]} - {years[years.length-1]}</div>
            <button onClick={()=>setCurrentYearBlock(b=>b+yearsPerBlock)} className="hover:text-green-500 px-2">›</button>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {years.map(y=>(<button key={y} onClick={()=>handleYearSelect(y)} className={`p-3 text-center rounded-full text-sm ${y===currDate().getFullYear()?"bg-green-400 text-white":"hover:bg-gray-100"}`}>{y}</button>))}
          </div>
        </div>
      )}

      {/* Month Dropdown */}
      {showMonthDropdown && (
        <div className="w-64 p-2">
          <div className="text-center font-medium mb-2">{currDate().getFullYear()}</div>
          <div className="grid grid-cols-3 gap-2">
            {months.map((m,i)=>(<button key={m} onClick={()=>handleMonthSelect(i)} className={`p-2 text-center rounded-full text-sm ${i===currDate().getMonth()?"bg-green-400 text-white":"hover:bg-gray-100"}`}>{m}</button>))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default CalendarDropdown;
