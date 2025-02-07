"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
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
    <motion.section initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, duration: 0.4, ease: "easeIn" }
      }}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
          }),
        ]}
        opts={{ loop: true }} className="w-full max-w max-h mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-sm xl:basis-lg">
              <div className="p-1">
                <Card>
                  <CardContent className="flex justify-center items-center w-full h-full p-0">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      priority
                      width={500}      // Establece el ancho fijo
                      height={500}     // Establece la altura fija
                      quality={100}
                      className="object-cover"
                    />
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
