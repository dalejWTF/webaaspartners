import Social from "@/components/Social";
import LandingCarousel from "@/components/LandingCarousel";
import { useTranslations } from "next-intl";

const Home = () => {

  const translation = useTranslations("Home");
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        {/* Carousel */}
        <div className="flex flex-col xl:flex-row items-center xl:pt-6 pb-6">
          <LandingCarousel />
        </div>
        <div className="flex flex-col items-center justify-center xl:pb-8">
          <div className="text-center xl:order-none">
            {/* Redes sociales */}
            <div className="flex justify-center">
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-primary hover:text-white hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;