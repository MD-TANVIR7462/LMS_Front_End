'use client';

import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer = () => (
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
            Empowering learners worldwide with high-quality education.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: <Facebook className="h-6 w-6" />, label: "Facebook" },
              { icon: <Twitter className="h-6 w-6" />, label: "Twitter" },
              { icon: <Instagram className="h-6 w-6" />, label: "Instagram" },
              { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn" }
            ].map((social, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-gray-400 hover:text-black transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        {[
          {
            title: "Learning",
            links: ["Browse Courses", "Learning Paths", "Certificates", "Mobile App", "Resources"]
          },
          {
            title: "Company",
            links: ["About Us", "Careers", "Blog", "Press", "Partners"]
          },
          {
            title: "Support",
            items: [
              { icon: <Mail className="h-4 w-4" />, text: "support@lms.com" },
              { icon: <Phone className="h-4 w-4" />, text: "+1 (555) 123-4567" },
              { text: "Help Center" },
              { text: "Community" },
              { text: "Contact Us" }
            ]
          }
        ].map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-bold text-black mb-6">{section.title}</h3>
            <ul className="space-y-3 text-gray-600">
              {section.links ? (
                section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-black transition-colors">{link}</a>
                  </li>
                ))
              ) : (
                section.items?.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    {item.icon && item.icon}
                    <a href="#" className="hover:text-black transition-colors">{item.text}</a>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} LMS. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-black">Privacy Policy</a>
          <a href="#" className="hover:text-black">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);