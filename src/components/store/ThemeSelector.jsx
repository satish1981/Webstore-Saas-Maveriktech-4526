import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck } = FiIcons;

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('modern');

  const themes = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design',
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      features: ['Responsive', 'Dark Mode', 'Animations']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant layout',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop',
      features: ['Fast Loading', 'Mobile First', 'Clean']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and artistic design',
      preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=200&fit=crop',
      features: ['Creative Layout', 'Rich Colors', 'Visual Focus']
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Business-focused appearance',
      preview: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      features: ['Corporate', 'Trust Building', 'Formal']
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Theme</h2>
        <p className="text-gray-600">Select a theme that matches your brand and business style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.id}
            whileHover={{ scale: 1.02 }}
            className={`relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${
              selectedTheme === theme.id
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTheme(theme.id)}
          >
            {selectedTheme === theme.id && (
              <div className="absolute top-3 right-3 z-10 bg-primary-500 text-white rounded-full p-1">
                <SafeIcon icon={FiCheck} className="h-4 w-4" />
              </div>
            )}
            
            <div className="aspect-video">
              <img
                src={theme.preview}
                alt={theme.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {theme.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {theme.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {theme.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary-50 rounded-lg">
        <h4 className="font-medium text-primary-900 mb-2">Theme Customization</h4>
        <p className="text-sm text-primary-700">
          After selecting a theme, you can customize colors, fonts, and layout in the Branding section.
        </p>
      </div>
    </div>
  );
};

export default ThemeSelector;