import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PanoramaSharp,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useParams, Link } from "react-router-dom";
import "./processorder.css";
import React, { useRef, useState, useEffect } from "react";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import NetworkCheckIcon from "@material-ui/icons/NetworkCheck";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ProcessOrder() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  let { orderId } = useParams();
  const [customerorder, setCustomerorder] = useState([]);
  const [status_v, setStatus_v] = useState("");
  //const [c_id, setC_id] = useState("");
  console.log({ orderId });

  const getTranxsById = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/search-item/${orderId}`
      );
      const jsonData = await response.json();
      setCustomerorder(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTranxsById();
  }, []);
  const handleButton = (e) => {
    e.preventDefault();
    //const status_v = useRef();
    //console.log("new status " + status_v);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setStatus_v(e.target.value);
  };
  console.log("status_v " + status_v);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("xxxx " + status_v + " orderId " + orderId);
    try {
      const body = {
        status_v,
      };
      const response = await fetch(
        `http://localhost:9000/update-status/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  if (customerorder.length == 0) {
    getTranxsById();

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Process Order</h1>
        </div>
        <div className="userContainer">
          Something happened, we cannot retrieve the record
        </div>
      </div>
    );
  } else {
    let phonenumber = customerorder[0].phonenumber;
    let firstname = customerorder[0].firstname;
    let lastname = customerorder[0].lastname;
    let mpesa_code = customerorder[0].mpesa_code;
    let product_name = customerorder[0].product_name;
    let transamount = customerorder[0].transamount;
    let total_price = customerorder[0].total_price;
    let created_at = customerorder[0].created_at;
    let status = customerorder[0].status;

    return (
      <div className="user">
        <div className="userTitleContainer">
          <h3 className="userTitle">Process Order</h3>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={process.env.PUBLIC_URL + "/images/passport.png"}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">
                  {firstname + " " + lastname}{" "}
                </span>
                <span className="userShowUserTitle">customer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Order Details</span>
              <div className="userShowInfo">
                <ShoppingCartIcon className="userShowIcon" />
                <span className="userShowInfoTitle">{product_name}</span>
              </div>
              <div className="userShowInfo">
                <AttachMoneyIcon className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Cost: Ksh.{total_price}
                </span>
              </div>
              <div className="userShowInfo">
                <AttachMoneyIcon className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Paid : Ksh.{transamount}
                </span>
              </div>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">
                  M-pesa Code: {mpesa_code}
                </span>
              </div>

              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{created_at}</span>
              </div>

              <div className="userShowInfo">
                <NetworkCheckIcon className="userShowIcon" />
                {status == "in progress" && (
                  <span className="userShowInfoTitle">
                    <td className="widgetLgStatus">
                      <Button type="Pending" />{" "}
                    </td>
                  </span>
                )}
                {status == "paid" && (
                  <span className="userShowInfoTitle">
                    <td className="widgetLgStatus">
                      <Button type="Approved" />{" "}
                    </td>
                  </span>
                )}
                {status == "closed" && (
                  <span className="userShowInfoTitle">
                    <td className="widgetLgStatus">
                      <Button type="Closed" />{" "}
                    </td>
                  </span>
                )}
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+{phonenumber}</span>
              </div>

              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Nairobi | KENYA</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Process</span>
            <form onSubmit={(e) => handleSubmit(e)} className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <select value={status_v} onChange={(e) => handleChange(e)}>
                    <option value=""></option>
                    <option value="closed">Closed</option>
                    <option value="in progress">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                <div className="userUpdateItem">
                  <label>M-Pesa Code</label>
                  <input
                    type="text"
                    placeholder={mpesa_code}
                    className="userUpdateInput"
                    disabled
                  />
                </div>
                <div className="userUpdateItem">
                  <div className="userUpdateRight">
                    <div className="userUpdateUpload"></div>
                    <button
                      className="userUpdateButton"
                      // onClick={(e) => handleButton(e)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
