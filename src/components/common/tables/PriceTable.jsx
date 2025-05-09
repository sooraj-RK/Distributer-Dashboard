// src/components/PriceTable.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SouthOutlined } from '@mui/icons-material';

const PriceTable = ({
  items,
  currency = '₹',
  onUnitsChange,
  className = '',
  showArrows = true,
  editable = true,
}) => {
  // Compute per‐row total and grand totals
  const { rows, totalUnits, totalPrice } = useMemo(() => {
    let u = 0, p = 0;
    const rows = items.map(item => {
      const rowTotal = item.units * item.costPerUnit;
      u += item.units;
      p += rowTotal;
      return { ...item, rowTotal };
    });
    return { rows, totalUnits: u, totalPrice: p };
  }, [items]);

  return (
    <div className={`overflow-x-auto bg-white rounded shadow ${className}`}>
      {/* Add table-fixed and specify widths */}
      <table className="min-w-full text-left max-h-[489px] table-fixed">
        <thead className="bg-[#F6F6F6] h-6">
          <tr>
            {/* Product Column - 330.25px */}
            <th className="p-2 text-gray-500 text-sm">
              Product {showArrows && <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />}
            </th>
            
            {/* Units Ordered Column - 100px */}
            <th className="p-2 text-gray-500 text-sm">
              Units Ordered {showArrows && <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />}
            </th>
            
            {/* Cost per Unit Column - 120px */}
            <th className="p-2 text-gray-500 text-sm">
              Cost per Unit {showArrows && <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />}
            </th>
            
            {/* Total Price Column - 120px */}
            <th className="p-2 text-gray-500 text-sm">
              Total Price {showArrows && <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />}
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map(({ id, product, units, costPerUnit, rowTotal }) => (
            <tr 
              key={id} 
              className="h-6 border-b last:border-none border-gray-200" // Fixed row height
            >
              {/* Product Cell */}
              <td className="h-6 p-1 text-gray-500 truncate">{product}</td>
              
              {/* Units Ordered Cell */}
              <td className="h-6 p-1 text-gray-500">
                {editable ? (
                  <input
                    type="number"
                    min="0"
                    className="w-15 border ps-3 border-gray-200 text-center rounded"
                    value={units}
                    onChange={e => onUnitsChange(id, Number(e.target.value))}
                  />
                ) : (
                  <div className="w-15 text-center">
                    {units}
                  </div>
                )}
              </td>
              
              {/* Cost per Unit Cell */}
              <td className="h-6 p-1 text-gray-500">
                {costPerUnit} {currency}
              </td>
              
              {/* Total Price Cell */}
              <td className="h-6 p-1 text-gray-500">
                {rowTotal} {currency}
              </td>
            </tr>
          ))}
        </tbody>

        {/* Footer with fixed dimensions */}
        <tfoot className="bg-[#F6F6F6]">
          <tr className="h-6">
            <td className="p-2 text-gray-500 text-sm">Total</td>
            <td className="p-2 text-gray-500 text-sm">{totalUnits}</td>
            <td className="p-2" /> {/* Empty cell */}
            <td className="p-2 text-gray-500 text-sm">
              {totalPrice} {currency}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

PriceTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      units: PropTypes.number.isRequired,
      costPerUnit: PropTypes.number.isRequired,
    })
  ).isRequired,
  currency: PropTypes.string,
  onUnitsChange: PropTypes.func,
  className: PropTypes.string,
  showArrows: PropTypes.bool,
  editable: PropTypes.bool,
};

export default PriceTable;