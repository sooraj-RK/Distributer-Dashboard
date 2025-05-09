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
     

      <table className="min-w-full text-left max-h-[489px] table-fixed">
        <thead className="bg-[#F6F6F6] h-6">
          <tr>
          
            <th 
              className="  p-2 text-gray-500 text-sm "
            >
              Product <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />
            </th>
            
          
            <th 
              className="  p-2  text-gray-500 text-sm "
            >
              Units Ordered <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />
            </th>
    
            <th 
              className="  p-2 text-gray-500 text-sm "
            >
              Cost per Unit <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />
            </th>

            <th 
              className=" p-2 text-gray-500 text-sm "
            >
              Total Price <SouthOutlined fontSize="small" className="text-gray-400 p-[1px]" />
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map(({ id, product, units, costPerUnit, rowTotal }) => (
            <tr 
              key={id} 
              className="h-6 border-b last:border-none border-gray-200" // Fixed row height
            >
         
              <td className=" p-1 text-gray-500 truncate">{product}</td>
              
         
              <td className="  p-1 text-gray-500">
                <input
                    type="number"
                  min="0"
                  className="w-15  border ps-3 border-gray-200 text-center rounded"
                  value={units}
                  onChange={e => onUnitsChange(id, Number(e.target.value))}
                  />
              </td>
      
              <td className="  p-1 text-gray-500">
                {costPerUnit} {currency}
              </td>
              
          
              <td className="p-1 text-gray-500">
                {rowTotal} {currency}
              </td>
            </tr>
          ))}
        </tbody>

        {/* Footer with fixed dimensions */}
        <tfoot className="bg-[#F6F6F6]">
          <tr className="h-6">
            <td className="  p-2 text-gray-500 text-sm ">Total</td>
            <td className="  p-2  text-gray-500 text-sm ">{totalUnits}</td>
            <td className=" p-2 " /> {/* Empty cell */}
            <td className="  p-2  text-gray-500 text-sm ">
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
  onUnitsChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default PriceTable;
