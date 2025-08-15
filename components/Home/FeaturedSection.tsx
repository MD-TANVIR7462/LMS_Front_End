'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Users, Shield, Award, Zap, Globe, Target } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-10 w-10 text-black" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience."
  },
  {
    icon: <Shield className="h-10 w-10 text-black" />,
    title: "Lifetime Access",
    description: "Get unlimited access to course materials and updates forever."
  },
  {
    icon: <Award className="h-10 w-10 text-black" />,
    title: "Verified Certificates",
    description: "Earn certificates recognized by top companies worldwide."
  },
  {
    icon: <Zap className="h-10 w-10 text-black" />,
    title: "Interactive Learning",
    description: "Engage with hands-on projects and coding challenges."
  },
  {
    icon: <Globe className="h-10 w-10 text-black" />,
    title: "Global Community",
    description: "Connect with students and professionals worldwide."
  },
  {
    icon: <Target className="h-10 w-10 text-black" />,
    title: "Personalized Path",
    description: "Customized learning paths based on your goals."
  }
];

export const FeaturesSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
          Why Choose Our Platform?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We provide the most comprehensive learning experience with cutting-edge technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <Card key={index} className="group text-center hover:-translate-y-2 transition-all duration-300 border-0 shadow-sm">
            <CardHeader>
              <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-black group-hover:text-white transition-all duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);