import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManager.css'

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState({
        productName: '',
        category: '',
        price: '',
        salePrice: '',
        stock: '',
        status: 'Available',
        published: true,
    });
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
			console.log(products)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    // Handle form submission for creating or updating a product
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProduct) {
            // Update product
            try {
                await axios.put(`http://localhost:5000/api/products/update/${editingProduct._id}`, productData);
                alert('Product updated successfully!');
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            // Create new product
            try {
                await axios.post('http://localhost:5000/api/products/create', productData);
                alert('Product created successfully!');
            } catch (error) {
                console.error('Error creating product:', error);
            }
        }
        setProductData({
            productName: '',
            category: '',
            price: '',
            salePrice: '',
            stock: '',
            status: 'Available',
            published: true,
        });
        setEditingProduct(null);
        fetchProducts(); // Refresh the product list
    };

    // Handle product deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
            alert('Product deleted successfully!');
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Handle product editing
    const handleEdit = (product) => {
        setEditingProduct(product);
        setProductData({
            productName: product.productName,
            category: product.category,
            price: product.price,
            salePrice: product.salePrice,
            stock: product.stock,
            status: product.status,
            published: product.published,
        });
    };

    // Fetch products when the component is mounted
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='Product'>
            <h2>Product Management</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Sale Price:</label>
                    <input
                        type="number"
                        name="salePrice"
                        value={productData.salePrice}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={productData.status}
                        onChange={handleInputChange}
                    >
                        <option value="Available">Available</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
                <div>
                    <label>Published:</label>
                    <input
                        type="checkbox"
                        name="published"
                        checked={productData.published}
                        onChange={(e) =>
                            setProductData({ ...productData, published: e.target.checked })
                        }
                    />
                </div>
                <button type="submit">{editingProduct ? 'Update Product' : 'Create Product'}</button>
            </form>

            <h3>Product List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Published</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.salePrice}</td>
                            <td>{product.stock}</td>
                            <td>{product.status}</td>
                            <td>{product.published ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManager;
