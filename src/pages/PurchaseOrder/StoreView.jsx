import React, { useState, useMemo } from 'react';
import { PrinterIcon } from 'lucide-react'; // or replace with your icon
import PriceTable from '../../components/common/tables/PriceTable';
import { useLocation } from 'react-router-dom';

const initialOrders = [
    {
        no: '01',
        storeId: 'ST001',
        storeName: 'Green Mart',
        date: '2025-04-30',
        merchandiserId: 'MZ123',
        items: [
            { id: 'st-vanilla-lp', product: 'ST 75ML FRU.VANILLA‑LP', units: 10, costPerUnit: 150 },
            { id: 'mint-choc-chip', product: 'Mint Chocolate Chip Ice Cream', units: 2, costPerUnit: 150 },
            { id: 'strawberry-swirl', product: 'Strawberry Swirl Ice Cream', units: 4, costPerUnit: 150 },
            { id: 'cookies-cream', product: 'Cookies and Cream Delight', units: 2, costPerUnit: 150 },
            { id: 'mango-tango-sorbet', product: 'Mango Tango Sorbet', units: 6, costPerUnit: 190 },
            { id: 'pistachio-paradise', product: 'Pistachio Paradise Ice Cream', units: 2, costPerUnit: 150 },
            { id: 'caramel-crunch', product: 'Caramel Crunch Ice Cream', units: 2, costPerUnit: 130 },
            { id: 'rocky-road', product: 'Rocky Road Bliss', units: 3, costPerUnit: 150 },
            { id: 'lemon-zest-sorbet', product: 'Lemon Zest Sorbet', units: 6, costPerUnit: 150 },
        ],
    },
    {
        no: '02',
        storeId: 'ST001',
        storeName: 'Green Mart',
        date: '2025-04-30',
        merchandiserId: 'MZ123',
        items: [
            { id: 'st-choco-lp', product: 'ST 75ML FRU.CHOCOLATE‑LP', units: 10, costPerUnit: 180 },
            { id: 'vanilla-bean', product: 'Vanilla Bean Ice Cream', units: 2, costPerUnit: 150 },
        ],
    },
];

export default function StoreView() {
    const [orders, setOrders] = useState(initialOrders);
    const location = useLocation();

    const handleUnitsChange = (orderNo, itemId, newUnits) => {
        setOrders(prev =>
            prev.map(o =>
                o.no === orderNo
                    ? {
                        ...o,
                        items: o.items.map(i =>
                            i.id === itemId ? { ...i, units: Math.max(0, newUnits) } : i
                        ),
                    }
                    : o
            )
        );
    };

    const { overallUnits, overallValue } = useMemo(() => {
        let u = 0, v = 0;
        orders.forEach(o =>
            o.items.forEach(({ units, costPerUnit }) => {
                u += units;
                v += units * costPerUnit;
            })
        );
        return { overallUnits: u, overallValue: v };
    }, [orders]);


export default function StoreView({ order, onUnitsChange }) {
  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500">
        No order data to display.
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded ">
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
