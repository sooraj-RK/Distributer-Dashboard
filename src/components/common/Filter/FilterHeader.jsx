import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import DeleteIcon from '@mui/icons-material/DeleteForever';

const FilterItem = React.memo(({ label, value, onClick, valueFormatter, showLabel = true, anchorRef }) => {
  return (
    <div
      ref={anchorRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center border border-gray-300 rounded px-3 py-1 bg-white text-sm cursor-pointer shrink-0"
    >
      {showLabel && <span className="text-green-500 font-medium mr-1">{label}:</span>}
      <span className="text-gray-700">{valueFormatter(value)}</span>
    </div>
  );
});

const FilterHeader = ({
  filtersConfig = [],
  showApply = true,
  showClear = true,
  onApply,
  onClear,
  containerClass = "",
}) => {
  // Initialize state properly
  const [filterStates, setFilterStates] = useState(() => {
    return filtersConfig.reduce((acc, { key, value }) => {
      acc[key] = { 
        isOpen: false, 
        value: value || null,
        ref: React.createRef()
      };
      return acc;
    }, {});
  });

  const toggleFilter = useCallback((key) => {
    setFilterStates(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(k => {
        newState[k] = {
          ...newState[k],
          isOpen: k === key ? !newState[k].isOpen : false
        };
      });
      return newState;
    });
  }, []);

  const closeFilter = useCallback((key) => {
    setFilterStates(prev => ({
      ...prev,
      [key]: { ...prev[key], isOpen: false }
    }));
  }, []);

  const updateFilterValue = useCallback((key, value) => {
    setFilterStates(prev => ({
      ...prev,
      [key]: { ...prev[key], value }
    }));
  }, []);

  const handleApply = useCallback(() => {
    const applied = Object.fromEntries(
      Object.entries(filterStates).map(([key, state]) => [key, state.value])
    );
    onApply?.(applied);
  }, [filterStates, onApply]);

  const handleClear = useCallback(() => {
    const reset = filtersConfig.reduce((acc, { key, value }) => {
      acc[key] = { ...filterStates[key], value: value || null };
      return acc;
    }, {});
    setFilterStates(reset);
    onClear?.();
  }, [filtersConfig, filterStates, onClear]);

  return (
    <div className={`relative ${containerClass}`}>
      <div className="flex justify-between items-center p-2  rounded-md ">
        <div className="flex flex-nowrap overflow-x-auto gap-2 pr-4 [&::-webkit-scrollbar]:hidden">
          {filtersConfig.map(({ key, label, valueFormatter = (v) => v, showLabel = true }) => (
            <FilterItem
              key={key}
              label={label}
              value={filterStates[key]?.value}
              onClick={() => toggleFilter(key)}
              anchorRef={filterStates[key]?.ref}
              valueFormatter={valueFormatter}
              showLabel={showLabel}
            />
          ))}
        </div>
        {(showApply || showClear) && (
          <div className="flex items-center gap-2 ml-4 shrink-0 ">
            {showClear && (
              <button onClick={handleClear} className="text-red-700 text-sm font-medium">
               <DeleteIcon fontSize="small" /> Clear All</button>
            )}
            {showApply && (
              <button onClick={handleApply} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm">Apply</button>
            )}
          </div>
        )}
      </div>

      {filtersConfig.map(({ key, component: Dropdown, dropdownProps = {} }) => {
        const state = filterStates[key];
        return (
          <Dropdown
            key={key}
            anchorRef={state?.ref}
            isOpen={state?.isOpen }
            onClose={() => closeFilter(key)}
            selected={state?.value}
            setSelected={(v) => updateFilterValue(key, v)}
            {...dropdownProps}
          />
        );
      })}
    </div>
  );
};

FilterHeader.propTypes = {
  filtersConfig: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string,
      value: PropTypes.any,
      component: PropTypes.elementType.isRequired,
      valueFormatter: PropTypes.func,
      showLabel: PropTypes.bool,
      dropdownProps: PropTypes.object,
    })
  ),
  showApply: PropTypes.bool,
  showClear: PropTypes.bool,
  onApply: PropTypes.func,
  onClear: PropTypes.func,
  containerClass: PropTypes.string,
};

export default FilterHeader;