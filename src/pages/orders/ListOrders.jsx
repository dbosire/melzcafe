import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

function ListOrders(props) {
  let orderId = "";
  let orderslist = [];

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
            <Link to={"/process-order/" + params.row.id}>
              <button className="userListEdit">Process</button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <DataGrid
      rows={props.orderslist}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      checkboxSelection
    />
  );
}

export default ListOrders;
