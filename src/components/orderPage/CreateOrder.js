import React, { useEffect, useState } from "react";
import axios from "axios";
import './CreateOrder.css'

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    invoiceNo: "",
    orderTime: "",
    customerName: "",
    paymentMethod: "Cash", // Default option
    amount: "",
    customerEmail:"",
    customerPhone:"",
    status: "Pending", // Default option
  });

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData
      );
      console.log("Order created:", response.data);
      alert("Order successfully created!");
      setOrderData({
        invoiceNo: "",
        orderTime: "",
        customerName: "",
        paymentMethod: "Cash",
        customerEmail:"",
        customerPhone:"",
        amount: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order");
    }
  };

  //useEffect
  // Fetch customer data when component mounts
  useEffect(() => {

  }, []);
  return (
    <div className="container">
      {/* <h2>Create a New Order</h2> */}
      <form  onSubmit={handleSubmit}>
      <h2>Create a New Order</h2>
        <label>
          Invoice No:
          <input
            type="text"
            name="invoiceNo"
            value={orderData.invoiceNo}
            onChange={handleChange}
            required  
          />
        </label>
        <label>
          Order Time:
          <input
            type="datetime-local"
            name="orderTime"
            value={orderData.orderTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={orderData.customerName}
            onChange={handleChange}
            required
          />
        </label>
		<label>
          Customer Email:
          <input
            type="text"
            name="customerEmail"
            value={orderData.customerEmail}
            onChange={handleChange}
            required
          />
        </label>
		<label>
          Customer Phone:
          <input
            type="text"
            name="customerPhone"
            value={orderData.customerPhone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Payment Method:
          <select
            name="paymentMethod"
            value={orderData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Credit">Credit</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={orderData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={orderData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancel">Cancel</option>
          </select>
        </label>
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrder;
