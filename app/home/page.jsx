import LandingBanner from "@/components/home/LandingAnimation";
// Import the new component
import Aboutus from "@/screens/aboutus";
import ParticlesComponent from "@/components/Particles";
export default function Home() {
  return (
    <main className="bg-black">
      {/* Add the particle background */}

      <LandingBanner />
      <ParticlesComponent id="particles-1" />
    </main>
  );
}
