import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Pricing from '@/components/Pricing';


export default function Home({ searchParams }) {
 const isInDev = false;
 const { ref } = searchParams;


 if(!isInDev){
   return (
     <>
       <Suspense>
         <Header/>
       </Suspense>
       <main>
         <Hero />
         <Problem />
         <FeaturesAccordion />
         {/* <FeaturesGrid/>
         < FeaturesListicle/> */}
         
         {ref === "internetisbeautiful" ? null : (<Pricing />)}
         <FAQ />
         <CTA />
 
         {/* <UserNavbar /> */}
       </main>
       <Footer />
     </>
   );
  }else{
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">App is in development</h1>
      <p className="text-lg text-gray-600 mb-2">We are working hard to bring you the best experience.</p>
      <p className="text-lg text-gray-600">Check back later for updates.</p>
    </div>
    )
  }
  
}