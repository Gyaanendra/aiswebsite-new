import LandingBanner from "@/components/home/LandingAnimation";
// Import the new component
import Aboutus from "@/screens/aboutus";
import SplashCursor from "@/Animations/SplashCursor/SplashCursor";
import ParticlesComponent from "@/components/Particles";
export default function Home() {
  return (
    <main className="bg-black">
   
    
      {/* Add the particle background */}
      <LandingBanner />
      <ParticlesComponent id = "particles-1" />
      
      
      {/* <section className="mt-10">
        <Aboutus />
      </section> */}
    </main>
  );
}
