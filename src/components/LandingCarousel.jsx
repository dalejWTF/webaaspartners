"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useMemo, useState } from "react";

export default function LandingCarousel() {
  const [images, setImages] = useState([]);

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
      }),
    []
  );

  // Desactivar clic derecho sobre imágenes
  useEffect(() => {
    const handleContextMenu = (e) => {
      const target = e.target;
      if (target && target.tagName && target.tagName.toLowerCase() === "img") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Cargar imágenes desde Payload
  useEffect(() => {
    (async () => {
      try {
        // Si Payload está en el mismo dominio, esto sirve.
        // Si lo tienes separado, cambia a:
        // const res = await fetch("https://TU_DOMINIO_PAYLOAD/api/landing?limit=1&depth=2", { cache: "no-store" });
        const res = await fetch("/api/landing?limit=1&depth=2", { cache: "no-store" });

        if (!res.ok) return;

        const data = await res.json();
        const doc = data?.docs?.[0];
        if (!doc?.carousel?.length) return;

        const mapped = doc.carousel
          .map((item) => {
            // Con depth=2, item.image ya debería ser objeto con url
            const media = item.image;
            const src = media?.url;

            if (!src) return null;

            return {
              src,
              alt: item.alt || media.alt || "image",
            };
          })
          .filter(Boolean);

        setImages(mapped);
      } catch {
        // opcional: console.log(err)
      }
    })();
  }, []);

  if (!images.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, duration: 0.4, ease: "easeIn" },
      }}
    >
      <Carousel
        plugins={[autoplay]}
        opts={{ loop: true }}
        className="xxl:w-[1350px] xxl:h-[700px] xl:w-[1150px] xl:h-[490px] max-w-full h-[300px] mx-auto pl-4"
      >
        <CarouselContent className="xxl:w-[1350px] xxl:h-[700px] xl:w-[1150px] xl:h-[490px] w-[500px] h-[300px] mx-auto">
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-full p-0">
              <div className="w-full h-full">
                <Card className="w-full h-full border-0 shadow-none">
                  <CardContent className="flex justify-center items-center w-full h-full p-0">
                    <div className="w-full h-full relative">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        priority
                        fill
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
}
