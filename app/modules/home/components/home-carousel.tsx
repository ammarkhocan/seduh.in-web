import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";

export function HomeCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Daftar gambar dari folder public/images
  const images = [
    "/images/slide-1.jpg",
    "/images/slide-2.jpg",
    "/images/slide-3.jpg",
    "/images/slide-4.jpg",
    "/images/slide-5.jpg",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-7xl mx-auto shadow-2xl rounded-3xl overflow-hidden"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.reset()}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[400px]">
              <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
