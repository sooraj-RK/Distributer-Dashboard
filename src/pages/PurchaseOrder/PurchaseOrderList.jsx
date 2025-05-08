import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import ReusableTable from "../../components/common/tables/ReusableTable";
import FilterHeader from "../../components/common/Filter/FilterHeader";
import CalendarDropdown  from "../../components/common/Filter/CalendarDropdown";
import StatusDropdown from "../../components/common/Filter/StatusDropdown"
import { format } from "date-fns";


const initialData = [
  {
    id: 1,
    orderNo: "01",
    date: "12/03/25 12:44 PM",
    storeId: "XD123RT567",
    storeName: "All Cool Bar",
    merchandiserId: "XIJX12RF4567",
    numProducts: 18,
    purchaseValue: 4580.0,
    status: "Forwarded"
  },
  {
    id: 2,
    orderNo: "02",
    date: "12/03/25 01:05 PM",
    storeId: "XD123RT568",
    storeName: "Beer Bros",
    merchandiserId: "MNOP34GH7890",
    numProducts: 12,
    purchaseValue: 3120.0,
    status: "Review"
  },
  {
    id: 3,
    orderNo: "03",
    date: "12/04/25 09:15 AM",
    storeId: "XD123RT569",
    storeName: "Sunny Café",
    merchandiserId: "ABCD56EF1234",
    numProducts: 7,
    purchaseValue: 1560.5,
    status: "Rejected"
  },
  {
    id: 4,
    orderNo: "04",
    date: "12/04/25 10:30 AM",
    storeId: "XD123RT570",
    storeName: "Moonlight Diner",
    merchandiserId: "GHJK78LM9012",
    numProducts: 25,
    purchaseValue: 7820.0,
    status: "Rejected",
    rejectionReason: "Incorrect pricing"
  },
  {
    id: 5,
    orderNo: "05",
    date: "12/05/25 02:20 PM",
    storeId: "XD123RT571",
    storeName: "The Green Leaf",
    merchandiserId: "WXYZ90OP3456",
    numProducts: 30,
    purchaseValue: 10200.0,
    status: "Forwarded"
  },
  {
    id: 6,
    orderNo: "06",
    date: "12/05/25 03:45 PM",
    storeId: "XD123RT572",
    storeName: "Urban Eats",
    merchandiserId: "QWER12TY3456",
    numProducts: 14,
    purchaseValue: 4760.75,
    status: "Review"
  },
  {
    id: 7,
    orderNo: "07",
    date: "12/06/25 11:10 AM",
    storeId: "XD123RT573",
    storeName: "Downtown Deli",
    merchandiserId: "ASDF34GH5678",
    numProducts: 5,
    purchaseValue: 980.0,
    status: "Rejected"
  },
  {
    id: 8,
    orderNo: "08",
    date: "12/06/25 12:50 PM",
    storeId: "XD123RT574",
    storeName: "Bistro Central",
    merchandiserId: "ZXCV56BN7890",
    numProducts: 20,
    purchaseValue: 8200.0,
    status: "Rejected",
    rejectionReason: "Out of stock"
  },
  {
    id: 9,
    orderNo: "09",
    date: "12/07/25 01:30 PM",
    storeId: "XD123RT575",
    storeName: "Sunny Side Up",
    merchandiserId: "POIU78LK1234",
    numProducts: 10,
    purchaseValue: 2540.0,
    status: "Forwarded"
  },
  {
    id: 10,
    orderNo: "10",
    date: "12/07/25 02:45 PM",
    storeId: "XD123RT576",
    storeName: "Night Owl Lounge",
    merchandiserId: "MNVB90CX5678",
    numProducts: 22,
    purchaseValue: 9450.0,
    status: "Review"
  }
];


