import React, { useRef } from "react";

function ImageCrousel(img) {

  console.log(img);
  

  // const images = [
  //   "https://picsum.photos/id/1015/800/500",
  //   "https://picsum.photos/id/1024/800/500",
  //   "https://picsum.photos/id/1039/800/500",
  //   "https://picsum.photos/id/1043/800/500",
  //   "https://picsum.photos/id/1050/800/500",
  // ];

  const images = img.img;

  const scrollerRef = useRef(null);

  const scrollByAmount = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("img")?.clientWidth ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Controls */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2 backdrop-blur ring-1 ring-white/20 transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByAmount(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 p-2 backdrop-blur ring-1 ring-white/20 transition"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80" />
        </svg>
      </button>

      {/* Carousel */}
      <div
        ref={scrollerRef}
        className="
          flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-3
          rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-lg shadow-black/20
        "
      >
        {images.map((src, id) => (
          <img
            key={id}
            src={src}
            alt={`Project preview ${id + 1}`}
            loading="lazy"
            className="
              w-[18rem] sm:w-88 lg:w-104 h-48 sm:h-56 lg:h-64
              object-cover rounded-xl snap-center select-none
              ring-1 ring-white/10 hover:ring-white/30 transition
              hover:scale-[1.01] duration-200 ease-out
              shrink-0
            "
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCrousel;