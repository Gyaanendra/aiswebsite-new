import LandingBanner from "@/components/home/LandingAnimation";
// Import the new component
import Aboutus from "@/screens/aboutus";
export default function Home() {
  return (
    <main className="bg-black">
      {/* Add the particle background */}
      <LandingBanner />
      {/* <section className="mt-10">
        <Aboutus />
      </section> */}
    </main>
  );
}
