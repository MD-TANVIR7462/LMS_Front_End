// 'use client';

// import { CTASection } from '@/components/Home/CTASection';
// import { FAQSection } from '@/components/Home/FAQSection';
// import { FeaturesSection } from '@/components/Home/FeaturedSection';
// import { Footer } from '@/components/Home/Footer';
// import { HeroSection } from '@/components/Home/HeroSection';
// import { TestimonialsSection } from '@/components/Home/TestimonialsSection';
// import { Navigation } from '@/components/Navigation';



// export default function Home() {


//   return (
//     <div className="min-h-screen bg-white">
//       <Navigation />
//       <HeroSection />
//       <FeaturesSection />
//       <TestimonialsSection />
//       <FAQSection />
//       <CTASection />
//       <Footer />
//     </div>
//   );
// }
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/features/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { Loading } from "@/components/ui/loading";

type UserType = {
  name: string;
  email: string;
  role?: "admin" | "user";
};

const HomePage = () => {
  const router = useRouter();
  const user = useAppSelector(useCurrentUser) as UserType | null;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin");
    } else if (user.role === "user") {
      router.push("/courses");
    }
  }, [user, router]);


  return <Loading />
}
export default HomePage;
