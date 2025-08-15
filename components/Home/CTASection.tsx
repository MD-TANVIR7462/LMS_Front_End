'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => (
  <section className="py-24 bg-black text-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl lg:text-5xl font-bold mb-8">
        Ready to Transform Your Future?
      </h2>
      <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
        Join over 50,000 students who are already advancing their careers with our platform.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg font-bold rounded-full">
          Start Your Journey
          <ArrowRight className="ml-3 h-6 w-6" />
        </Button>
        <Button size="lg" variant="outline" className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg font-bold rounded-full">
          Explore Courses
        </Button>
      </div>
    </div>
  </section>
);