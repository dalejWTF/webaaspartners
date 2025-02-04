import React from "react";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
 
const images = [
    {
        src: "/public/assets/1.jpg",
        alt: "Image 1"
    },
    {
        src: "/public/assets/2.jpg",
        alt: "Image 2"
    },
    {
        src: "/public/assets/3.jpg",
        alt: "Image 3"
    },
    {
        src: "/public/assets/4.jpg",
        alt: "Image 4"
    },
    {
        src: "/public/assets/5.jpg",
        alt: "Image 5"
    }
]

const CarouselDemo = () => {
  return (
    <Carousel opts={{ loop: true }} className="w-full max-w max-h mx-auto">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-rectangle items-center justify-center p-48">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselDemo;