import React, { useState, useMemo } from 'react'
import clsx from 'clsx'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import StoreView from './StoreView'
import ProductView from './ProductView'

// Dummy data for Store View
const initialStoreOrders = [
  {
    no: '01',
    storeId: 'ST001',
    storeName: 'Green Mart',
    date: '2025-04-30',
    merchandiserId: 'MZ123',
    items: [
      { id: 'st-vanilla-lp', product: 'ST 75ML FRU.VANILLA-LP', units: 10, costPerUnit: 150 },
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
    storeId: 'ST002',
    storeName: 'Fresh Foods',
    date: '2025-05-01',
    merchandiserId: 'MF456',
    items: [
      { id: 'blueberry-twist', product: 'Blueberry Twist Ice Cream', units: 5, costPerUnit: 160 },
      { id: 'choco-fudge', product: 'Chocolate Fudge Brownie', units: 3, costPerUnit: 180 },
    ],
  },
]

// Dummy data for Product View (flattened unique products)
const initialProductOrders = [
  { id: 'st-vanilla-lp', product: 'ST 75ML FRU.VANILLA-LP', units: 10, costPerUnit: 150 },
  { id: 'mint-choc-chip', product: 'Mint Chocolate Chip Ice Cream', units: 2, costPerUnit: 150 },
  { id: 'strawberry-swirl', product: 'Strawberry Swirl Ice Cream', units: 4, costPerUnit: 150 },
  { id: 'cookies-cream', product: 'Cookies and Cream Delight', units: 2, costPerUnit: 150 },
  { id: 'mango-tango-sorbet', product: 'Mango Tango Sorbet', units: 6, costPerUnit: 190 },
  { id: 'pistachio-paradise', product: 'Pistachio Paradise Ice Cream', units: 2, costPerUnit: 150 },
  { id: 'caramel-crunch', product: 'Caramel Crunch Ice Cream', units: 2, costPerUnit: 130 },
  { id: 'rocky-road', product: 'Rocky Road Bliss', units: 3, costPerUnit: 150 },
  { id: 'lemon-zest-sorbet', product: 'Lemon Zest Sorbet', units: 6, costPerUnit: 150 },
  { id: 'blueberry-twist', product: 'Blueberry Twist Ice Cream', units: 5, costPerUnit: 160 },
  { id: 'choco-fudge', product: 'Chocolate Fudge Brownie', units: 3, costPerUnit: 180 },
]

function IconToggle({ value, onChange }) {
  return (
    <div
      className="relative box-border bg-white overflow-hidden"
      style={{ width: '76px', height: '36px', border: '1.5778px solid #D1D5DB', borderRadius: '8px' }}
    >
      <div
        className={clsx('absolute transition-transform')}
        style={{
          top: '1px',
          left: '1px',
          width: '34px',
          height: '34px',
          backgroundColor: '#3B82F6',
          borderRadius: '6px',
          transform: value === 'product' ? 'translateX(38px)' : 'none',
        }}
      />
      {value === 'store' ? (
        <button
          onClick={() => onChange('product')}
          className="absolute flex items-center justify-center focus:outline-none"
          style={{ top: '1px', left: '1px', width: '34px', height: '34px', zIndex: 10 }}
        >
          <StoreOutlinedIcon style={{ fontSize: 24, color: '#FFFFFF' }} />
        </button>
      ) : (
        <button
          onClick={() => onChange('store')}
          className="absolute flex items-center justify-center focus:outline-none"
          style={{ top: '1px', transform: 'translateX(38px)', width: '34px', height: '34px', zIndex: 10 }}
        >
          <Inventory2OutlinedIcon style={{ fontSize: 24, color: '#FFFFFF' }} />
        </button>
      )}
    </div>
  )
}

export default function ModifyAndForward() {
  const [storeOrders, setStoreOrders] = useState(initialStoreOrders)
  const [productOrders, setProductOrders] = useState(initialProductOrders)
  const [viewMode, setViewMode] = useState('store')

  // Update handlers
  const handleStoreUnitsChange = (orderNo, itemId, newUnits) => {
    setStoreOrders(prev =>
      prev.map(order =>
        order.no === orderNo
          ? { ...order, items: order.items.map(item => item.id === itemId ? { ...item, units: Math.max(0, newUnits) } : item) }
          : order
      )
    )
  }

  const handleProductUnitsChange = (itemId, newUnits) => {
    setProductOrders(prev =>
      prev.map(item => item.id === itemId ? { ...item, units: Math.max(0, newUnits) } : item)
    )
  }

  // Compute overall totals
  const { overallUnits, overallValue } = useMemo(() => {
    const orders = viewMode === 'store' ? storeOrders : productOrders
    let totalUnits = 0
    let totalValue = 0
    if (viewMode === 'store') {
      orders.forEach(order => order.items.forEach(item => {
        totalUnits += item.units
        totalValue += item.units * item.costPerUnit
      }))
    } else {
      orders.forEach(item => {
        totalUnits += item.units
        totalValue += item.units * item.costPerUnit
      })
    }
    return { overallUnits: totalUnits, overallValue: totalValue }
  }, [storeOrders, productOrders, viewMode])

  return (
    <div className="relative">
      {/* Header & Toggle */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-semibold">Modify & Forward</h1>
        <div className="flex items-center space-x-2">
          <div className={clsx('px-4 py-2 text-sm font-medium rounded-xl', viewMode === 'store'?
            'bg-green-100 text-blue-500':'bg-green-100 text-blue-500')}>
            {viewMode === 'store' ? 'Store View' : 'Product View'}
          </div>
          <IconToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Content List */}
      <div className="max-w-6xl mx-auto overflow-y-auto no-scrollbar pb-28" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
        {viewMode === 'store' ? (
          storeOrders.map(order => (
            <StoreView
              key={order.no}
              order={order}
              onUnitsChange={handleStoreUnitsChange}
            />
          ))
        ) : (
          <ProductView
            order={{ no: null, items: productOrders }}
            onUnitsChange={(orderNo, itemId, qty) => handleProductUnitsChange(itemId, qty)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 right-0 bg-white border-t border-gray-200 z-50" style={{ left: '311px', right: '0' }}>
        <div className="w-full max-w-6xl mx-auto p-5 flex flex-col items-end text-sm text-gray-800">
          <div>
          Overall Total Units: <span className=" me-6 font-semibold">{overallUnits}</span>  
            Overall Purchase Value:<span className=" font-semibold"> {overallValue} ₹</span>
          </div>
          <div className="mt-4 space-x-2">
            <button className="px-4 py-2 text-gray-600"><CloseIcon fontSize="small" /> Cancel</button>
            <button className="px-4 py-2 border border-gray-300 rounded text-black"><VisibilityOutlinedIcon fontSize="small" /> Put On Hold</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded">Send to Factory</button>
          </div>
        </div>
      </div>
    </div>
  )
}
