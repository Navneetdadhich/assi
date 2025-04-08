import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  X,
  Undo2,
  ChevronUp,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Trash,
  ChevronRight,
} from "lucide-react";

function App() {
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [tablePosition, setTablePosition] = useState({ x: 0, y: 0 });
  const [tableSize, setTableSize] = useState({ width: 100, height: "auto" });

  const [invoiceData, setInvoiceData] = useState({
    invoiceName: "Copy of Invoice Template 4",
    companyName: "RMTECH",
    companyAddress: "2118 Thompson Cir, Syracuse, Connecticut 35624",
    clientName: "SMART TECH LTD",
    clientAddress: "1901 Thompson Cir, Jibish, Hawaii 81063",
    clientPhone: "+857 2148 9643",
    clientEmail: "sales@smarttle.com",
    invoiceNo: "5478459",
    accountNo: "641755875923",
    invoiceDate: "25 March, 2019",
    items: [
      {
        id: 1,
        name: "Web Design",
        description: "Neque porro quisquam est qui amet",
        unitPrice: 500.0,
        qty: 1,
        total: 500.0,
      },
      {
        id: 2,
        name: "Software Development",
        description: "Neque porro quisquam est qui amet",
        unitPrice: 1500.0,
        qty: 1,
        total: 1500.0,
      },
      {
        id: 3,
        name: "SEO Package",
        description: "Neque porro quisquam est qui amet",
        unitPrice: 300.0,
        qty: 1,
        total: 300.0,
      },
      {
        id: 4,
        name: "Support Package",
        description: "Neque porro quisquam est qui amet",
        unitPrice: 200.0,
        qty: 1,
        total: 200.0,
      },
    ],
    paymentInfo: {
      accountNumber: "5478745286",
      accountName: "Mark Wood",
      bankName: "Natwest",
    },
    subTotal: 2500.0,
    tax: 0.0,
    grandTotal: 2500.0,
  });

  const addNewItem = () => {
    const newItem = {
      id: invoiceData.items.length + 1,
      name: "New Item",
      description: "Description here",
      unitPrice: 0,
      qty: 1,
      total: 0,
    };

    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const updateItem = (id, field, value) => {
    const updatedItems = invoiceData.items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };

     
        if (field === "unitPrice" || field === "qty") {
          updatedItem.total = updatedItem.unitPrice * updatedItem.qty;
        }

        return updatedItem;
      }
      return item;
    });

    const updatedSubTotal = updatedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
      subTotal: updatedSubTotal,
      grandTotal: updatedSubTotal,
    });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fontbold, setFontBold] = useState("font-normal");
  const [fontColor, setFontColor] = useState("#000000");
  const [hasBorder, setHasBorder] = useState(true);

  const [isColumnsOpen, setIsColumnsOpen] = useState(false);
  const [isRowsOpen, setIsRowsOpen] = useState(false);
  const [isTableStylesOpen, setIsTableStylesOpen] = useState(false);

  const [columnSettings, setColumnSettings] = useState([
    { id: 1, name: "Item Details", align: "left", visible: true },
    { id: 2, name: "Unit Price", align: "left", visible: true },
    { id: 3, name: "Qty", align: "left", visible: true },
    { id: 4, name: "Total", align: "left", visible: true },
  ]);

  const [tableStyles, setTableStyles] = useState({
    borderStyle: "solid",
    borderWidth: 1,
    padding: 3,
    zebra: false,
    tableColor: "#ffffff",
    rowColor: "#f9f9f9",
  });

  const updateColumnAlign = (id, align) => {
    setColumnSettings(
      columnSettings.map((col) => (col.id === id ? { ...col, align } : col))
    );
  };

  

  const addColumn = () => {
    const newId = columnSettings.length + 1;
    setColumnSettings([
      ...columnSettings,
      { id: newId, name: `Column ${newId}`, align: "left", visible: true },
    ]);
  };

  const handlePositionChange = (axis, value) => {
    if (axis === "x") {
      setTablePosition({ ...tablePosition, x: parseInt(value) || 0 });
    } else {
      setTablePosition({ ...tablePosition, y: parseInt(value) || 0 });
    }
  };

  const handleSizeChange = (dimension, value) => {
    if (dimension === "width") {
      setTableSize({ ...tableSize, width: parseInt(value) || 100 });
    } else {
      setTableSize({ ...tableSize, height: value ? parseInt(value) : "auto" });
    }
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

 
  

  return (
    <>
      <div className="bg-gray-100 overflow-hidden">
        <div className="bg-blue-900 h-5 w-full"></div>
        <div className="bg-white text-blue-900 p-2 md:p-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
            <button className="text-blue p-1 md:p-2 rounded-md hover:bg-gray-100">
              <ArrowLeft className="h-4 md:h-5 w-4 md:w-5" />
            </button>
            <span className="ml-2 font-medium text-sm md:text-base truncate">{invoiceData.invoiceName}</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2 w-full md:w-auto justify-end">
            <div className="mx-2 md:mx-5 flex items-center justify-between p-2 md:p-3 h-8 md:h-10 w-16 md:w-20 border border-gray-400 rounded-md">
              <Undo2 className="text-xl h-4 md:h-5 w-4 md:w-5 text-gray-600 cursor-pointer" />
              <Undo2 className="text-gray-400 h-4 md:h-5 w-4 md:w-5 rotate-y-180 cursor-pointer" />
            </div>

            <button className="text-black border flex items-center p-1 md:p-2 rounded-md hover:bg-gray-300 transition duration-200 text-xs md:text-sm">
              <Eye className="h-3 md:h-4 w-3 md:w-4 mr-1" />
              Preview
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm">
              Publish
            </button>
          </div>
        </div>

        
        <div className="flex flex-row gap-50 w-screen">
          <div className={`${sidebarCollapsed ? 'w-12' : 'w-70'} transition-all duration-300 bg-white shadow-md rounded-md overflow-hidden`}>
            <div className="flex border-b border-gray-300 p-2 font-bold">
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
                className="text-gray-500 hover:bg-gray-100 rounded p-1"
              >
                {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : ""}
              </button>
              {!sidebarCollapsed && (
                <>
                  <p className="text-gray-500 ml-1">Manage:</p>
                  <p className="font-bold text-bold pl-2">Invoice Table</p>
                  <X  className="h-5 w-5 ml-auto cursor-pointer"  onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
                </>
              )}
            </div>

            {!sidebarCollapsed && (
              <div className="my-5">
                <div className="flex flex-row gap-5 items-center justify-center p-2">
                  <div className="w-20">
                    <p className="font-medium">Position</p>
                  </div>
                  <div className="w-60 flex gap-2">
                    {["x", "y"].map((axis) => (
                      <div
                        key={axis}
                        className="border h-8 flex items-center justify-between px-2 w-20 rounded-md"
                      >
                        <span className="font-medium">{axis.toUpperCase()}</span>
                        <input
                          type="number"
                          value={tablePosition[axis]}
                          onChange={(e) =>
                            handlePositionChange(axis, e.target.value)
                          }
                          className="w-full focus:outline-none text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row gap-5 items-center justify-center p-2">
                  <div className="w-20">
                    <p className="font-medium">Size</p>
                  </div>
                  <div className="w-60 flex gap-2">
                    {["width", "height"].map((dimension) => (
                      <div
                        key={dimension}
                        className="border h-8 flex items-center justify-between px-2 w-20 rounded-md"
                      >
                        <span className="font-medium">
                          {dimension === "width" ? "W" : "H"}
                        </span>
                        <input
                          type="text"
                          value={dimension === "width" 
                            ? tableSize.width 
                            : tableSize.height === "auto" ? "" : tableSize.height}
                          onChange={(e) => handleSizeChange(dimension, e.target.value)}
                          className="w-full focus:outline-none text-center"
                          placeholder={dimension === "height" ? "auto" : ""}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {sidebarCollapsed ? (
              
              <>
                <button 
                  onClick={() => {
                    setSidebarCollapsed(false);
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="w-full flex justify-center p-2 hover:bg-gray-100"
                >
                  <div className="p-1">
                    <ChevronUp className={`h-4 w-4 ${isDropdownOpen ? '' : 'rotate-180'}`} />
                  </div>
                </button>
                
                <button 
                  onClick={() => {
                    setSidebarCollapsed(false);
                    setIsColumnsOpen(!isColumnsOpen);
                  }}
                  className="w-full flex justify-center p-2 hover:bg-gray-100"
                >
                  <div className="border p-1 rounded">
                    <Plus className="h-4 w-4" />
                  </div>
                </button>
                
                <button 
                  onClick={() => {
                    setSidebarCollapsed(false);
                    setIsRowsOpen(!isRowsOpen);
                  }}
                  className="w-full flex justify-center p-2 hover:bg-gray-100"
                >
                  <div className="p-1">
                    <AlignLeft className="h-4 w-4 rotate-90" />
                  </div>
                </button>
                
                <button 
                  onClick={() => {
                    setSidebarCollapsed(false);
                    setIsTableStylesOpen(!isTableStylesOpen);
                  }}
                  className="w-full flex justify-center p-2 hover:bg-gray-100"
                >
                  <div className="p-1">
                    <div className="h-4 w-4 border border-gray-400 bg-gray-100"></div>
                  </div>
                </button>
              </>
            ) : (
             
              <>
                <div className="relative">
                  <button
                    className="w-full border-b border-gray-300 flex justify-between p-2 rounded-md cursor-pointer font-bold"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Table Header
                    {isDropdownOpen ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronUp className="h-4 w-4 ml-1 rotate-180" />
                    )}
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute bg-white w-full p-3 mt-2 z-10">
                      <div className="flex flex-row justify-between p-2 border-b border-gray-300">
                        <p>Header Visibility</p>
                        <div
                          className={`relative w-14 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                            headerVisible ? "bg-green-500" : "bg-gray-300"
                          }`}
                          onClick={() => setHeaderVisible(!headerVisible)}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                              headerVisible ? "translate-x-8" : "translate-x-0"
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between p-2 border-b border-gray-300">
                        <p>Background</p>
                        <div className="flex items-center gap-1">
                          <p className="text-sm">{backgroundColor}</p>
                          <input
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between p-2 border-b border-gray-300">
                        <p>Font Size</p>
                        <select
                          onChange={(e) => setFontBold(e.target.value)}
                          className="border p-1 rounded-md cursor-pointer border-gray-400 text-sm"
                        >
                          <option value="text-[8px]">8px</option>
                          <option value="text-[10px]">10px</option>
                          <option value="text-[12px]">12px</option>
                          <option value="text-[14px]">14px</option>
                          <option value="text-[16px]">16px</option>
                        </select>
                      </div>
                      <div className="flex flex-row justify-between p-2 border-b border-gray-300">
                        <p>Font Weight</p>
                        <select
                          onChange={(e) => setFontBold(e.target.value)}
                          className="border border-gray-400 p-1 rounded-md cursor-pointer text-sm"
                        >
                          <option value="font-normal">Normal</option>
                          <option value="font-semibold">Semibold</option>
                          <option value="font-bold">Bold</option>
                          <option value="font-serif">Serif</option>
                        </select>
                      </div>
                      <div className="flex flex-row justify-between p-2 border-b border-gray-300">
                        <p>Font Color</p>
                        <div className="flex items-center gap-1">
                          <p className="text-sm">{fontColor}</p>
                          <input
                            type="color"
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                            className="cursor-pointer "
                          />
                        </div>
                      </div>
                      <div className="flex flex-row justify-between p-2">
                        <p>Table Border</p>
                        <div
                          className={`relative w-14 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
                            hasBorder ? "bg-green-500" : "bg-gray-300"
                          }`}
                          onClick={() => setHasBorder(!hasBorder)}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                              hasBorder ? "translate-x-8" : "translate-x-0"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

               
                <div className="relative mb-1 cursor-pointer">
                  <div
                    className="w-full border-b border-gray-300 flex justify-between p-2 rounded-md cursor-pointer font-bold"
                    onClick={() => setIsColumnsOpen(!isColumnsOpen)}
                  >
                    <div className="flex items-center text-sm md:text-base">Columns</div>

                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          addColumn();
                        }}
                        className="p-1 rounded flex items-center text-xs"
                      >
                        <Plus className="h-3 md:h-4 w-3 md:w-4 mr-1 text-black font-bold cursor-pointer" />
                      </button>
                      {isColumnsOpen ? (
                        <ChevronUp className="h-3 md:h-4 w-3 md:w-4 ml-1" />
                      ) : (
                        <ChevronUp className="h-3 md:h-4 w-3 md:w-4 ml-1 rotate-180" />
                      )}
                    </div>
                  </div>

                  {isColumnsOpen && (
                    <div className="absolute bg-white w-full p-2 md:p-3 mt-2 shadow-md z-20">
                      {columnSettings.map((column) => (
                        <div
                          key={column.id}
                          className="border-b border-gray-200 pb-2 mb-2 flex flex-col sm:flex-row gap-1"
                        >
                          <div className="flex justify-between items-center mb-2 w-full sm:w-1/2">
                            <input
                              type="text"
                              value={column.name}
                              onChange={(e) => {
                                setColumnSettings(
                                  columnSettings.map((col) =>
                                    col.id === column.id
                                      ? { ...col, name: e.target.value }
                                      : col
                                  )
                                );
                              }}
                              className="border border-gray-400 px-2 py-1 text-sm rounded w-full mr-2"
                            />
                          </div>

                          <div className="flex justify-between items-center w-full sm:w-1/2">
                            <div className="flex space-x-1 bg-white shadow-md p-1 rounded">
                              <button
                                onClick={() => updateColumnAlign(column.id, "left")}
                                className={`p-1 rounded ${
                                  column.align === "left"
                                    ? "text-black"
                                    : "text-gray-400"
                                }`}
                              >
                                <AlignLeft className="h-4 w-4 cursor-pointer" />
                              </button>
                              <button
                                onClick={() =>
                                  updateColumnAlign(column.id, "center")
                                }
                                className={`p-1 rounded ${
                                  column.align === "center"
                                    ? "text-black"
                                    : "text-gray-400"
                                }`}
                              >
                                <AlignCenter className="h-4 w-4 cursor-pointer" />
                              </button>
                              <button
                                onClick={() =>
                                  updateColumnAlign(column.id, "right")
                                }
                                className={`p-1 rounded ${
                                  column.align === "right"
                                    ? "text-black"
                                    : "text-gray-400"
                                }`}
                              >
                                <AlignRight className="h-4 w-4 cursor-pointer" />
                              </button>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (columnSettings.length > 1) {
                                  try {
                                    const newColumns = [...columnSettings].filter(
                                      (col) => col.id !== column.id
                                    );
                                    setColumnSettings(newColumns);
                                  } catch (error) {
                                    console.error("Error deleting column:", error);
                                    alert("Error deleting column");
                                  }
                                } else {
                                  alert("Cannot delete the last column");
                                }
                              }}
                              className="p-1 rounded bg-gray-100 text-black ml-1"
                            >
                              <Trash className="h-4 w-4 cursor-pointer" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative mb-1">
                  <button
                    className="w-full border-b border-gray-300 flex justify-between p-2 rounded-md cursor-pointer font-bold"
                    onClick={() => setIsRowsOpen(!isRowsOpen)}
                  >
                    <div className="flex items-center">Table Rows</div>
                    {isRowsOpen ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronUp className="h-4 w-4 ml-1 rotate-180" />
                    )}
                  </button>
                </div>

             
                <div className="relative mb-1">
                  <button
                    className="w-full border-b border-gray-300 flex justify-between p-2 rounded-md cursor-pointer font-bold"
                    onClick={() => setIsTableStylesOpen(!isTableStylesOpen)}
                  >
                    <div className="flex items-center">Table Styles</div>
                    {isTableStylesOpen ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronUp className="h-4 w-4 ml-1 rotate-180" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col min-h-screen">
            <div className="flex flex-col md:flex-row flex-1">
              <div className="flex-1  p-4 overflow-auto">
                <div className="bg-white shadow-md max-w-4xl mx-auto">
                  <div className="flex flex-col">
                    <div className="p-25">
                      <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-8">
                        <div className="mb-4 md:mb-0">
                          <div className="text-black mb-2 font-bold text-md">
                            Invoice To
                          </div>
                          <div className="font-bold text-base md:text-lg">
                            {invoiceData.clientName}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            {invoiceData.clientAddress}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            P: {invoiceData.clientPhone}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            E: {invoiceData.clientEmail}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <div className="flex justify-between mb-2 border-b-4 border-blue-400 pb-2">
                            <div className="text-gray-600 mr-2 md:mr-4 text-xs md:text-sm">
                              Total Due:
                            </div>
                            <div className="font-bold text-xs md:text-sm">
                              {formatCurrency(invoiceData.grandTotal)}
                            </div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-600 mr-4 font-bold">
                              Invoice No:
                            </div>
                            <div>{invoiceData.invoiceNo}</div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-600 mr-4 font-bold">
                              Account No:
                            </div>
                            <div>{invoiceData.accountNo}</div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-600 mr-4 font-bold">
                              Invoice Date:
                            </div>
                            <div>{invoiceData.invoiceDate}</div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mb-8 overflow-x-auto ${
                          hasBorder ? "border border-gray-300 rounded-md" : ""
                        }`}
                        style={{
                          position: "relative",
                          left: `${tablePosition.x}px`,
                          top: `${tablePosition.y}px`,
                          width: `${tableSize.width}%`,
                          height:
                            tableSize.height === "auto"
                              ? "auto"
                              : `${tableSize.height}px`,
                        }}
                      >
                        <table className="w-full text-sm md:text-base">
                          {headerVisible && (
                            <thead>
                              <tr style={{ backgroundColor: backgroundColor }}>
                                {columnSettings
                                  .filter((col) => col.visible)
                                  .map((column) => (
                                    <th
                                      key={column.id}
                                      className={`p-3 ${fontbold}`}
                                      style={{
                                        color: fontColor,
                                        textAlign: column.align,
                                      }}
                                    >
                                      {column.name}
                                    </th>
                                  ))}
                              </tr>
                            </thead>
                          )}
                          <tbody>
                            {invoiceData.items.map((item) => (
                              <tr
                                key={item.id}
                                className={hasBorder ? "border-t" : ""}
                                style={
                                  item.id % 2 === 0 && tableStyles.zebra
                                    ? { backgroundColor: tableStyles.rowColor }
                                    : {}
                                }
                              >
                                
                                {columnSettings[0] && columnSettings[0].visible && (
                                  <td
                                    className={`p-${tableStyles.padding}`}
                                    style={{
                                      textAlign: columnSettings[0].align,
                                    }}
                                  >
                                    <input
                                      type="text"
                                      value={item.name}
                                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                      className="font-medium mb-1 w-full border-none focus:outline-none"
                                      style={{ textAlign: columnSettings[0].align }}
                                    />
                                    <input
                                      type="text"
                                      value={item.description}
                                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                      className="text-sm text-gray-600 w-full border-none focus:outline-none"
                                      style={{ textAlign: columnSettings[0].align }}
                                    />
                                  </td>
                                )}

                                
                                {columnSettings[1] && columnSettings[1].visible && (
                                  <td
                                    className={`p-${tableStyles.padding}`}
                                    style={{ textAlign: columnSettings[1].align }}
                                  >
                                    <input
                                      type="number"
                                      value={item.unitPrice}
                                      onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                                      className="w-full border-none focus:outline-none"
                                      style={{ textAlign: columnSettings[1].align }}
                                    />
                                  </td>
                                )}

                               
                                {columnSettings[2] && columnSettings[2].visible && (
                                  <td
                                    className={`p-${tableStyles.padding}`}
                                    style={{ textAlign: columnSettings[2].align }}
                                  >
                                    <input
                                      type="number"
                                      value={item.qty}
                                      onChange={(e) =>
                                        updateItem(
                                          item.id,
                                          "qty",
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                      className="w-20 border-none focus:outline-none"
                                      style={{
                                        textAlign: columnSettings[2].align,
                                      }}
                                    />
                                  </td>
                                )}

                                {columnSettings[3] && columnSettings[3].visible && (
                                  <td
                                    className={`p-${tableStyles.padding} font-medium`}
                                    style={{ textAlign: columnSettings[3].align }}
                                  >
                                    {formatCurrency(item.total)}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col md:flex-row mb-4 md:mb-8">
                        <div className="flex-1 mb-4 md:mb-0">
                          <div className="font-medium mb-2 text-sm md:text-base">Payment Info</div>
                          <div className="mb-1 text-xs md:text-sm">
                            <span className="text-gray-600 inline-block w-20 md:w-28">
                              Account #:
                            </span>
                            <span className="font-bold">
                              {invoiceData.paymentInfo.accountNumber}
                            </span>
                          </div>
                          <div className="mb-1">
                            <span className="text-gray-600 inline-block w-28">
                              A/C Name:
                            </span>
                            <span className="font-bold">
                              {invoiceData.paymentInfo.accountName}
                            </span>
                          </div>
                          <div className="mb-1">
                            <span className="text-gray-600 inline-block w-28">
                              Bank Name:
                            </span>
                            <span className="font-bold">
                              {invoiceData.paymentInfo.bankName}
                            </span>
                          </div>
                        </div>
                        <div className="md:w-64">
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-600 font-semibold">
                              Sub Total:
                            </div>
                            <div className="font-medium">
                              {formatCurrency(invoiceData.subTotal)}
                            </div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <div className="text-gray-600 font-semibold">
                              Tax:
                            </div>
                            <div>{invoiceData.tax}%</div>
                          </div>
                          <div className="border-t-4 border-blue-400 pt-2 mt-2">
                            <div className="flex justify-between">
                              <div className="font-bold">Grand Total:</div>
                              <div className="font-bold">
                                {formatCurrency(invoiceData.grandTotal)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                     
                    </div>
                    <div className="px-4 md:px-25 py-6 md:py-10 bg-gray-200">
                      <div className="mb-4 md:mb-6">
                        <div className="font-bold text-xl md:text-2xl">
                          Thank you for your business!
                        </div>
                      </div>

                      <div className="text-gray-600 text-sm md:text-base">
                        <div className="font-bold mb-1 text-base md:text-lg">
                          Terms & Condition
                        </div>
                        <div>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat magnam impedit nam suscipit repudiandae.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
