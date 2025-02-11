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
];

const LandingCarousel = () => {
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
        className="lx:w-[1200px] xl:h-[700px] w-[500px] xl:h-[500px]  mx-auto" // Tamaño fijo del carrusel
      >
        <CarouselContent className="xl:w-[1200px] xl:h-[700px] w-[500px] h-[500px] mx-auto">
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full">
              <div className="p-1 w-full h-full">
                <Card className="w-full h-full overflow-hidden"> {/* Evita que la imagen se desborde */}
                  <CardContent className="flex justify-center items-center w-full h-full p-0">
                    <div className="w-full h-full relative">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        priority
                        fill // Usa "fill" para que la imagen ocupe todo el espacio del contenedor
                        quality={100}
                        className="object-cover" // Ajusta la imagen sin estirarla
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