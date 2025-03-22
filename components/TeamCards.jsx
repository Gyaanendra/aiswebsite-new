import React from 'react';
import { Brain, Users, Camera, MessageSquare, Share2, Palette, Calendar, Radio } from 'lucide-react';

function Card({ title, icon: Icon, color, delay }) {
  return (
    <div 
      className={`p-4 rounded-lg shadow-lg ${color} text-white transform transition-all duration-500 hover:scale-105`}
      style={{ 
        animation: `fadeInUp 0.6s ease-out forwards`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{title}</span>
      </div>
    </div>
  );
}

function TeamCards() {
  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-8">
      {/* Define keyframes for fadeInUp */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Logo and Title */}
        <div 
          className="text-center space-y-2 mb-12"
          style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.1s', opacity: 0 }}
        >
          <div className="flex justify-center items-center space-x-2">
            <img src="/bais.png" alt="AIS Logo" className="w-12 h-12" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Artificial Intelligence Society
            </h1>
          </div>
        </div>

        {/* Executives */}
        <div 
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.3s', opacity: 0 }}
        >
          <h2 className="text-xl font-bold text-center mb-4">Executives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card title="President" icon={Users} color="bg-gray-500" delay={0.4} />
            <Card title="Vice-President" icon={Users} color="bg-gray-500" delay={0.5} />
            <Card title="General Secretary" icon={Users} color="bg-gray-500" delay={0.6} />
          </div>
        </div>

        {/* Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Departments */}
          <div 
            className="bg-white p-6 rounded-xl shadow-lg"
            style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '0.7s', opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">Technical Departments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card title="Natural Language Processing" icon={MessageSquare} color="bg-green-500" delay={0.8} />
              <Card title="Reinforcement Learning" icon={Brain} color="bg-red-500" delay={0.9} />
              <Card title="Computer Vision" icon={Camera} color="bg-blue-500" delay={1.0} />
              <Card title="Generative AI" icon={Brain} color="bg-yellow-500" delay={1.1} />
            </div>
          </div>

          {/* Non-Technical Departments */}
          <div 
            className="bg-white p-6 rounded-xl shadow-lg"
            style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '1.3s', opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">Non-Technical Departments</h2>
            <div className="space-y-3">
              <Card title="Social Media Managers" icon={Share2} color="bg-purple-500" delay={1.4} />
              <Card title="Designers" icon={Palette} color="bg-purple-500" delay={1.5} />
              <Card title="Event Managers" icon={Calendar} color="bg-purple-500" delay={1.6} />
              <Card title="Video Editors // Photographers" icon={Camera} color="bg-purple-500" delay={1.7} />
              <Card title="Public Speakers // Sponsorship Outreach" icon={Radio} color="bg-purple-500" delay={1.8} />
            </div>
          </div>
        </div>

        {/* Mentors */}
        <div 
          className="bg-gray-600 p-6 rounded-xl shadow-lg"
          style={{ animation: 'fadeInUp 0.6s ease-out forwards', animationDelay: '2.0s', opacity: 0 }}
        >
          <h2 className="text-xl font-bold text-center text-white">
            Mentors (3rd/ 4th Year Students)
          </h2>
        </div>
      </div>
    </div>
  );
}

export default TeamCards;
