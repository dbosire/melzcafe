import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [mpesa_transc, setMpesa_transc] = useState([]);
  //get cart orders
  const getTranxs = async () => {
    try {
      const response = await fetch("http://localhost:9000/mpesa-transactions");
      const jsonData = await response.json();
      console.log(jsonData);
      setMpesa_transc(jsonData);
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

  // mpesa_transc.map((item))
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstname", headerName: "Firstname", width: 200 },
    { field: "lastname", headerName: "Lastname", width: 200 },
    { field: "phonenumber", headerName: "Phone #", width: 150 },
    { field: "transid", headerName: "Transid", width: 150 },
    { field: "transamount", headerName: "Amount", width: 150 },
    { field: "transtime", headerName: "Transtime", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit" disabled>
                View
              </button>
            </Link>
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />*/}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={mpesa_transc}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
