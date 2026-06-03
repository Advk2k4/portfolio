import TextTrail from './TextTrail';
import ModernButton from './ModernButton';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-black flex flex-col justify-center items-center text-white px-6">
      <div className="w-full h-[250px] sm:h-[300px] md:h-[400px]">
      <TextTrail text="HEY THERE, I AM AADVIK MISHRA" textColor="#FFFFFF" />

      </div>

      <p className="mt-6 text-center max-w-xl text-lg font-light text-white">
        Computer Engineering student @ UMass Amherst| Embedded Systems, AI/ML & Full-Stack Dev | Building future-focused tech
      </p>

      <div className="mt-8">
        <ModernButton 
          href="/public/AadvikMishra_Resume.pdf"
          variant="primary"
          size="md"
        >
          Download Resume
        </ModernButton>
      </div>
    </section>
  );
}
