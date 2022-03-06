import "./orders.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ListOrders from "./ListOrders";

export default function ListOrderSearch() {
  const [orderslist, setOrderslist] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [inputText, setInputText] = useState("");
  //get cart orders
  const getTranxs = async () => {
    try {
      const response = await fetch("http://localhost:9000/search-item");
      const jsonData = await response.json();
      console.log(jsonData);
      setOrderslist(jsonData);
      setFilteredList(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTranxs();
  }, []);

  let inputHandler = (e) => {
    e.preventDefault();
    //convert input text to lower case
    var upperCase = e.target.value.toUpperCase();

    if (!upperCase) {
      setFilteredList(orderslist);
    } else {
      upperCase = parseInt(upperCase);
      if (Number.isInteger(upperCase)) {
        setFilteredList(orderslist.filter((data) => data.id === upperCase));
      } else {
        setFilteredList(
          orderslist.filter(
            (data) => data.mpesa_code.toUpperCase() === upperCase
          )
        );
      }
    }
  };
  return (
    <div className="userList">
      <div className="main">
        <h3> Search</h3>
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Enter order # or M-pesa code"
          />
        </div>
      </div>
      <ListOrders input={inputText} orderslist={filteredList} />
    </div>
  );
}
