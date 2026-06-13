"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const floatingTiles = [
  {
    num: "01",
    title: "Host Hackathons",
    caption: "Host your next hackathon with ease",
    src: "/assets/gifs/tech_meetup.gif",
    stillSrc: "/assets/gifs/stills/tech_meetup.png",
    animated: true,
    className: "left-[4%] top-[16%] rotate-[-8deg]",
    previewClass: "left-[4%] top-[23%]",
    captionClass: "left-60 top-8",
    bootX: "38vw",
    bootY: "24vh",
    bootDelay: "120ms",
  },
  {
    num: "02",
    title: "Event Curation",
    caption: "Turn loose event ideas into a clear format and plan",
    src: "/assets/gifs/concert_event.gif",
    stillSrc: "/assets/gifs/stills/concert_event.png",
    animated: true,
    className: "right-[7%] top-[18%] rotate-[7deg]",
    previewClass: "right-[7%] top-[25%]",
    captionClass: "right-72 top-8 text-right",
    bootX: "-35vw",
    bootY: "25vh",
    bootDelay: "180ms",
  },
  {
    num: "03",
    title: "Hire DJs",
    caption: "Book a DJ who matches the room, crowd, and event energy",
    src: "/assets/gifs/dj_hire.jpeg",
    stillSrc: "/assets/gifs/dj_hire.jpeg",
    animated: false,
    className: "left-[16%] bottom-[15%] rotate-[5deg]",
    previewClass: "left-[16%] bottom-[22%]",
    captionClass: "left-72 bottom-14",
    bootX: "34vw",
    bootY: "-18vh",
    bootDelay: "260ms",
  },
  {
    num: "04",
    title: "Main Sponsor",
    caption: "Find a title sponsor that fits the audience and makes the event bigger",
    src: "/assets/gifs/pepsi_sponsor.jpeg",
    stillSrc: "/assets/gifs/pepsi_sponsor.jpeg",
    animated: false,
    className: "right-[11%] bottom-[11%] rotate-[-6deg]",
    previewClass: "right-[11%] bottom-[18%]",
    captionClass: "right-72 bottom-14 text-right",
    bootX: "-32vw",
    bootY: "-20vh",
    bootDelay: "320ms",
  },
  {
    num: "05",
    title: "Sponsor Fit",
    caption: "Match personalized brand partners to the exact community you are gathering",
    src: "/assets/gifs/redbull_sponsor.avif",
    stillSrc: "/assets/gifs/redbull_sponsor.avif",
    animated: false,
    className: "right-[2%] top-[48%] rotate-[4deg]",
    previewClass: "right-[2%] top-[55%]",
    captionClass: "right-72 top-8 text-right",
    bootX: "-36vw",
    bootY: "0vh",
    bootDelay: "350ms",
  },
  {
    num: "06",
    title: "Local Events",
    caption: "Turn cafes and neighborhood shops into easy community meetups",
    src: "/assets/gifs/cafe_event.jpg",
    stillSrc: "/assets/gifs/cafe_event.jpg",
    animated: false,
    className: "left-[2%] top-[49%] rotate-[6deg]",
    previewClass: "left-[2%] top-[56%]",
    captionClass: "left-60 top-8",
    bootX: "36vw",
    bootY: "0vh",
    bootDelay: "360ms",
  },
  {
    num: "07",
    title: "Save Time",
    caption: "Cut the repetitive event work and get back to the creative parts",
    src: "/assets/gifs/save_time.gif",
    stillSrc: "/assets/gifs/stills/save_time.png",
    animated: true,
    className: "left-[27%] bottom-[5%] rotate-[-4deg]",
    previewClass: "left-[27%] bottom-[12%]",
    captionClass: "left-72 bottom-14",
    bootX: "4vw",
    bootY: "-32vh",
    bootDelay: "410ms",
  },
  {
    num: "08",
    title: "Go Bigger",
    caption: "Grow into esports nights, tournaments, and community-scale experiences",
    src: "/assets/gifs/esports.gif",
    stillSrc: "/assets/gifs/stills/esports.png",
    animated: true,
    className: "right-[20%] top-[4%] rotate-[-5deg]",
    previewClass: "right-[20%] top-[11%]",
    captionClass: "left-60 top-8",
    bootX: "-5vw",
    bootY: "32vh",
    bootDelay: "460ms",
  },
  {
    num: "09",
    title: "Get Insured",
    caption: "Surface permits, coverage, and risk before it gets expensive",
    src: "/assets/gifs/writting_insurance.gif",
    stillSrc: "/assets/gifs/stills/writting_insurance.png",
    animated: true,
    className: "left-[24%] top-[7%] rotate-[3deg]",
    previewClass: "left-[24%] top-[14%]",
    captionClass: "left-72 top-8",
    bootX: "8vw",
    bootY: "34vh",
    bootDelay: "220ms",
  },
  {
    num: "10",
    title: "Any Event",
    caption: "Plan conferences, panels, parties, and whatever your community needs next",
    src: "/assets/gifs/comference.webp",
    stillSrc: "/assets/gifs/comference.webp",
    animated: false,
    className: "left-[49%] top-[10%] rotate-[2deg]",
    previewClass: "left-[49%] top-[17%]",
    captionClass: "left-60 top-6",
    bootX: "0vw",
    bootY: "12vh",
    bootDelay: "500ms",
  },
  {
    num: "11",
    title: "Event Security",
    caption: "Plan guards, door flow, and guest safety before launch",
    src: "/assets/gifs/event_security_hire.jpg",
    stillSrc: "/assets/gifs/event_security_hire.jpg",
    animated: false,
    className: "right-[34%] bottom-[7%] rotate-[4deg]",
    previewClass: "right-[34%] bottom-[14%]",
    captionClass: "right-72 bottom-14 text-right",
    bootX: "-8vw",
    bootY: "-34vh",
    bootDelay: "380ms",
  },
];

