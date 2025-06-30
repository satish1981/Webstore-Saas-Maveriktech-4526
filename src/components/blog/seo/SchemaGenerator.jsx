import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiCode, FiCopy, FiDownload, FiCheck, FiPlus, FiTrash2, FiRefreshCw } = FiIcons;

const SchemaGenerator = () => {
  const [selectedSchema, setSelectedSchema] = useState('article');
  const [generatedSchemas, setGeneratedSchemas] = useState([]);
  const [loading, setLoading] = useState(false);

  const schemaTypes = [
    {
      id: 'article',
      name: 'Article',
      description: 'For blog posts and articles',
      fields: ['headline', 'author', 'datePublished', 'dateModified', 'description', 'image', 'publisher']
    },
    {
      id: 'breadcrumb',
      name: 'BreadcrumbList',
      description: 'Navigation breadcrumbs',
      fields: ['itemListElement']
    },
    {
      id: 'organization',
      name: 'Organization',
      description: 'Company information',
      fields: ['name', 'url', 'logo', 'contactPoint', 'sameAs']
    },
    {
      id: 'website',
      name: 'WebSite',
      description: 'Website information',
      fields: ['name', 'url', 'potentialAction']
    },
    {
      id: 'faq',
      name: 'FAQPage',
      description: 'FAQ pages',
      fields: ['mainEntity']
    },
    {
      id: 'review',
      name: 'Review',
      description: 'Product or service reviews',
      fields: ['itemReviewed', 'author', 'reviewRating', 'reviewBody']
    }
  ];

  const [formData, setFormData] = useState({
    article: {
      headline: 'Your Article Title',
      author: 'Author Name',
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      description: 'Article description',
      image: 'https://example.com/image.jpg',
      publisher: 'Your Blog Name'
    },
    breadcrumb: {
      items: [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: 'Current Post', url: '/blog/current-post' }
      ]
    },
    organization: {
      name: 'Your Company',
      url: 'https://yourcompany.com',
      logo: 'https://yourcompany.com/logo.jpg',
      contactPoint: {
        telephone: '+1-800-123-4567',
        contactType: 'Customer Service'
      },
      sameAs: ['https://facebook.com/yourcompany', 'https://twitter.com/yourcompany']
    },
    website: {
      name: 'Your Website',
      url: 'https://yourwebsite.com',
      potentialAction: {
        target: 'https://yourwebsite.com/search?q={search_term_string}',
        queryInput: 'required name=search_term_string'
      }
    },
    faq: {
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for all items.'
        }
      ]
    },
    review: {
      itemReviewed: 'Product Name',
      author: 'Reviewer Name',
      reviewRating: 5,
      reviewBody: 'This is an excellent product!'
    }
  });

  const generateSchema = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let schema = {};
      
      switch (selectedSchema) {
        case 'article':
          schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": formData.article.headline,
            "author": {
              "@type": "Person",
              "name": formData.article.author
            },
            "datePublished": formData.article.datePublished,
            "dateModified": formData.article.dateModified,
            "description": formData.article.description,
            "image": formData.article.image,
            "publisher": {
              "@type": "Organization",
              "name": formData.article.publisher
            }
          };
          break;
          
        case 'breadcrumb':
          schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": formData.breadcrumb.items.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          };
          break;
          
        case 'organization':
          schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": formData.organization.name,
            "url": formData.organization.url,
            "logo": formData.organization.logo,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": formData.organization.contactPoint.telephone,
              "contactType": formData.organization.contactPoint.contactType
            },
            "sameAs": formData.organization.sameAs
          };
          break;
          
        case 'website':
          schema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": formData.website.name,
            "url": formData.website.url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": formData.website.potentialAction.target,
              "query-input": formData.website.potentialAction.queryInput
            }
          };
          break;
          
        case 'faq':
          schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": formData.faq.questions.map(q => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
          };
          break;
          
        case 'review':
          schema = {
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Thing",
              "name": formData.review.itemReviewed
            },
            "author": {
              "@type": "Person",
              "name": formData.review.author
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": formData.review.reviewRating,
              "bestRating": "5"
            },
            "reviewBody": formData.review.reviewBody
          };
          break;
      }
      
      const newSchema = {
        id: Date.now(),
        type: selectedSchema,
        name: schemaTypes.find(t => t.id === selectedSchema)?.name,
        schema: schema,
        createdAt: new Date().toISOString()
      };
      
      setGeneratedSchemas(prev => [newSchema, ...prev]);
      toast.success('Schema generated successfully!');
    } catch (error) {
      toast.error('Failed to generate schema');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (schema) => {
    navigator.clipboard.writeText(JSON.stringify(schema.schema, null, 2));
    toast.success('Schema copied to clipboard!');
  };

  const downloadSchema = (schema) => {
    const blob = new Blob([JSON.stringify(schema.schema, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${schema.type}-schema.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteSchema = (id) => {
    setGeneratedSchemas(prev => prev.filter(s => s.id !== id));
    toast.success('Schema deleted');
  };

  const updateFormData = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const renderSchemaForm = () => {
    const currentType = schemaTypes.find(t => t.id === selectedSchema);
    
    switch (selectedSchema) {
      case 'article':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
              <input
                type="text"
                value={formData.article.headline}
                onChange={(e) => updateFormData('article', 'headline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                value={formData.article.author}
                onChange={(e) => updateFormData('article', 'author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.article.description}
                onChange={(e) => updateFormData('article', 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
              <input
                type="url"
                value={formData.article.image}
                onChange={(e) => updateFormData('article', 'image', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
              <input
                type="text"
                value={formData.article.publisher}
                onChange={(e) => updateFormData('article', 'publisher', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );
        
      case 'faq':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">FAQ Questions</label>
              <button
                type="button"
                onClick={() => {
                  const newQuestions = [...formData.faq.questions, { question: '', answer: '' }];
                  updateFormData('faq', 'questions', newQuestions);
                }}
                className="flex items-center px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded"
              >
                <SafeIcon icon={FiPlus} className="h-4 w-4 mr-1" />
                Add Question
              </button>
            </div>
            {formData.faq.questions.map((q, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Question {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newQuestions = formData.faq.questions.filter((_, i) => i !== index);
                      updateFormData('faq', 'questions', newQuestions);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) => {
                    const newQuestions = [...formData.faq.questions];
                    newQuestions[index].question = e.target.value;
                    updateFormData('faq', 'questions', newQuestions);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 mb-2"
                />
                <textarea
                  placeholder="Answer"
                  value={q.answer}
                  onChange={(e) => {
                    const newQuestions = [...formData.faq.questions];
                    newQuestions[index].answer = e.target.value;
                    updateFormData('faq', 'questions', newQuestions);
                  }}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            ))}
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <SafeIcon icon={FiCode} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Select a schema type to configure its properties</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schema Generator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Schema Markup</h3>
          
          {/* Schema Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Schema Type</label>
            <select
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {schemaTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} - {type.description}
                </option>
              ))}
            </select>
          </div>

          {/* Schema Form */}
          {renderSchemaForm()}

          {/* Generate Button */}
          <button
            onClick={generateSchema}
            disabled={loading}
            className="w-full mt-6 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? (
              <SafeIcon icon={FiRefreshCw} className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <SafeIcon icon={FiCode} className="h-4 w-4 mr-2" />
            )}
            {loading ? 'Generating...' : 'Generate Schema'}
          </button>
        </div>

        {/* Generated Schemas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Schemas</h3>
          
          {generatedSchemas.length === 0 ? (
            <div className="text-center py-8">
              <SafeIcon icon={FiCode} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No schemas generated yet</p>
              <p className="text-sm text-gray-500">Generate your first schema to get started</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {generatedSchemas.map((schema) => (
                <div key={schema.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{schema.name}</h4>
                      <p className="text-sm text-gray-500">
                        Created {new Date(schema.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(schema)}
                        className="p-2 text-gray-400 hover:text-primary-600 rounded"
                        title="Copy to clipboard"
                      >
                        <SafeIcon icon={FiCopy} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => downloadSchema(schema)}
                        className="p-2 text-gray-400 hover:text-success-600 rounded"
                        title="Download"
                      >
                        <SafeIcon icon={FiDownload} className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSchema(schema.id)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded"
                        title="Delete"
                      >
                        <SafeIcon icon={FiTrash2} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto">
                    <code>{JSON.stringify(schema.schema, null, 2)}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Auto-Generation Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-Generation Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Article Schema</h4>
                <p className="text-sm text-gray-600">Automatically generate Article schema for blog posts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Breadcrumb Schema</h4>
                <p className="text-sm text-gray-600">Auto-generate breadcrumb markup</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Organization Schema</h4>
                <p className="text-sm text-gray-600">Include organization information globally</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Website Schema</h4>
                <p className="text-sm text-gray-600">Add website search functionality</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemaGenerator;