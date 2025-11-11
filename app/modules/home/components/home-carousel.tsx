import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";

export function HomeCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const images = [
    "https://1ea7bnszm7.ucarecd.net/f31477da-2ac7-4c0f-bfbb-97a0796faed0/-/preview/1000x391",
    "https://1ea7bnszm7.ucarecd.net/29703a54-029f-4cc1-9101-6ab41971b784/-/preview/1000x390",
    "https://1ea7bnszm7.ucarecd.net/2f9d263e-db2a-4351-a3f0-ae53696df153/-/preview/1000x321",
    "https://1ea7bnszm7.ucarecd.net/87aed4be-18be-4a50-8bee-e4593cb85185/-/preview/1000x410",
    "https://1ea7bnszm7.ucarecd.net/ec266fa6-250a-43e4-8952-082c42a58c2d/-/preview/1000x390",
  ];

  return (
    <Carousel plugins={[plugin.current]} className="w-full max-w-7xl mx-auto shadow-2xl rounded-3xl overflow-hidden">
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
