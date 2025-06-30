import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiX, 
  FiSave, 
  FiEye, 
  FiUpload, 
  FiImage, 
  FiLink, 
  FiCode,
  FiBold,
  FiItalic,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiSettings,
  FiCalendar,
  FiTag,
  FiSearch
} = FiIcons;

const BlogEditor = ({ post, onClose }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [content, setContent] = useState(post?.content || '');
  const [showPreview, setShowPreview] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || '');
  const [loading, setLoading] = useState(false);
  const [seoScore, setSeoScore] = useState(post?.seo?.score || 0);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      excerpt: post?.excerpt || '',
      status: post?.status || 'draft',
      tags: post?.tags?.join(', ') || '',
      publishedAt: post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : '',
      featured: post?.featured || false,
      seoTitle: post?.seo?.title || '',
      seoDescription: post?.seo?.description || '',
      seoKeywords: post?.seo?.keywords || '',
      allowComments: post?.allowComments !== false,
      categories: post?.categories?.join(', ') || ''
    }
  });

  const watchedTitle = watch('title');
  const watchedSeoTitle = watch('seoTitle');
  const watchedSeoDescription = watch('seoDescription');

  // Auto-generate slug from title
  React.useEffect(() => {
    if (watchedTitle && !post) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchedTitle, setValue, post]);

  // Auto-generate SEO title if empty
  React.useEffect(() => {
    if (watchedTitle && !watchedSeoTitle) {
      setValue('seoTitle', `${watchedTitle} | Your Blog`);
    }
  }, [watchedTitle, watchedSeoTitle, setValue]);

  // Calculate SEO score
  React.useEffect(() => {
    let score = 0;
    
    if (watchedTitle && watchedTitle.length >= 10 && watchedTitle.length <= 60) score += 20;
    if (watchedSeoDescription && watchedSeoDescription.length >= 120 && watchedSeoDescription.length <= 160) score += 25;
    if (content && content.length >= 300) score += 20;
    if (featuredImage) score += 15;
    if (watch('tags')) score += 10;
    if (watch('seoKeywords')) score += 10;
    
    setSeoScore(score);
  }, [watchedTitle, watchedSeoDescription, content, featuredImage, watch]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFeaturedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const postData = {
        ...data,
        content,
        featuredImage,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        categories: data.categories.split(',').map(cat => cat.trim()).filter(Boolean),
        seo: {
          title: data.seoTitle,
          description: data.seoDescription,
          keywords: data.seoKeywords,
          score: seoScore
        }
      };
      
      console.log('Post data:', postData);
      toast.success(post ? 'Post updated successfully' : 'Post created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: FiEdit3 },
    { id: 'seo', label: 'SEO', icon: FiSearch },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your post title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">yourblog.com/</span>
                <input
                  {...register('slug')}
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="post-url-slug"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              <div className="flex items-center space-x-4">
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiImage} className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <SafeIcon icon={FiUpload} className="h-4 w-4 mr-2" />
                    Upload Image
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 1200x630px
                  </p>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              
              {/* Toolbar */}
              <div className="border border-gray-300 rounded-t-lg bg-gray-50 px-3 py-2">
                <div className="flex items-center space-x-2">
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiBold} className="h-4 w-4" />
                  </button>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiItalic} className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiList} className="h-4 w-4" />
                  </button>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiAlignLeft} className="h-4 w-4" />
                  </button>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiAlignCenter} className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiLink} className="h-4 w-4" />
                  </button>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiImage} className="h-4 w-4" />
                  </button>
                  <button type="button" className="p-2 text-gray-600 hover:text-gray-900 rounded">
                    <SafeIcon icon={FiCode} className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                placeholder="Write your post content here..."
              />
              
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{content.length} characters</span>
                <span>~{Math.ceil(content.split(' ').length / 200)} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                {...register('excerpt')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Brief description of your post..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used for post previews and social media shares
              </p>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            {/* SEO Score */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">SEO Score</h4>
                <span className={`text-2xl font-bold ${
                  seoScore >= 80 ? 'text-success-600' : 
                  seoScore >= 60 ? 'text-warning-600' : 'text-danger-600'
                }`}>
                  {seoScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    seoScore >= 80 ? 'bg-success-500' : 
                    seoScore >= 60 ? 'bg-warning-500' : 'bg-danger-500'
                  }`}
                  style={{ width: `${seoScore}%` }}
                />
              </div>
            </div>

            {/* SEO Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SEO Title
              </label>
              <input
                {...register('seoTitle')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="SEO optimized title..."
                maxLength={60}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>This appears in search results</span>
                <span className={watchedSeoTitle?.length > 60 ? 'text-red-500' : ''}>
                  {watchedSeoTitle?.length || 0}/60
                </span>
              </div>
            </div>

            {/* SEO Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                {...register('seoDescription')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Brief description for search engines..."
                maxLength={160}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>This appears in search result snippets</span>
                <span className={watchedSeoDescription?.length > 160 ? 'text-red-500' : ''}>
                  {watchedSeoDescription?.length || 0}/160
                </span>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Keywords
              </label>
              <input
                {...register('seoKeywords')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate keywords with commas. Focus on 3-5 relevant terms.
              </p>
            </div>

            {/* SEO Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Result Preview
              </label>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                  {watchedSeoTitle || watchedTitle || 'Your post title'}
                </div>
                <div className="text-green-700 text-sm">
                  yourblog.com/{watch('slug') || 'post-url'}
                </div>
                <div className="text-gray-700 text-sm mt-1">
                  {watchedSeoDescription || 'Your meta description will appear here...'}
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                {...register('publishedAt')}
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                {...register('tags')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="tag1, tag2, tag3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <input
                {...register('categories')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="category1, category2"
              />
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  {...register('featured')}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Featured post
                </label>
              </div>

              <div className="flex items-center">
                <input
                  {...register('allowComments')}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Allow comments
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
            className="relative bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-screen overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {post ? 'Edit Post' : 'Create New Post'}
                </h2>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <SafeIcon icon={FiEye} className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <SafeIcon icon={FiX} className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <nav className="flex space-x-8 mt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              {renderTabContent()}

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  type="button"
                  onClick={handleSubmit((data) => {
                    setValue('status', 'draft');
                    onSubmit({ ...data, status: 'draft' });
                  })}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Save Draft
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  <SafeIcon icon={FiSave} className="h-4 w-4 mr-2" />
                  {loading ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default BlogEditor;