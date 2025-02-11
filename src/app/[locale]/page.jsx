import Social from "@/components/Social";
import Photo from "@/components/Photo";
import LandingCarousel from "@/components/LandingCarousel";
import { useTranslations } from "next-intl";


const Home = () => {

  const translation = useTranslations("Home");
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col items-center justify-center xl:pt-8 xl:pb-8">
          <div className="text-center xl:order-none">
            <span className="text-xl">{translation("span")}</span>
            <h1 className="h1 mb-6">
              {translation("h1")}<br />
            </h1>
            <div className="mb-6">
              <Photo />
            </div>
            <p className="max-w-[500px] mb-9">
              {translation("p")}
            </p>

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
        {/* Carousel */}
        <div className="flex flex-col xl:flex-row items-center xl:pt-8 xl:pb-24 pb-8">
          <LandingCarousel />
        </div>
      </div>
    </section>
  );
}

export default Home;