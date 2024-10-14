import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Order from './components/orderPage/Order';
import CreateOrder from './components/orderPage/CreateOrder';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';
import ProductManager from './components/product/ProductManager';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route
          path="/"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/order"
          element={
            <Sidebar>
              <Layout>
                <Order />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/createorder"
          element={
            <Sidebar>
              <Layout>
                <CreateOrder />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product"
          element={
            <Sidebar>
              <Layout>
                <ProductManager />
              </Layout>
            </Sidebar>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        /> */}
    </Routes>
    </BrowserRouter>
  );
};

export default App;
