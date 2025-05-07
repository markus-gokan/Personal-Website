// src/components/GalleryFlex.jsx
import React, { useState } from "react";
import "./galleryFlex.css";

export default function GalleryFlex({ images = [], textSlots = [] }) {
  // 1) Build merged list with img / video / text items
  const merged = images.map((item) => {
    const { src, size = 1 } =
      typeof item === "string" ? { src: item } : item;
    const isVideo = /\.(mp4|mov)$/i.test(src);
    return {
      type: isVideo ? "video" : "img",
      src,
      size,
    };
  });

  // 2) Splice in text cards
  textSlots.forEach(({ index = 0, jsx, size = 1 }) => {
    merged.splice(Math.min(index, merged.length), 0, {
      type: "text",
      jsx,
      size,
    });
  });

  // 3) Modal state
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const openModal = (i) => {
    setCurrent(i);
    setOpen(true);
  };

  return (
    <>
      <div className="gf-container">
        {merged.map((item, i) => {
          if (item.type === "img") {
            return (
              <img
                key={item.src}
                src={item.src}
                alt={`gallery-${i}`}
                className={`gf-tile gf-span-${item.size}`}
                onClick={() => openModal(i)}
              />
            );
          } else if (item.type === "video") {
            return (
              <video
                key={item.src}
                className={`gf-tile gf-span-${item.size}`}
                controls
                onClick={() => openModal(i)}
              >
                <source
                  src={item.src}
                  type={
                    /\.mov$/i.test(item.src)
                      ? "video/quicktime"
                      : "video/mp4"
                  }
                />
              </video>
            );
          } else {
            return (
              <div
                key={`txt-${i}`}
                className={`gf-card gf-span-${item.size}`}
              >
                {item.jsx}
              </div>
            );
          }
        })}
      </div>

      {open && (
        <div className="gf-modal" onClick={() => setOpen(false)}>
          {merged[current].type === "img" ? (
            <img
              src={merged[current].src}
              alt="large-view"
            />
          ) : (
            <video controls autoPlay>
              <source
                src={merged[current].src}
                type={
                  /\.mov$/i.test(merged[current].src)
                    ? "video/quicktime"
                    : "video/mp4"
                }
              />
            </video>
          )}
        </div>
      )}
    </>
  );
}