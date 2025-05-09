import React, { useState, useRef, useEffect } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SouthOutlined from "@mui/icons-material/SouthOutlined";

const ReusableTable = ({
  columns,
  data,
  selectAll,
  onSelectAll,
  selectedRows = [],
  onRowSelect,
  showActions = false,
  onRowClick,
  rowAccessor = "id",
}) => {
  const checkboxStyle = { accentColor: "#169500" };
  const [activeActionRow, setActiveActionRow] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const actionMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target)
      ) {
        setActiveActionRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (rowId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({ top: e.clientY, left: e.clientX - 160 });
    setActiveActionRow((prev) => (prev === rowId ? null : rowId));
  };

  const renderStatus = (status) => (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs">
      {status}
    </span>
  );

  const renderViewDetailsButton = (row) => (
    <button
      className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition"
      onClick={(e) => {
        e.stopPropagation();
        onRowClick?.(row);
      }}
    >
      View Details
    </button>
  );

  return (
    <div className="w-full overflow-x-auto rounded-[7px] border border-gray-200">
      <div className="rounded-xl">
        <table className="table-auto w-max lg:min-w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-500 text-sm font-inter">
              {onSelectAll && (
                <th className="pl-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={onSelectAll}
                    style={checkboxStyle}
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-2 py-2 font-normal relative whitespace-nowrap ${
                    col.maxWidth ? `max-w-[${col.maxWidth}]` : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    <SouthOutlined
                      fontSize="small"
                      className="text-gray-400 p-[3px]"
                    />
                  </div>
                </th>
              ))}
              {showActions && <th className="px-2 py-2" />}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              const rowId = row[rowAccessor] ?? rowIndex;
              const isRejected = row.status === "Rejected";

              return (
                <tr
                  key={rowId}
                  className={`border-b border-gray-200 hover:bg-gray-100 transition font-inter ${
                    selectedRows.includes(rowId) ? "bg-gray-50" : ""
                  } ${onRowClick ? "cursor-pointer" : ""}`}
                  onClick={(e) => {
                    if (
                      onRowClick &&
                      e.target.type !== "checkbox" &&
                      !e.target.closest(".action-menu-container") &&
                      !e.target.closest("button")
                    ) {
                      onRowClick(row);
                    }
                  }}
                >
                  {onRowSelect && (
                    <td className="pl-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(rowId)}
                        onChange={() => onRowSelect(rowId)}
                        onClick={(e) => e.stopPropagation()}
                        style={checkboxStyle}
                      />
                    </td>
                  )}
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      className={`px-2 py-2 whitespace-normal break-words ${
                        col.bold ? "font-bold" : ""
                      } ${col.maxWidth ? `max-w-[${col.maxWidth}]` : ""}`}
                    >
                      {col.render
                        ? col.render(row[col.accessor], row, rowIndex)
                        : col.accessor === "status"
                        ? renderStatus(row[col.accessor])
                        : col.accessor === "remark"
                        ? renderViewDetailsButton(row)
                        : row[col.accessor]}
                  </td>
                ))}

                {showActions && isRejected && (
                  <td className="px-2 py-3 text-right relative">
                    <div className="action-menu-container inline-block">
                      <HelpOutlineIcon
                        fontSize="small"
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={(e) => handleActionClick(rowId, e)}
                      />
                      {activeActionRow === rowId && (
                        <div
                          ref={actionMenuRef}
                          style={{
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                          }}
                        >
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ReusableTable;
