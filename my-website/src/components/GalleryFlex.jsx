import React, { useState } from "react";
import "./galleryFlex.css";

export default function GalleryFlex({ images = [], textSlots = [] }) {
  /* images → objects with size = 1 */
  const merged = images.map((src) => ({ type: "img", src, size: 1 }));

  /* splice text cards in, carrying their size */
  textSlots.forEach(({ index = 0, jsx, size = 1 }) => {
    merged.splice(Math.min(index, merged.length), 0, {
      type: "text",
      jsx,
      size,
    });
  });

  /* modal state */
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const openModal = (i) => {
    setCurrent(i);
    setOpen(true);
  };

  return (
    <>
      <div className="gf-container">
        {merged.map((item, i) =>
          item.type === "img" ? (
            <img
              key={item.src}
              src={item.src}
              alt={`gallery-${i}`}
              className="gf-tile"
              onClick={() => openModal(i)}
            />
          ) : (
            <div
              key={`txt-${i}`}
              className={`gf-card gf-span-${item.size || 1}`}
            >
              {item.jsx}
            </div>
          )
        )}
      </div>

      {open && (
        <div className="gf-modal" onClick={() => setOpen(false)}>
          <img src={merged[current].src} alt="large-view" />
        </div>
      )}
    </>
  );
}