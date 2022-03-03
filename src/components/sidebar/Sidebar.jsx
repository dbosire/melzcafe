import "./sidebar.css";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PersonOutline,
  DynamicFeedSharp,
  MailOutline,
  ChatBubbleOutline,
  Report,
  WorkOutline,
  AttachMoney,
  Assessment,
  Storefront,
} from "@material-ui/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sideListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            {/*<li className="sideListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sideListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/orders" className="link">
              <li className="sideListItem">
                <ShoppingCartIcon />
                Orders
              </li>
            </Link>
            <Link to="/reports" className="link">
              <li className="sideListItem">
                <Assessment className="sidebarIcon" />
                Reports
              </li>
            </Link>
            <Link to="/analytics" className="link">
              <li className="sideListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sideListItem">
                <Storefront className="sidebarIcon" />
                M-pesa Transactions
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
