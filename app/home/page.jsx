import LandingBanner from "@/components/home/LandingAnimation";
// Import the new component
import Aboutus from "@/screens/aboutus";
import SplashCursor from "@/Animations/SplashCursor/SplashCursor";
export default function Home() {
  return (
    <main className="bg-black">
      {/* Add the particle background */}
      <section className="h-auto">
        <LandingBanner />
      </section>
      {/* <section className="mt-10">
        <Aboutus />
      </section> */}
    </main>
  );
}