const animatedTileIndexes = floatingTiles
  .map((tile, index) => (tile.animated ? index : -1))
  .filter((index) => index >= 0);

type FloatingTile = (typeof floatingTiles)[number];

function FeatureMedia({
  tile,
  active,
  sizes,
  interactive = false,
}: {
  tile: FloatingTile;
  active: boolean;
  sizes: string;
  interactive?: boolean;
}) {
  const baseClasses = `h-full w-full object-cover saturate-110 contrast-105 transition duration-300 ${
    interactive ? "group-hover:opacity-100 group-hover:saturate-125" : ""
  }`;

  if (!tile.animated) {
    return (
      <Image
        src={tile.src}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className={`${baseClasses} opacity-95`}
      />
    );
  }

  return (
    <>
      <Image
        src={tile.stillSrc}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className={`${baseClasses} opacity-86`}
      />
      <Image
        src={tile.src}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className={`${baseClasses} absolute inset-0 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

export default function FloatingFeatureCards() {
  const rootRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    let animationFrame = 0;

    function updateGyro(event: PointerEvent) {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const root = rootRef.current;
        if (!root) return;

        const globalX = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2));
        const globalY = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2));

        root.style.setProperty("--tilt-x", `${globalY * 32}deg`);
        root.style.setProperty("--tilt-y", `${globalX * 32}deg`);
        root.style.setProperty("--shift-x", `${globalX * 18}px`);
        root.style.setProperty("--shift-y", `${globalY * 18}px`);

        root.querySelectorAll<HTMLElement>("[data-gyro]").forEach((element) => {
          const rect = element.getBoundingClientRect();
          const localX = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
          const localY = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));

          element.style.setProperty("--reveal-x", `${localX}%`);
          element.style.setProperty("--reveal-y", `${localY}%`);
        });
      });
    }

    window.addEventListener("pointermove", updateGyro);

    return () => {
      window.removeEventListener("pointermove", updateGyro);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      style={
        {
          "--tilt-x": "0deg",
          "--tilt-y": "0deg",
          "--shift-x": "0px",
          "--shift-y": "0px",
        } as CSSProperties
      }
    >
      {floatingTiles.map((tile, index) => {
        const isActiveGif = tile.animated && activeAnimatedIndex === index;

        return (
        <div
          key={tile.num}
          onMouseEnter={() => {
            if (tile.animated) setActiveAnimatedIndex(index);
          }}
          style={
            {
              "--boot-x": tile.bootX,
              "--boot-y": tile.bootY,
              "--boot-delay": tile.bootDelay,
              "--reveal-x": "50%",
              "--reveal-y": "50%",
              "--tilt-x": "0deg",
              "--tilt-y": "0deg",
            } as CSSProperties
          }
          className={`feature-spread group pointer-events-auto absolute w-52 ${tile.previewClass}`}
        >
          <div
            data-gyro
            className="feature-gyro relative transition duration-300 group-hover:scale-[1.03]"
          >
            <p className="absolute -top-9 left-0 z-20 font-mono text-[11px] font-black uppercase tracking-[0.14em] text-white/58 transition duration-300 group-hover:text-white">
              {tile.title}
            </p>

            <p
              className={`pointer-events-none absolute z-30 w-44 font-mono text-[9px] font-bold uppercase leading-4 tracking-[0.08em] transition duration-300 group-hover:text-white/72 ${
                isActiveGif ? "text-white/72" : "text-white/0"
              } ${tile.captionClass}`}
            >
              {tile.caption}
            </p>

            <div className="relative aspect-[1.65/1] overflow-hidden rounded-sm bg-white/5">
              <FeatureMedia
                tile={tile}
                active={isActiveGif}
                sizes="256px"
                interactive
              />
              <div className="absolute inset-0 bg-black/8 mix-blend-multiply transition duration-300 group-hover:bg-black/0" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--reveal-x) var(--reveal-y), rgba(255,255,255,0.24), rgba(255,255,255,0.08) 24%, transparent 58%)",
                }}
              />
            </div>
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
    <div className="absolute inset-x-0 bottom-8 z-20 w-full overflow-hidden lg:hidden">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {floatingTiles.map((tile, index) => {
        const isActiveGif = tile.animated && activeAnimatedIndex === index;

        return (
          <div
            key={tile.num}
            onPointerDown={() => {
              if (tile.animated) setActiveAnimatedIndex(index);
            }}
            className="w-[70vw] max-w-[280px] shrink-0 snap-center text-center"
          >
            <p className="mb-2 text-center font-mono text-[10px] font-black uppercase tracking-[0.12em] text-white/75">
              {tile.title}
            </p>
            <div className="relative aspect-[1.45/1] overflow-hidden rounded-sm bg-white/5">
              <FeatureMedia tile={tile} active={isActiveGif} sizes="70vw" />
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
