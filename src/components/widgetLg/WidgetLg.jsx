import "./widgetLg.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function WidgetLg() {
  const [data, setData] = useState(userRows);
  const [orderslist, setOrderslist] = useState([]);
  //get cart orders
  const getTranxs = async () => {
    try {
      const response = await fetch("http://localhost:9000/orders-list");
      const jsonData = await response.json();
      console.log(jsonData);
      setOrderslist(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getTranxs();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "phonenumber", headerName: "Phone #", width: 150 },
    { field: "product_name", headerName: "Order items", width: 300 },
    { field: "total_price", headerName: "Cost(Ksh)", width: 150 },
    { field: "paid_amount", headerName: "Paid(Ksh)", width: 150 },
    { field: "status", headerName: "Status", width: 140 },
    { field: "mpesa_code", headerName: "TransID", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={orderslist}
        disableSelectionOnClick
        columns={columns}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
}
