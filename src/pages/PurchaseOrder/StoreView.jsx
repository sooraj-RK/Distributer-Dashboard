// src/pages/StoreView.jsx
import React, { useState } from 'react';
import PriceTable from '../../components/common/tables/PriceTable';

const initialItems = [
  { id: 'st-vanilla', product: 'ST 75ML FRU.VANILLA‑LP', units: 10, costPerUnit: 150 },
  { id: 'mint-chip', product: 'Mint Chocolate Chip Ice Cream', units: 2, costPerUnit: 150 },
  { id: 'strawberry-swirl', product: 'Strawberry Swirl Ice Cream', units: 4, costPerUnit: 150 },
  { id: 'cookies-cream', product: 'Cookies and Cream Delight', units: 2, costPerUnit: 150 },
  { id: 'mango-sorbet', product: 'Mango Tango Sorbet', units: 6, costPerUnit: 190 },
  { id: 'pistachio', product: 'Pistachio Paradise Ice Cream', units: 2, costPerUnit: 150 },
  { id: 'caramel-crunch', product: 'Caramel Crunch Ice Cream', units: 2, costPerUnit: 130 },
  { id: 'rocky-road', product: 'Rocky Road Bliss', units: 3, costPerUnit: 150 },
  { id: 'lemon-zest', product: 'Lemon Zest Sorbet', units: 6, costPerUnit: 150 },
];

const StoreView = () => {
  
  const [items, setItems] = useState(initialItems);


  const handleUnitsChange = (id, newUnits) => {
    setItems(current =>
      current.map(item =>
        item.id === id
          ? { ...item, units: newUnits < 0 ? 0 : newUnits }
          : item
      )
    );
  };

  return (
    <div className="p-6">
     
      <PriceTable
        items={items}
        currency="₹"
        onUnitsChange={handleUnitsChange}
        className="max-w-3xl mx-auto"
      />
    </div>
  );
};

export default StoreView;

