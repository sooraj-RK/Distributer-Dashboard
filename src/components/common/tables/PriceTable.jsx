// src/components/PriceTable.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { SouthOutlined } from '@mui/icons-material';

const PriceTable = ({
  items,
  currency = '₹',
  onUnitsChange,
  className = '',
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
      <table className="min-w-full text-left">
        <thead className="bg-[#F6F6F6]">
          <tr>
            <th className="p-3  bg-gray-50 text-gray-500 text-sm font-inter ">Product <SouthOutlined fontSize="small" className="text-gray-400 p-[3px]" /></th>
            <th className="p-3  bg-gray-50 text-gray-500 text-sm font-inter">Units Ordered <SouthOutlined fontSize="small" className="text-gray-400 p-[3px]" /></th>
            <th className="p-3  bg-gray-50 text-gray-500 text-sm font-inter">Cost per Unit <SouthOutlined fontSize="small" className="text-gray-400 p-[3px]" /></th>
            <th className="p-3  bg-gray-50 text-gray-500 text-sm font-inter">Total Price <SouthOutlined fontSize="small" className="text-gray-400 p-[3px]" /></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ id, product, units, costPerUnit, rowTotal }) => (
            <tr key={id} className="border-b last:border-none border-gray-200">
              <td className="p-3 text-gray-500">{product}</td>
              <td className="p-3 text-gray-500">
                <input
                  type="number"
                  min="0"
                  className="w-16 p-1 border border-gray-200 text-center rounded"
                  value={units}
                  onChange={e => onUnitsChange(id, Number(e.target.value))}
                />
              </td>
              <td className="p-3 text-gray-500">
                {costPerUnit} {currency}
              </td>
              <td className="p-3  text-gray-500">
                {rowTotal} {currency}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50">
          <tr>
            <td className="p-3  bg-gray-50 text-gray-500 text-sm font-inter">Total</td>
            <td className="p-3  bg-gray-50 text-gray-500 text-sm font-inter">{totalUnits}</td>
            <td className="p-3  bg-gray-50 text-gray-500 text-sm font-inter" /> {/* empty cell */}
            <td className="p-3  bg-gray-50 text-gray-500 text-sm font-inter">{totalPrice} {currency}</td>
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
  onUnitsChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PriceTable;
