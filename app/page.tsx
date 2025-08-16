'use client';

import { CTASection } from '@/components/Home/CTASection';
import { FAQSection } from '@/components/Home/FAQSection';
import { FeaturesSection } from '@/components/Home/FeaturedSection';
import { Footer } from '@/components/Home/Footer';
import { HeroSection } from '@/components/Home/HeroSection';
import { TestimonialsSection } from '@/components/Home/TestimonialsSection';
import { Navigation } from '@/components/Navigation';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



export default function Home() {
  // const { user, isLoading } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && user?.role === 'admin') {
  //     router.push('/admin');
  //   }
  // }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation/>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}