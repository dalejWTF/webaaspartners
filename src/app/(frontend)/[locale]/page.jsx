//app/(frontend)/[locale]/page.jsx

import Social from "@/components/Social";
import LandingCarousel from "@/components/LandingCarousel";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        {/* Carousel */}
        <div className="flex flex-col xl:flex-row items-center xxl:pt-6 xl:pb-4 xxl:pb-6 xxl:pt-4">
          <LandingCarousel />
        </div>

        {/* Redes sociales: alineado a la izquierda en móviles, centrado en pantallas grandes */}
        <div className="flex w-full items-start xl:items-center justify-start xl:justify-center">
          <Social
            containerStyles="flex gap-6"
            iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-primary hover:text-white hover:transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
