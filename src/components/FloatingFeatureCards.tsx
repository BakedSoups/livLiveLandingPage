"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const floatingTiles = [
  {
    num: "01",
    title: "Find Venues",
    caption: "Match the idea to a real room that can actually host it",
    src: "/assets/gifs/rocket.gif",
    stillSrc: "/assets/gifs/stills/rocket.png",
    animated: true,
    className: "left-[4%] top-[16%] rotate-[-8deg]",
    previewClass: "left-[4%] top-[23%]",
    captionClass: "left-72 top-8",
  },
  {
    num: "02",
    title: "Event Curation",
    caption: "Turn loose event ideas into a clear format and plan",
    src: "/assets/gifs/concert_event.gif",
    stillSrc: "/assets/gifs/stills/concert_event.png",
    animated: true,
    className: "right-[7%] top-[13%] rotate-[7deg]",
    previewClass: "right-[7%] top-[20%]",
    captionClass: "right-72 top-8 text-right",
  },
  {
    num: "03",
    title: "Hire Talent",
    caption: "Find creators, DJs, hosts, and media people who fit",
    src: "/assets/gifs/photographer.gif",
    stillSrc: "/assets/gifs/stills/photographer.png",
    animated: true,
    className: "left-[8%] bottom-[24%] rotate-[5deg]",
    previewClass: "left-[8%] bottom-[31%]",
    captionClass: "left-72 bottom-14",
  },
  {
    num: "04",
    title: "Find Sponsors",
    caption: "Match brands and partners to the audience in the room",
    src: "/assets/gifs/redbull_sponsor.avif",
    stillSrc: "/assets/gifs/redbull_sponsor.avif",
    animated: false,
    className: "right-[11%] bottom-[18%] rotate-[-6deg]",
    previewClass: "right-[11%] bottom-[25%]",
    captionClass: "right-72 bottom-14 text-right",
  },
  {
    num: "05",
    title: "Get Insured",
    caption: "Surface permits, coverage, and risk before it gets expensive",
    src: "/assets/gifs/writting_insurance.gif",
    stillSrc: "/assets/gifs/stills/writting_insurance.png",
    animated: true,
    className: "left-[31%] top-[7%] rotate-[3deg]",
    previewClass: "left-[31%] top-[14%]",
    captionClass: "left-72 top-8",
  },
  {
    num: "06",
    title: "Event Security",
    caption: "Plan guards, door flow, and guest safety before launch",
    src: "/assets/gifs/event_security_hire.jpg",
    stillSrc: "/assets/gifs/event_security_hire.jpg",
    animated: false,
    className: "right-[29%] bottom-[7%] rotate-[4deg]",
    previewClass: "right-[29%] bottom-[14%]",
    captionClass: "right-72 bottom-14 text-right",
  },
];

const animatedTileIndexes = floatingTiles
  .map((tile, index) => (tile.animated ? index : -1))
  .filter((index) => index >= 0);

export default function FloatingFeatureCards() {
  const [activeAnimatedIndex, setActiveAnimatedIndex] = useState(
    animatedTileIndexes[0],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAnimatedIndex((current) => {
        const currentPosition = animatedTileIndexes.indexOf(current);
        const nextPosition = (currentPosition + 1) % animatedTileIndexes.length;
        return animatedTileIndexes[nextPosition];
      });
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
      {floatingTiles.map((tile, index) => {
        const isActiveGif = tile.animated && activeAnimatedIndex === index;
        const imageSrc = isActiveGif ? tile.src : tile.stillSrc;

        return (
        <div
          key={tile.num}
          onMouseEnter={() => {
            if (tile.animated) setActiveAnimatedIndex(index);
          }}
          className={`group pointer-events-auto absolute w-64 ${tile.previewClass}`}
        >
          <p className="absolute -top-9 left-0 z-20 font-mono text-[11px] font-black uppercase tracking-[0.14em] text-white/58 transition duration-300 group-hover:text-white">
            {tile.title}
          </p>

          <p
            className={`pointer-events-none absolute z-30 w-52 font-mono text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/0 transition duration-300 group-hover:text-white/72 ${tile.captionClass}`}
          >
            {tile.caption}
          </p>

          <div className="relative aspect-[1.65/1] overflow-hidden rounded-sm bg-white/5 transition duration-300 group-hover:scale-[1.03]">
            <Image
              src={imageSrc}
              alt=""
              fill
              unoptimized
              sizes="256px"
              className={`h-full w-full object-cover saturate-110 contrast-105 transition duration-300 group-hover:opacity-100 group-hover:saturate-125 ${
                isActiveGif ? "opacity-100" : "opacity-86"
              }`}
            />
            <div className="absolute inset-0 bg-black/8 mix-blend-multiply transition duration-300 group-hover:bg-black/0" />
          </div>
        </div>
        );
      })}
    </div>
  );
}

export function MobileFeatureCarousel() {
  const [activeAnimatedIndex, setActiveAnimatedIndex] = useState(
    animatedTileIndexes[0],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveAnimatedIndex((current) => {
        const currentPosition = animatedTileIndexes.indexOf(current);
        const nextPosition = (currentPosition + 1) % animatedTileIndexes.length;
        return animatedTileIndexes[nextPosition];
      });
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 w-screen max-w-[100vw] overflow-hidden lg:hidden">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {floatingTiles.map((tile, index) => {
        const isActiveGif = tile.animated && activeAnimatedIndex === index;
        const imageSrc = isActiveGif ? tile.src : tile.stillSrc;

        return (
          <div
            key={tile.num}
            onPointerDown={() => {
              if (tile.animated) setActiveAnimatedIndex(index);
            }}
            className="w-[78vw] max-w-[330px] shrink-0 snap-center text-center"
          >
            <p className="mb-2 text-center font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white/75">
              {tile.title}
            </p>
            <div className="relative aspect-[1.45/1] overflow-hidden rounded-sm bg-white/5">
              <Image
                src={imageSrc}
                alt=""
                fill
                unoptimized
                sizes="78vw"
                className="h-full w-full object-cover opacity-95 saturate-110 contrast-105"
              />
              <div className="absolute inset-0 bg-black/8 mix-blend-multiply" />
            </div>
            <p className="mt-2 text-center font-mono text-[10px] font-bold uppercase leading-4 tracking-[0.06em] text-white/55">
              {tile.caption}
            </p>
          </div>
        );
      })}
      </div>
    </div>
  );
}