const PurchaseOrderList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [displayData, setDisplayData] = useState(initialData);
  const [searchValue, setSearchValue] = useState("");
  const [filtersConfig, setFiltersConfig] = useState([
    {
      key: "status",
      label: "Status",
      value: null,
      component: StatusDropdown,
      valueFormatter: v => v || "All",
      dropdownProps: {
        options: ["All", "Approved", "Pending", "Rejected", "Forwarded"]
      }
    },
    {
      key: "dateRange",
      label: "Date",
      value: null,
      component: CalendarDropdown,
      valueFormatter: (value) => {
              if (!Array.isArray(value)) return 'Select date range';
              return `${format(value[0], 'd MMM yyyy')} - ${format(value[1], 'd MMM yyyy')}`;
            },
            showLabel: false
    }
  ]);
  const [activeFilters, setActiveFilters] = useState({ status: null, dateRange: null });
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return { dot: "bg-green-500", bg: "bg-green-100", text: "text-green-600" };
      case "pending":
        return { dot: "bg-yellow-500", bg: "bg-yellow-100", text: "text-yellow-600" };
      case "rejected":
        return { dot: "bg-red-500", bg: "bg-red-100", text: "text-red-600" };
      case "forwarded":
        return { dot: "bg-green-500", bg: "bg-green-100", text: "text-green-600" };
        case "review":
  return { dot: "bg-orange-500", bg: "bg-orange-100", text: "text-orange-600" };
      default:
        return { dot: "bg-gray-400", bg: "bg-gray-100", text: "text-gray-600" };
    }
  };

  // Column definitions matching the design
  const columns = [
    { header: "No", accessor: "orderNo", bold: true, width: "60px" },
    { header: "Date", accessor: "date", width: "150px" },
    { header: "Store ID", accessor: "storeId", width: "150px" },
    { header: "Store Name", accessor: "storeName", width: "200px" },
    {
      header: "Merchandiser ID",
      accessor: "merchandiserId",
      render: (value) => <a className="text-blue-500 hover:underline">{value}</a>,
      width: "180px"
    },
    { header: "No of Products", accessor: "numProducts", width: "150px" },
    {
      header: "Purchase Value",
      accessor: "purchaseValue",
      render: (value) => `₹${value.toLocaleString()}`,
      width: "150px"
    },
    { 
      header: "Status", 
      accessor: "status", 
      width: "120px",
      render: (value) => {
        const styles = getStatusStyles(value);
        return (
          <div className={`inline-flex items-center gap-1.5 py-0 px-2 rounded-full ${styles.bg} ${styles.text}`}>
            <span className={`w-2 h-2 rounded-full ${styles.dot}`}></span>
            {value}
          </div>
        );
      }
    }  ];

  // Apply search and filters
  useEffect(() => {
    let filtered = [...data];
    // Search
    if (searchValue) {
      filtered = filtered.filter(row =>
        row.storeName.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.storeId.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    // Status filter
    if (activeFilters.status) {
      filtered = filtered.filter(row => row.status === activeFilters.status);
    }
    // Date range filter (if implemented)
    // ...
    setDisplayData(filtered);
  }, [searchValue, activeFilters, data]);

  const handleSearchChange = (e) => setSearchValue(e.target.value);
  const handleFilterToggle = () => setIsFilterActive(v => !v);
  const handleApply = (applied) => setActiveFilters(applied);
  const handleClear = () => {
    setActiveFilters({ status: null, dateRange: null });
  };

  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setSelectedRows(newValue ? displayData.map(r => r.id) : []);
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    // Export logic here
    console.log("Exporting:", selectedRows);
  };


  const handleModify = () => {
    const selectedOrders = displayData.filter(row => selectedRows.includes(row.id));
    navigate('/modify-forward', { state: { selectedOrders } });
  };

  return (
    <div className="p-2 w-full overflow-x-hidden">
      <Header
        title="Orders"
        subtitle={null}
        filtersConfig={filtersConfig}
        onApply={handleApply}
        onClear={handleClear}
        showFilter={true}
        isFilterActive={isFilterActive}
        handleFilterToggle={handleFilterToggle}
        showSearch={true}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search orders"
        showModify={true}
        disableModify={selectedRows.length === 0} 
        onModifyClick={handleModify} 
        showExport={true}
        onExportClick={handleExport}
        showAdd={false}
      />

      {isFilterActive && (
        <FilterHeader
          filtersConfig={filtersConfig}
          onApply={handleApply}
          onClear={handleClear}
        />
      )}

      <ReusableTable
        columns={columns}
        data={displayData}
        selectAll={selectAll}
        onSelectAll={handleSelectAll}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        showActions={true}
        onRowClick={(row) => console.log("View details for", row)}
      />
    </div>
  );
};

export default PurchaseOrderList;
