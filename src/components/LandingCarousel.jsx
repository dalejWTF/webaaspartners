"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect } from "react"; // Importa useEffect

const images = [
  {
    src: "/assets/images/1.jpg",
    alt: "Image 1",
  },
  {
    src: "/assets/images/2.jpg",
    alt: "Image 2",
  },
  {
    src: "/assets/images/3.jpg",
    alt: "Image 3",
  },
  {
    src: "/assets/images/4.jpg",
    alt: "Image 4",
  },
  {
    src: "/assets/images/5.jpg",
    alt: "Image 5",
  },
  {
    src: "/assets/images/6.jpg",
    alt: "Image 6",
  },
];

const LandingCarousel = () => {
  // Agrega el useEffect para desactivar el clic derecho
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName.toLowerCase() === "img") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, duration: 0.4, ease: "easeIn" },
      }}
    >
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }}
        className="xxl:w-[1350px] xxl:h-[700px] xl:w-[1150px] xl:h-[490px] max-w-full h-[300px] mx-auto pl-4" // Tamaño fijo del carrusel
      >
        <CarouselContent className="xxl:w-[1350px] xxl:h-[700px] xl:w-[1150px] xl:h-[490px] w-[500px] h-[300px] mx-auto">
          {images.map((image, index) => (
             <CarouselItem key={index} className="w-full h-full p-0"> {/* Quita el padding */}
              <div className="w-full h-full">
              <Card className="w-full h-full border-0 shadow-none"> {/* Quita el borde y la sombra */}
                  <CardContent className="flex justify-center items-center w-full h-full p-0"> {/* Quita el padding */}
                    <div className="w-full h-full relative">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        priority
                        fill // Usa "fill" para que la imagen ocupe todo el espacio del contenedor
                        quality={100}
                        className="object-contain w-full h-full xxl:max-w-[1350px] xxl:max-h-[700px] xl:max-w-[1200px] xl:max-h-[490px] transition-all duration-300"

                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </motion.section>
  );
};

export default LandingCarousel;