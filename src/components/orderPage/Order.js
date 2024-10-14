import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css'

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the API
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders');
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            {/* <h1>Dashboard</h1> */}
            <div>
                <h2>Recent Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice No</th>
                            <th>Order Time</th>
                            <th>Customer Name</th>
                            <th>Method</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.invoiceNo}>
                                <td>{order.invoiceNo}</td>
                                <td>{new Date(order.orderTime).toLocaleString()}</td>
                                <td>{order.customerName}</td>
                                <td>{order.paymentMethod}</td>
                                <td>${order.amount.toFixed(2)}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
