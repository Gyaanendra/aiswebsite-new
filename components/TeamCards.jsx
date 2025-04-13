import React from 'react';
import { Brain, Users, Camera, MessageSquare, Share2, Palette, Calendar, Radio } from 'lucide-react';

function Card({ title, icon: Icon, delay }) {
  return (
    <div 
      className={`p-4 rounded-lg backdrop-blur-md bg-white/5 text-white transform transition-all duration-500 hover:scale-105 hover:bg-white/10`}
      style={{ 
        animation: `fadeInUp 0.6s ease-out forwards`,
        animationDelay: `${delay}s`,
        opacity: 0,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
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
          className="backdrop-blur-md bg-white/5 p-6 rounded-xl"
          style={{ 
            animation: 'fadeInUp 0.6s ease-out forwards', 
            animationDelay: '0.3s', 
            opacity: 0,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <h2 className="text-xl font-bold text-center mb-4 text-white">Executives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card title="President" icon={Users} delay={0.4} />
            <Card title="Vice-President" icon={Users} delay={0.5} />
            <Card title="General Secretary" icon={Users} delay={0.6} />
          </div>
        </div>

        {/* Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technical Departments */}
          <div 
            className="backdrop-blur-md bg-white/5 p-6 rounded-xl"
            style={{ 
              animation: 'fadeInUp 0.6s ease-out forwards', 
              animationDelay: '0.7s', 
              opacity: 0,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-white">Technical Departments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card title="Natural Language Processing" icon={MessageSquare} delay={0.8} />
              <Card title="Reinforcement Learning" icon={Brain} delay={0.9} />
              <Card title="Computer Vision" icon={Camera} delay={1.0} />
              <Card title="Generative AI" icon={Brain} delay={1.1} />
            </div>
          </div>
          
          {/* Non-Technical Departments */}
          <div 
            className="backdrop-blur-md bg-white/5 p-6 rounded-xl"
            style={{ 
              animation: 'fadeInUp 0.6s ease-out forwards', 
              animationDelay: '1.3s', 
              opacity: 0,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 className="text-xl font-bold mb-4 text-white">Non-Technical Departments</h2>
            <div className="space-y-3">
              <Card title="Social Media Managers" icon={Share2} delay={1.4} />
              <Card title="Designers" icon={Palette} delay={1.5} />
              <Card title="Event Managers" icon={Calendar} delay={1.6} />
              <Card title="Video Editors // Photographers" icon={Camera} delay={1.7} />
              <Card title="Public Speakers // Sponsorship Outreach" icon={Radio} delay={1.8} />
            </div>
          </div>
        </div>

        {/* Mentors */}
        <div 
          className="backdrop-blur-md bg-white/5 p-6 rounded-xl"
          style={{ 
            animation: 'fadeInUp 0.6s ease-out forwards', 
            animationDelay: '2.0s', 
            opacity: 0,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
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
