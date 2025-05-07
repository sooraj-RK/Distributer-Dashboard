import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { DownloadCloud } from 'lucide-react';
import FilterHeader from "./Filter/FilterHeader";

const SearchInput = ({ value, onChange, searchPlaceholder }) => (
  <div className="relative w-32 md:w-64 flex-shrink-0">
    <input
      type="text"
      name="search"
      placeholder={searchPlaceholder}
      value={value}
      onChange={onChange}
      className='bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-full'
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg
        className="h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  </div>
);

const Header = ({
  title,
  subtitle,
  brandName,
  selectedRows = [],
  filtersConfig = [],
  onApply,
  onClear,
  addPath,
  addButtonText = [],
  onAddClick,
  toPDF,
  searchValue,
  onSearchChange,
  onExportClick,
  showFilter = true,
  showExports = false,
  showAdd = true,
  showModify= false,
  showTitle = true,
  showBrandName = false,
  showSearch = true,
  searchPlaceholder = "",
  isFilterActive,
  handleFilterToggle,
  showExport = false
}) => {
  const [isExportActive, setIsExportActive] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    } else {
      navigate(addPath);
    }
  };

  return (
    <div className="p-4 md:pl-[19px] flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center mb-4">
      <div className="w-full md:w-auto">
        {showTitle && (
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="text-lg md:text-xl font-medium leading-[28px] font-inter">
              {title}
            </h2>
            {showBrandName && (
              <span className="px-3 py-1 bg-blue-50 text-blue-500 text-sm font-medium rounded-2xl">
                {brandName}
              </span>
            )}
          </div>
        )}
        {subtitle && (
          <p className="text-gray-500 text-sm font-inter mt-1 md:mt-0">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full flex flex-nowrap items-center gap-2 justify-end overflow-hidden">
        {/* Search Input - Moves to top on mobile */}
        {showSearch && searchValue !== undefined && onSearchChange && (
          <SearchInput value={searchValue} onChange={onSearchChange} searchPlaceholder={searchPlaceholder} />
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-1 md:gap-2">
          {showFilter && (
            <button
              onClick={handleFilterToggle}
              className={`px-3 py-2 rounded flex items-center gap-2 text-sm ${
                isFilterActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FilterListIcon fontSize="small" />
              <span className="hidden md:inline">Filters</span>
            </button>
          )}

          {showExports && (
            <button
              className={`px-3 py-2 border rounded-lg flex items-center gap-2 text-sm ${
                isExportActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => toPDF(true)}
            >
              <DownloadCloud size={18} />
              <span className="hidden md:inline">Exports</span>
            </button>
          )}

          {showExport && (
            <button
              onClick={onExportClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <DownloadIcon fontSize="small" />
              <span className="hidden md:inline">Export</span>
            </button>
          )}

          {/* Modify & Forward button */}
          {showModify &&(
            <button
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium flex items-center gap-2"
          >
            <span className="hidden md:inline">Modify & Forward</span>
          </button>
          )}

          {showAdd && (
            <button
              className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 text-sm"
              onClick={handleAddClick}
            >
              <AddIcon fontSize="small" />
              <span className="hidden md:inline">{addButtonText}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  brandName: PropTypes.string,
  selectedRows: PropTypes.array,
  filtersConfig: PropTypes.array.isRequired,
  onApply: PropTypes.func,
  onClear: PropTypes.func,
  addPath: PropTypes.string,
  addButtonText: PropTypes.string,
  onAddClick: PropTypes.func,
  toPDF: PropTypes.func,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onExportClick: PropTypes.func,
  showFilter: PropTypes.bool,
  showExports: PropTypes.bool,
  showAdd: PropTypes.bool,
  showTitle: PropTypes.bool,
  showBrandName: PropTypes.bool,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  containerClass: PropTypes.string,
};

export default Header;