
import React from 'react'
import PriceTable from '../../components/common/tables/PriceTable'

export default function StoreView({ order, onUnitsChange }) {
  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">
        No order data to display.
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded mb-3">
      <div
        className="relative px-4 pt-2 pb-1 before:content-[''] before:absolute before:bottom-0 before:left-4 before:right-4 before:border-b before:border-gray-200"
      >
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-700">
          <a href="#" className="text-blue-600 font-medium">
            No: {order.no}
          </a>
          <span>Store ID: {order.storeId}</span>
          <span>Store Name: {order.storeName}</span>
          <span>Date: {order.date}</span>
          <span>Merchandiser ID: {order.merchandiserId}</span>
        </div>
      </div>
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
