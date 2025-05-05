// RingCarousel.jsx  — replace entire file with this
import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import "./ringCarousel.css";

/* constants -------------------------------------------------- */
const PX2DEG       = 0.25;   // wheel pixels → degrees
const MAX_DEG_S    = 60;     // ceiling speed  (deg/s)
const FRIC         = 0.1;    // friction per frame
const MIN_V        = 0.01;   // snap to floor threshold

export default function RingCarousel({ items }) {
  /* derived */
  const Q            = items.length;
  const BASE_DEG_S   = 360 / Q;          // one panel / second
  const stepDeg      = 360 / Q;          // one wheel step
  /* refs & state */
  const sliderRef    = useRef(null);
  const velocity     = useRef(BASE_DEG_S / 60);   // deg / frame
  const snapping     = useRef(false);
  const [angle,setAngle] = useState(0);

  /* place panels on mount ----------------------------------- */
  useEffect(() => {
    const step = 360 / Q;
    [...sliderRef.current.children].forEach((el,i) =>
      el.style.setProperty("--position", i + 1));
    sliderRef.current.style.setProperty("--quantity", Q);
  }, [Q]);

  /* physics loop -------------------------------------------- */
  useEffect(() => {
    let raf;
    const tick = () => {
      if (!snapping.current) {
        velocity.current *= FRIC;                 // friction
        const cap = MAX_DEG_S / 60;               // ceiling
        if (Math.abs(velocity.current) > cap)
          velocity.current = Math.sign(velocity.current) * cap;
        const floor = BASE_DEG_S / 60;            // steady drift
        if (Math.abs(velocity.current) < MIN_V)
          velocity.current = Math.sign(velocity.current||1) * floor;
        setAngle(a => a + velocity.current);      // advance ring
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [BASE_DEG_S]);

  /* wheel & hover handlers ---------------------------------- */
  const wheelHandler = e => {
    e.preventDefault();
    const dir = e.deltaY > 0 ? 1 : -1;
    setAngle(a => a + dir * stepDeg);
  };
  const enterHandler = () => {
    snapping.current = true;
    sliderRef.current.classList.add("snap");
  };
  const leaveHandler = () => {
    snapping.current = false;
    sliderRef.current.classList.remove("snap");
  };

  /* JSX ------------------------------------------------------ */
  return (
    <div className="banner">
      {/* tiltWrapper keeps the ring canted 15° */}
      <div className="tiltWrapper">
      <div
       className="snapZone"
        onWheel={wheelHandler}
        onMouseEnter={enterHandler}
        onMouseLeave={leaveHandler}
        />
      
        <div
          ref={sliderRef}
          className="slider"
          // className="slider"
          style={{ transform:`rotateY(${angle}deg)` }}
      
        >
          {items.map(p => (
            <Link key={p.slug} to={p.slug} className="item" title={p.title}>
              <img src={p.thumb} alt={p.title} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}