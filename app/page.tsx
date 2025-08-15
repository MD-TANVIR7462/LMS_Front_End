

"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Play,
  Users,
  BookOpen,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';


export default function Home() {
    const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.role) {

      if (user.role === 'admin') {
        router.push('/admin');
      }

    }
  }, [user, isLoading, router]);
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

  const faqs = [
    {
      question: "How long do I have access to the courses?",
      answer: "You get lifetime access to all course materials, including any future updates and bonus content."
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes, you'll receive a verified certificate of completion for each course you finish, which you can share on LinkedIn and your resume."
    },
    {
      question: "Can I get a refund?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with any course, you can request a full refund within 30 days."
    },
    {
      question: "Are there any prerequisites?",
      answer: "Most of our courses are designed for beginners. Any prerequisites are clearly listed in the course description."
    },
    {
      question: "Can I download the course materials?",
      answer: "Yes, you can download videos, resources, and materials for offline viewing on our mobile app."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-white/30"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 border border-white/20 rotate-12"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Logo */}
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
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-lg font-semibold rounded-full">
              Start Learning
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-10 py-6 text-lg font-semibold rounded-full group">
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">50K+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">200+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">95%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the most comprehensive learning experience with cutting-edge technology and expert instruction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: <Users className="h-10 w-10 text-black" />,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of real-world experience and proven track records."
              },
              {
                icon: <Shield className="h-10 w-10 text-black" />,
                title: "Lifetime Access",
                description: "Get unlimited access to course materials and updates forever. Learn at your own pace."
              },
              {
                icon: <Award className="h-10 w-10 text-black" />,
                title: "Verified Certificates",
                description: "Earn certificates that are recognized by top companies worldwide and boost your career."
              },
              {
                icon: <Zap className="h-10 w-10 text-black" />,
                title: "Interactive Learning",
                description: "Engage with hands-on projects, quizzes, and coding challenges that reinforce your learning."
              },
              {
                icon: <Globe className="h-10 w-10 text-black" />,
                title: "Global Community",
                description: "Connect with students and professionals from around the world. Network and collaborate."
              },
              {
                icon: <Target className="h-10 w-10 text-black" />,
                title: "Personalized Path",
                description: "Get customized learning paths based on your goals, skill level, and career aspirations."
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center hover:-translate-y-2 transition-all duration-300">
                <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <div className="group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied learners who have transformed their careers and achieved their goals.
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

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers to help you get started on your learning journey.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-xl px-8 border-0 shadow-sm">
                <AccordionTrigger className="text-left hover:text-gray-700 hover:no-underline py-6">
                  <span className="font-bold text-lg text-black">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-lg leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join over 50,000 students who are already advancing their careers and achieving their dreams with our comprehensive learning platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-12 py-6 text-lg font-bold rounded-full">
              Start Your Journey
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg font-bold rounded-full">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-black">LMS</span>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Empowering learners worldwide with high-quality, accessible education that transforms careers and lives.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Learning */}
            <div>
              <h3 className="text-lg font-bold text-black mb-6">Learning</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Browse Courses</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Learning Paths</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Certificates</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Student Resources</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-bold text-black mb-6">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Partners</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-black mb-6">Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@lms.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li><a href="#" className="hover:text-black transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-600">
            <p>&copy; 2025 LMS. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}