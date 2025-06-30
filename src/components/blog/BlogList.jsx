import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiEdit3, 
  FiTrash2, 
  FiEye, 
  FiClock, 
  FiCalendar, 
  FiUser,
  FiMoreVertical,
  FiCopy,
  FiShare2,
  FiBarChart3
} = FiIcons;

const BlogList = ({ searchTerm, statusFilter, onEditPost }) => {
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Mock blog posts data
  const posts = [
    {
      id: '1',
      title: 'The Complete Guide to E-commerce SEO in 2024',
      slug: 'complete-guide-ecommerce-seo-2024',
      excerpt: 'Learn how to optimize your online store for search engines with the latest SEO strategies and techniques.',
      content: '<p>Full blog content here...</p>',
      status: 'published',
      author: 'John Smith',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      publishedAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
      views: 2450,
      readTime: '8 min',
      featured: true,
      tags: ['SEO', 'E-commerce', 'Marketing'],
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      seo: {
        title: 'The Complete Guide to E-commerce SEO in 2024 | Your Store',
        description: 'Learn how to optimize your online store for search engines with the latest SEO strategies and techniques.',
        keywords: 'ecommerce seo, online store optimization, search engine marketing',
        score: 95
      }
    },
    {
      id: '2',
      title: 'Building Customer Trust Through Social Proof',
      slug: 'building-customer-trust-social-proof',
      excerpt: 'Discover how to leverage social proof to increase conversions and build lasting customer relationships.',
      content: '<p>Full blog content here...</p>',
      status: 'published',
      author: 'Sarah Johnson',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      publishedAt: '2024-01-12T09:15:00Z',
      updatedAt: '2024-01-12T11:45:00Z',
      views: 1890,
      readTime: '6 min',
      featured: false,
      tags: ['Marketing', 'Conversion', 'Trust'],
      featuredImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
      seo: {
        title: 'Building Customer Trust Through Social Proof',
        description: 'Discover how to leverage social proof to increase conversions and build lasting customer relationships.',
        keywords: 'social proof, customer trust, conversion optimization',
        score: 87
      }
    },
    {
      id: '3',
      title: 'Advanced Email Marketing Automation Strategies',
      slug: 'advanced-email-marketing-automation',
      excerpt: 'Take your email marketing to the next level with advanced automation workflows and personalization techniques.',
      content: '<p>Full blog content here...</p>',
      status: 'draft',
      author: 'Mike Davis',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      publishedAt: null,
      updatedAt: '2024-01-10T16:20:00Z',
      views: 0,
      readTime: '12 min',
      featured: false,
      tags: ['Email Marketing', 'Automation', 'Personalization'],
      featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      seo: {
        title: 'Advanced Email Marketing Automation Strategies',
        description: 'Take your email marketing to the next level with advanced automation workflows and personalization techniques.',
        keywords: 'email marketing, automation, personalization',
        score: 72
      }
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'text-success-600 bg-success-50';
      case 'draft':
        return 'text-gray-600 bg-gray-50';
      case 'scheduled':
        return 'text-warning-600 bg-warning-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getSEOScoreColor = (score) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-danger-600';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="px-6 py-3 bg-primary-50 border-b border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">
              {selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-3">
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Publish
              </button>
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Move to Draft
              </button>
              <button className="text-sm font-medium text-red-600 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="divide-y divide-gray-200">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedPosts.includes(post.id)}
                onChange={() => handleSelectPost(post.id)}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />

              {/* Featured Image */}
              <div className="flex-shrink-0">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-4 h-4 rounded-full mr-1"
                        />
                        {post.author}
                      </div>
                      
                      <div className="flex items-center">
                        <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>

                      <div className="flex items-center">
                        <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>

                      <div className="flex items-center">
                        <SafeIcon icon={FiEye} className="h-4 w-4 mr-1" />
                        {post.views.toLocaleString()} views
                      </div>

                      <div className="flex items-center">
                        <SafeIcon icon={FiBarChart3} className="h-4 w-4 mr-1" />
                        <span className={getSEOScoreColor(post.seo.score)}>
                          SEO: {post.seo.score}%
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => onEditPost(post)}
                      className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50"
                      title="Edit post"
                    >
                      <SafeIcon icon={FiEdit3} className="h-4 w-4" />
                    </button>

                    <button
                      className="p-2 text-gray-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-50"
                      title="View post"
                    >
                      <SafeIcon icon={FiEye} className="h-4 w-4" />
                    </button>

                    <button
                      className="p-2 text-gray-400 hover:text-warning-600 rounded-lg hover:bg-warning-50"
                      title="Copy link"
                    >
                      <SafeIcon icon={FiCopy} className="h-4 w-4" />
                    </button>

                    <button
                      className="p-2 text-gray-400 hover:text-success-600 rounded-lg hover:bg-success-50"
                      title="Share post"
                    >
                      <SafeIcon icon={FiShare2} className="h-4 w-4" />
                    </button>

                    <div className="relative">
                      <button
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
                        title="More actions"
                      >
                        <SafeIcon icon={FiMoreVertical} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiEdit3} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first blog post'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;