import LandingBanner from "@/components/home/LandingAnimation";
// Import the new component

export default function Home() {
  return (
    <main className="bg-black">
      {/* Add the particle background */}
      <LandingBanner />
    </main>
  );
}
