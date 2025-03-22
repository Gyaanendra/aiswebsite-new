import LandingBanner from "@/components/home/LandingAnimation";
// Import the new component
import About from "@/components/aboutus/a";
import ParticlesComponent from "@/components/Particles";
export default function Home() {
  return (
    <main className="bg-black">
      {/* Add the particle background */}

      <LandingBanner />
      <ParticlesComponent id="particles-1" />
      <About />
    </main>
  );
}
