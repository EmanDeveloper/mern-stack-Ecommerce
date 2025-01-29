import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProduct() {
    const formik = useFormik({
        initialValues: {
            productName: '',
            productImage: null,
            price: '',
            description: '',
            stock: '',
            category: '',
        },
        validationSchema: Yup.object({
            productName: Yup.string().required('Product Name is required'),
            productImage: Yup.mixed().required('Product Image is required'),
            price: Yup.number().required('Price is required').positive('Price must be a positive number'),
            description: Yup.string().required('Description is required'),
            stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(1, 'Stock must be at least 1'),
            category: Yup.string().required('Category is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append('productName', values.productName);
                formData.append('productImage', values.productImage);
                formData.append('price', values.price);
                formData.append('description', values.description);
                formData.append('stock', values.stock);
                formData.append('category', values.category);

                const response = await axios.post('http://localhost:3000/product/addProduct', formData, {
                   withCredentials:true
                });

                toast.success(response.data.message || 'Product added successfully!');
                resetForm();
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || 'Failed to add product. Please try again.');
            }
        },
    });

    return (
        <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow rounded-lg mb-10">
            <h1 className="text-2xl font-bold mb-5 text-center text-blue-700">Add Product</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="productName" className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        className="w-full px-3 py-2 border rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.productName}
                    />
                    {formik.touched.productName && formik.errors.productName && (
                        <div className="text-red-600 text-sm">{formik.errors.productName}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="productImage" className="block text-sm font-medium mb-1">Product Image</label>
                    <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        className="w-full"
                        onChange={(event) => formik.setFieldValue('productImage', event.currentTarget.files[0])}
                    />
                    {formik.touched.productImage && formik.errors.productImage && (
                        <div className="text-red-600 text-sm">{formik.errors.productImage}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium mb-1">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="w-full px-3 py-2 border rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price && (
                        <div className="text-red-600 text-sm">{formik.errors.price}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        className="w-full px-3 py-2 border rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    ></textarea>
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-600 text-sm">{formik.errors.description}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium mb-1">Stock</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        className="w-full px-3 py-2 border rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.stock}
                    />
                    {formik.touched.stock && formik.errors.stock && (
                        <div className="text-red-600 text-sm">{formik.errors.stock}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        className="w-full px-3 py-2 border rounded"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    />
                    {formik.touched.category && formik.errors.category && (
                        <div className="text-red-600 text-sm">{formik.errors.category}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Submitting...' : 'Add Product'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
