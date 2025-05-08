// src/pages/StoreView.jsx
import React, { useState, useMemo } from 'react';
import { PrinterIcon } from 'lucide-react'; // or replace with your icon
import PriceTable from '../../components/common/tables/PriceTable';

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

    return (
        <div className=" space-y-3 max-w-6xl mx-auto">
            {/* ─── Top Bar ──────────────────────────────────────────── */}
            <div className="flex justify-between items-center ">
                <h1 className="text-2xl font-semibold">Modify &amp; Forward</h1>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Store View
                    </button>
                    <button className="p-2 bg-white border rounded text-gray-500 hover:text-gray-700">
                        <PrinterIcon size={18} />
                    </button>
                </div>
            </div>

            {/* ─── Order Sections ──────────────────────────────────── */}
            {orders.map(order => (
               <div
               key={order.no}
               className="bg-white border-2 border-gray-200 rounded"
             >
               {/* Order Header */}
               <div
                 className="
                   relative px-4 pt-2 pb-1
                   before:content-[''] before:absolute before:bottom-0
                   before:left-4 before:right-4 before:border-b before:border-gray-200
                 "
               >
                 {/* make this flex take the full width */}
                 <div className="w-full flex flex-wrap justify-between items-center text-sm text-gray-700">
                   <a href="#" className="text-blue-600 font-medium">No: {order.no}</a>
                   <span>Store ID: {order.storeId}</span>
                   <span>Store Name: {order.storeName}</span>
                   <span>Date: {order.date}</span>
                   <span>Merchandiser ID: {order.merchandiserId}</span>
                 </div>
               </div>

                    {/* Price Table */}
                    <div className="px-4 pb-3">
                        <PriceTable
                            items={order.items}
                            currency="₹"
                            onUnitsChange={(itemId, units) =>
                                handleUnitsChange(order.no, itemId, units)
                            }
                            className="mt-4"

                            footerFirstCell="Total"
                        />
                    </div>
                </div>
            ))}

            {/* ─── Overall Footer ──────────────────────────────────── */}
            <div className="justify-end items-end text-sm text-gray-800">
                <div>
                    <span className="font-semibold">Overall Total Units:</span>{' '}
                    {overallUnits}
                    <span className="ml-6 font-semibold">Overall Purchase Value:</span>{' '}
                    {overallValue} ₹
                </div>
                <div className="space-x-2">
                    <button className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                    <button className="px-4 py-2 border rounded text-gray-600">Put On Hold</button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded">
                        Send to Factory
                    </button>
                </div>
            </div>
        </div>
    );
}
