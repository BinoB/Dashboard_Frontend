import React, { useEffect, useState } from "react";
import "./OrderSummary.css";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { BsCart4 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../infoBox/InfoBox";

// Icons
const earningIcon = <HiOutlineCurrencyRupee size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [todayOrders, setTodayOrders] = useState(0);
  const [yesterdayOrders, setYesterdayOrders] = useState(0);
  const [thisMonthSales, setThisMonthSales] = useState(0);
  const [lastMonthSales, setLastMonthSales] = useState(0);
  const [allTimeSales, setAllTimeSales] = useState(0);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://dashboard-backend-r5t2.onrender.com/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate order statistics
  useEffect(() => {
    if (orders.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split("T")[0];

      // Today's orders
      const todayOrdersData = orders.filter(
        (order) => order.orderTime.split("T")[0] === today
      );
      setTodayOrders(
        todayOrdersData.reduce((total, order) => total + order.amount, 0)
      );

      // Yesterday's orders
      const yesterdayOrdersData = orders.filter(
        (order) => order.orderTime.split("T")[0] === yesterdayString
      );
      setYesterdayOrders(
        yesterdayOrdersData.reduce((total, order) => total + order.amount, 0)
      );

      // This month's and last month's sales
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const thisMonthOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderTime);
        return (
          orderDate.getMonth() === currentMonth &&
          orderDate.getFullYear() === currentYear
        );
      });
      setThisMonthSales(
        thisMonthOrders.reduce((total, order) => total + order.amount, 0)
      );

      const lastMonthOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderTime);
        return (
          orderDate.getMonth() === currentMonth - 1 &&
          orderDate.getFullYear() === currentYear
        );
      });
      setLastMonthSales(
        lastMonthOrders.reduce((total, order) => total + order.amount, 0)
      );

      // All-time sales
      setAllTimeSales(
        orders.reduce((total, order) => total + order.amount, 0)
      );
    }
  }, [orders]);

  return (
    <div className="order-summary">
      <h3 className="--mt">Order Status</h3>
      <div className="info-summary">
        <InfoBox
          icon={earningIcon}
          title={"Today Orders"}
          count={`₹${formatNumbers(todayOrders)}`}
          bgColor="card2"
        />
        <InfoBox
          icon={productIcon}
          title={"Yesterday Orders"}
          count={`₹${formatNumbers(yesterdayOrders)}`}
          bgColor="card1"
        />
        <InfoBox
          icon={categoryIcon}
          title={"This Month Sales"}
          count={`₹${formatNumbers(thisMonthSales)}`}
          bgColor="card3"
        />
        {/* <InfoBox
          icon={categoryIcon}
          title={"Last Month Sales"}
          count={`₹${formatNumbers(lastMonthSales)}`}
          bgColor="card3"
        /> */}
        <InfoBox
          icon={categoryIcon}
          title={"All Time Sales"}
          count={`₹${formatNumbers(allTimeSales)}`}
          bgColor="card3"
        />
      </div>
    </div>
  );
};

export default OrderSummary;
