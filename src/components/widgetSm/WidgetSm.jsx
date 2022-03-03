import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import ReactSearchBox from "react-search-box";
import React, { Component, useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";

const WidgetSm = () => {
  const [orderslist, setOrderslist] = useState([]);
  //get cart orders
  const getTranxs = async () => {
    try {
      const response = await fetch("http://localhost:9000/search-item");
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

  {
    /* let data = [];
  orderslist.forEach((item) =>
    data.push({ key: item.mpesa_code, value: item.mpesa_code })
  );
  console.log(data);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Search</span>

      <ReactSearchBox
        placeholder="Enter the code"
        value=""
        data={data}
        callback={(record) => console.log(record)}
        
      />
    </div>
  );*/
  }
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Search</span>
      <div className="main">
        <h1>React Search</h1>
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"
          />
        </div>
        <List input={inputText} />
      </div>
    </div>
  );
};

export default WidgetSm;
