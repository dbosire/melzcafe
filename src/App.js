import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Analytics from "./pages/analytics/Analytics";
import OrdersList from "./pages/orders/OrdersList";
import ListOrderSearch from "./pages/orders/ListOrderSearch";
import WidgetLg from "./components/widgetLg/WidgetLg";
import ProcessOrder from "./pages/orders/ProcessOrder";
import Login from "./pages/login/Login";
import PrivateRoute from "./pages/login/PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<ListOrderSearch />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/orders" element={<ListOrderSearch />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/process-order/:orderId" element={<ProcessOrder />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newProduct" element={<NewProduct />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Analytics />} />
            <Route path="/reports" element={<WidgetLg />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
