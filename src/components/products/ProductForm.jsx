import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiUpload, FiImage, FiPackage, FiDownload, FiDollarSign, FiTag } = FiIcons;

const ProductForm = ({ product, onClose }) => {
  const [productImages, setProductImages] = useState(product?.images || []);
  const [productFiles, setProductFiles] = useState(product?.files || []);
  const [productType, setProductType] = useState(product?.type || 'digital');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      comparePrice: product?.comparePrice || '',
      sku: product?.sku || '',
      stock: product?.stock || '',
      status: product?.status || 'draft',
      category: product?.category || '',
      tags: product?.tags?.join(', ') || '',
      seoTitle: product?.seoTitle || '',
      seoDescription: product?.seoDescription || '',
    }
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file: file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      setProductFiles(prev => [...prev, {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        file: file
      }]);
    });
  };

  const removeImage = (imageId) => {
    setProductImages(prev => prev.filter(img => img.id !== imageId));
  };

  const removeFile = (fileId) => {
    setProductFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const productData = {
        ...data,
        type: productType,
        images: productImages,
        files: productFiles,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      console.log('Product data:', productData);
      
      toast.success(product ? 'Product updated successfully' : 'Product created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <SafeIcon icon={FiX} className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setProductType('digital')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      productType === 'digital'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <SafeIcon icon={FiDownload} className="h-6 w-6 mb-2 text-primary-600" />
                    <div className="font-medium">Digital Product</div>
                    <div className="text-sm text-gray-600">Files, courses, software</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductType('physical')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      productType === 'physical'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <SafeIcon icon={FiPackage} className="h-6 w-6 mb-2 text-primary-600" />
                    <div className="font-medium">Physical Product</div>
                    <div className="text-sm text-gray-600">Shipped items, merchandise</div>
                  </button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    {...register('name', { required: 'Product name is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    {...register('sku')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Product SKU"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your product..."
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <SafeIcon icon={FiDollarSign} className="h-4 w-4 inline mr-1" />
                    Price *
                  </label>
                  <input
                    {...register('price', { required: 'Price is required' })}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compare Price
                  </label>
                  <input
                    {...register('comparePrice')}
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                  />
                </div>

                {productType === 'physical' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      {...register('stock')}
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>
                )}
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <SafeIcon icon={FiImage} className="h-4 w-4 inline mr-2" />
                  Product Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {productImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt="Product"
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <SafeIcon icon={FiX} className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 transition-colors">
                    <SafeIcon icon={FiUpload} className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Digital Files */}
              {productType === 'digital' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <SafeIcon icon={FiDownload} className="h-4 w-4 inline mr-2" />
                    Digital Files
                  </label>
                  <div className="space-y-2 mb-4">
                    {productFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <SafeIcon icon={FiDownload} className="h-4 w-4 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <SafeIcon icon={FiX} className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="block">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <SafeIcon icon={FiUpload} className="h-4 w-4 mr-2" />
                      Upload Files
                    </span>
                  </label>
                </div>
              )}

              {/* Organization */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select category</option>
                    <option value="courses">Courses</option>
                    <option value="templates">Templates</option>
                    <option value="software">Software</option>
                    <option value="ebooks">eBooks</option>
                    <option value="merchandise">Merchandise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <SafeIcon icon={FiTag} className="h-4 w-4 inline mr-2" />
                  Tags
                </label>
                <input
                  {...register('tags')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              {/* SEO */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO Title
                    </label>
                    <input
                      {...register('seoTitle')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="SEO-friendly title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SEO Description
                    </label>
                    <textarea
                      {...register('seoDescription')}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="SEO meta description"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ProductForm;