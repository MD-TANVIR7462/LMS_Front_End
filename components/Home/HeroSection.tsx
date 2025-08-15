'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight, Play, Star } from 'lucide-react';
import Link from 'next/link';

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                         radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
        backgroundSize: '100px 100px'
      }}></div>
    </div>
    
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
          <BookOpen className="h-7 w-7 text-black" />
        </div>
        <span className="text-3xl font-bold">LMS</span>
      </div>

      <Badge className="mb-8 bg-white/10 text-white border-white/20 hover:bg-white/20 text-sm px-4 py-2">
        ✨ Transform Your Future Today
      </Badge>

      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
        Learn Without
        <br />
        <span className="relative">
          Limits
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white"></div>
        </span>
      </h1>

      <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
        Unlock your potential with our comprehensive learning management system. 
        Master new skills, advance your career, and join a community of lifelong learners.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
     <Link href={"/courses"}>   <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-lg font-semibold rounded-full">
          Start Learning
          <ArrowRight className="ml-3 h-5 w-5" />
        </Button></Link>
        <Button size="lg" variant="outline" className="border-white  text-black px-10 py-6 text-lg font-semibold rounded-full group">
          <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          Watch Demo
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
        {[
          { value: "50K+", label: "Students" },
          { value: "200+", label: "Courses" },
          { value: "95%", label: "Success Rate" },
          { value: "24/7", label: "Support" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);