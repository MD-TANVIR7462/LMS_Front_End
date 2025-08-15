'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Software Developer",
    content: "This platform completely transformed my learning experience. The quality is exceptional.",
    rating: 5,
    avatar: "AT"
  },
  {
    name: "Maria Garcia",
    role: "UX Designer",
    content: "Best investment I've made in my professional development. Highly recommend!",
    rating: 5,
    avatar: "MG"
  },
  {
    name: "James Wilson",
    role: "Data Scientist",
    content: "The instructors are world-class and the content is always up-to-date.",
    rating: 5,
    avatar: "JW"
  }
];

export const TestimonialsSection = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
          What Our Students Say
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join thousands of satisfied learners who have transformed their careers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-black text-white font-bold text-lg">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-black text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-black text-black" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed italic">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);