import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./OrderChart.css";

Chart.register(...registerables);

const OrderChart = () => {
  const [weeklyData, setWeeklyData] = useState(null);
  const [allOrdersData, setAllOrdersData] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://dashboard-backend-r5t2.onrender.com/api/orders");
        const data = await response.json();
        processOrderData(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const processOrderData = (orders) => {
    const weeklyOrders = {};
    const allOrders = {};
    const today = new Date();
    
    orders.forEach((order) => {
      const orderDate = new Date(order.orderTime);

      // Weekly Orders
      const weekNumber = getWeekNumber(orderDate, today);
      if (weeklyOrders[weekNumber]) {
        weeklyOrders[weekNumber] += 1;
      } else {
        weeklyOrders[weekNumber] = 1;
      }

      // All Orders (Grouped by Date)
      const orderDay = orderDate.toLocaleDateString(); // Group by day
      if (allOrders[orderDay]) {
        allOrders[orderDay] += 1;
      } else {
        allOrders[orderDay] = 1;
      }
    });

    // Set weekly orders data
    const weeklyLabels = [];
    const weeklyValues = [];
    Object.keys(weeklyOrders).forEach((week) => {
      weeklyLabels.push(`Week ${week}`);
      weeklyValues.push(weeklyOrders[week]);
    });

    setWeeklyData({
      labels: weeklyLabels,
      datasets: [
        {
          label: "Weekly Orders",
          data: weeklyValues,
          fill: false,
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    });

    // Set all orders data (by day)
    const allOrdersLabels = [];
    const allOrdersValues = [];
    Object.keys(allOrders).forEach((day) => {
      allOrdersLabels.push(day);
      allOrdersValues.push(allOrders[day]);
    });

    setAllOrdersData({
      labels: allOrdersLabels,
      datasets: [
        {
          label: "Orders Over Time",
          data: allOrdersValues,
          fill: false,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
        },
      ],
    });

    // Set total orders count
    setTotalOrders(orders.length);
  };

  const getWeekNumber = (orderDate, today) => {
    const start = new Date(today.getFullYear(), 0, 1);
    const days = Math.floor((orderDate - start) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + start.getDay() + 1) / 7);
  };

  return (
    <div className="order-chart">
      <h2>Order Statistics</h2>
<div className="chart-row">
	
      {/* Weekly Orders Chart */}
      <div className="chart-container">
        <h3>Weekly Orders</h3>
        {weeklyData ? (
          <Line data={weeklyData} />
        ) : (
          <p>Loading weekly orders chart...</p>
        )}
      </div>

      {/* All Orders Over Time Chart */}
      <div className="chart-container">
        <h3>Orders Over Time</h3>
        {allOrdersData ? (
          <Line data={allOrdersData} />
        ) : (
          <p>Loading all orders chart...</p>
        )}
      </div>

      {/* Total Orders */}
      {/* <div className="total-orders">
        <h3>Total Orders: {totalOrders}</h3>
      </div> */}
</div>
    </div>
  );
};

export default OrderChart;
