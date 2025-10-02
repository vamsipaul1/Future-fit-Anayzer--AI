import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import TrendingSkills from '../components/TrendingSkills'
import CTA from '../components/CTA'
import Footer from '../components/layout/Footer'
import Navigation from '../components/layout/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <HowItWorks />
      <TrendingSkills />
      <CTA />
      <Footer />
    </div>
  );
}