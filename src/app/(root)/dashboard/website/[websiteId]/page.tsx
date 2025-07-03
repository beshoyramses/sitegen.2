"use client";

import React from 'react';
import { 
  Users, 
  Clock, 
  BarChart2, 
  ArrowUp, 
  ArrowDown,
  Settings,
  Activity,
  Eye,
  RefreshCw
} from 'lucide-react';
import { redirect } from 'next/navigation';

const AnalyticsDashboard = () => {
  
  const handleEditClick = () => {
    redirect("/editor")
  }

  const metrics = [
    { 
      title: "Total Visitors", 
      value: "24.8K", 
      icon: <Users className="h-5 w-5 text-blue-400" />,
      change: "+12.4%", 
      positive: true,
      description: "From last week" 
    },
    { 
      title: "Avg. Watch Time", 
      value: "4m 32s", 
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      change: "+0.8%", 
      positive: true,
      description: "From last week" 
    },
    { 
      title: "Bounce Rate", 
      value: "26.3%", 
      icon: <BarChart2 className="h-5 w-5 text-amber-400" />,
      change: "-3.1%", 
      positive: false,
      description: "From last week" 
    },
    { 
      title: "Conversion Rate", 
      value: "8.2%", 
      icon: <Activity className="h-5 w-5 text-emerald-400" />,
      change: "+1.7%", 
      positive: true,
      description: "From last week" 
    }
  ];

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mt-1 sm:mt-2">
              Monitor your audience engagement and content performance
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" onClick={handleEditClick}>
              <Settings className="h-4 w-4" />
              <span>Edit UI</span>
            </button>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-900 text-white text-sm rounded-md">
              Today
            </button>
            <button className="px-3 py-1 bg-gray-900 text-gray-400 hover:text-white text-sm rounded-md">
              Last 7 Days
            </button>
            <button className="px-3 py-1 bg-gray-900 text-gray-400 hover:text-white text-sm rounded-md">
              This Month
            </button>
            <button className="px-3 py-1 bg-gray-900 text-gray-400 hover:text-white text-sm rounded-md">
              This Year
            </button>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
            <Eye className="h-4 w-4" />
            <span>Last updated: Today, 2:45 PM</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                </div>
                <div className="p-2 bg-gray-800 rounded-lg">
                  {metric.icon}
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <span className={`inline-flex items-center text-sm font-medium mr-2 ${
                  metric.positive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.positive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {metric.change}
                </span>
                <span className="text-gray-500 text-sm">
                  {metric.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Visitors Chart */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Visitor Analytics</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View Report
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-gray-500 mb-4">Visitor data visualization will appear here</p>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg">
                  Load Visitor Data
                </button>
              </div>
            </div>
          </div>
          
          {/* Watch Time Chart */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-white">Watch Time Distribution</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                View Details
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-purple-400" />
                </div>
                <p className="text-gray-500 mb-4">Watch time distribution will appear here</p>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg">
                  Load Time Data
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="bg-gray-800 border-2 border-dashed rounded-xl w-10 h-10 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white font-medium">New visitor from United States</p>
                  <p className="text-gray-500 text-sm">Viewed pricing page for 4 minutes</p>
                </div>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </div>
            ))}
          </div>
          
          <button className="mt-6 w-full py-3 text-center text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;