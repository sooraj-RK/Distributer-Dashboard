import React from 'react'
import PriceTable from '../../components/common/tables/PriceTable'


export default function StoreView({ order, onUnitsChange }) {
  return (
    <div>
       <div className="px-4 pb-3">
             <PriceTable
               items={order.items}
               currency="₹"
               onUnitsChange={(itemId, units) => onUnitsChange(order.no, itemId, units)}
               className="mt-4"
               footerFirstCell="Total"
             />
           </div>
    </div>
  )
}


