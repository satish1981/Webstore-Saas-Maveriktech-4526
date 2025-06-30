import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import toast from 'react-hot-toast';

const { 
  FiSearch, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiRefreshCw,
  FiTrendingUp,
  FiEye,
  FiLink,
  FiImage,
  FiClock
} = FiIcons;

const SEOAnalyzer = () => {
  const [analyzingUrl, setAnalyzingUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const seoChecks = [
    {
      category: 'Technical SEO',
      checks: [
        { name: 'Page Title', status: 'pass', score: 10, message: 'Title is optimized (45 characters)' },
        { name: 'Meta Description', status: 'pass', score: 10, message: 'Description is well-written (152 characters)' },
        { name: 'H1 Tag', status: 'pass', score: 8, message: 'Single H1 tag found' },
        { name: 'URL Structure', status: 'warning', score: 6, message: 'URL could be shorter' },
        { name: 'SSL Certificate', status: 'pass', score: 10, message: 'HTTPS enabled' },
        { name: 'Page Speed', status: 'fail', score: 3, message: 'Page loads in 4.2s (should be under 3s)' }
      ]
    },
    {
      category: 'Content Quality',
      checks: [
        { name: 'Content Length', status: 'pass', score: 9, message: '1,247 words (ideal length)' },
        { name: 'Keyword Density', status: 'warning', score: 7, message: 'Focus keyword appears 12 times (2.1%)' },
        { name: 'Internal Links', status: 'pass', score: 8, message: '5 internal links found' },
        { name: 'External Links', status: 'warning', score: 6, message: 'Only 1 external link (add more authority links)' },
        { name: 'Images Alt Text', status: 'fail', score: 4, message: '3 of 7 images missing alt text' },
        { name: 'Readability', status: 'pass', score: 9, message: 'Flesch score: 72 (easy to read)' }
      ]
    },
    {
      category: 'Schema & Structure',
      checks: [
        { name: 'Schema Markup', status: 'pass', score: 10, message: 'Article schema detected' },
        { name: 'Breadcrumbs', status: 'pass', score: 8, message: 'Breadcrumb markup found' },
        { name: 'Heading Structure', status: 'warning', score: 7, message: 'H2 follows H4 (improve hierarchy)' },
        { name: 'Social Meta Tags', status: 'pass', score: 9, message: 'Open Graph and Twitter cards found' }
      ]
    }
  ];

  const analyzePage = async () => {
    if (!analyzingUrl) {
      toast.error('Please enter a URL to analyze');
      return;
    }

    setLoading(true);
    
    try {
      // Mock analysis - replace with actual SEO analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResults = {
        url: analyzingUrl,
        score: 78,
        issues: 2,
        warnings: 4,
        passed: 12,
        recommendations: [
          {
            type: 'critical',
            title: 'Improve Page Speed',
            description: 'Page loads in 4.2 seconds. Optimize images and enable compression.',
            impact: 'High'
          },
          {
            type: 'warning',
            title: 'Add Alt Text to Images',
            description: '3 images are missing alt text. This affects accessibility and SEO.',
            impact: 'Medium'
          },
          {
            type: 'suggestion',
            title: 'Improve URL Structure',
            description: 'Consider shortening the URL for better user experience.',
            impact: 'Low'
          }
        ]
      };
      
      setAnalysisResults(mockResults);
      toast.success('SEO analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze page');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return FiCheckCircle;
      case 'warning':
        return FiAlertCircle;
      case 'fail':
        return FiAlertCircle;
      default:
        return FiCheckCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'text-success-600 bg-success-50';
      case 'warning':
        return 'text-warning-600 bg-warning-50';
      case 'fail':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-warning-200 bg-warning-50';
      case 'suggestion':
        return 'border-primary-200 bg-primary-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* URL Analyzer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Page Analyzer</h3>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="url"
              value={analyzingUrl}
              onChange={(e) => setAnalyzingUrl(e.target.value)}
              placeholder="Enter URL to analyze (e.g., https://yourblog.com/post-title)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <button
            onClick={analyzePage}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <SafeIcon icon={loading ? FiRefreshCw : FiSearch} className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {loading && (
          <div className="mt-4 p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center">
              <SafeIcon icon={FiRefreshCw} className="h-5 w-5 text-primary-600 mr-3 animate-spin" />
              <div>
                <p className="text-sm font-medium text-primary-900">Analyzing page...</p>
                <p className="text-sm text-primary-700">This may take a few moments</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Score Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
              <span className="text-sm text-gray-500">{analysisResults.url}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - analysisResults.score / 100)}`}
                      className={`${
                        analysisResults.score >= 80 ? 'text-success-500' : 
                        analysisResults.score >= 60 ? 'text-warning-500' : 'text-red-500'
                      } transition-all duration-1000`}
                    />
                  </svg>
                  <span className={`absolute text-xl font-bold ${
                    analysisResults.score >= 80 ? 'text-success-600' : 
                    analysisResults.score >= 60 ? 'text-warning-600' : 'text-red-600'
                  }`}>
                    {analysisResults.score}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">SEO Score</p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{analysisResults.issues}</div>
                <p className="text-sm text-gray-600">Critical Issues</p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-warning-600">{analysisResults.warnings}</div>
                <p className="text-sm text-gray-600">Warnings</p>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-success-600">{analysisResults.passed}</div>
                <p className="text-sm text-gray-600">Passed</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {analysisResults.recommendations.map((rec, index) => (
                <div key={index} className={`p-4 border rounded-lg ${getRecommendationColor(rec.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      rec.impact === 'High' ? 'bg-red-100 text-red-800' :
                      rec.impact === 'Medium' ? 'bg-warning-100 text-warning-800' :
                      'bg-primary-100 text-primary-800'
                    }`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* SEO Checks Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {seoChecks.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
            
            <div className="space-y-3">
              {category.checks.map((check, checkIndex) => (
                <div key={checkIndex} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <SafeIcon 
                      icon={getStatusIcon(check.status)} 
                      className={`h-5 w-5 ${
                        check.status === 'pass' ? 'text-success-600' :
                        check.status === 'warning' ? 'text-warning-600' : 'text-red-600'
                      }`} 
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{check.name}</p>
                      <p className="text-xs text-gray-600">{check.message}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{check.score}/10</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category Score:</span>
                <span className="font-medium">
                  {Math.round(category.checks.reduce((acc, check) => acc + check.score, 0) / category.checks.length)}/10
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SEO Tips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Technical SEO</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Optimize page loading speed (under 3 seconds)
              </li>
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Use HTTPS for secure connections
              </li>
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Implement proper URL structure and redirects
              </li>
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Create and submit XML sitemaps
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Content Optimization</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Write compelling titles and meta descriptions
              </li>
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Use proper heading hierarchy (H1, H2, H3)
              </li>
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Include internal and external links
              </li>
              <li className="flex items-start">
                <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-success-500 mr-2 mt-0.5" />
                Add alt text to all images
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOAnalyzer;