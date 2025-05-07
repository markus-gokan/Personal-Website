// src/components/TronBike.jsx
import React, { useEffect, useRef, useState } from "react";
import bikeSrc from "@site/static/img/tron-bike.png";

// simple hex→RGB parser for #rrggbb
function hexToRgb(hex) {
  if (hex.startsWith("#")) hex = hex.slice(1);
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >>  8) & 0xff,
    b:  num        & 0xff,
  };
}

export default function TronBike({
  trailColor = "#00ffff",
  spriteTint = null,
}) {
  // Track Docusaurus data-theme attr: "light" or "dark"
  const [theme, setTheme] = useState(
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme")
      : "light"
  );

  useEffect(() => {
    // Watch for changes to data-theme on <html>
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  // Hide the canvas unless we're in dark mode
  if (theme !== "light") {
    return null;
  }

  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    let w = (canvas.width  = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    window.addEventListener("resize", () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    // bike state
    let x     = Math.random() * w;
    let y     = Math.random() * h;
    let angle = Math.random() * 2 * Math.PI;

    const speed    = 2;                   // px per frame
    const trailLen = 1600;                 // px of history
    const fadeLen  = 100;                 // last 100px fade
    const wiggleP  = 0.01;                // random-turn chance per frame
    const maxTurn  = Math.PI / 8;         // ±22.5°
    const maxPts   = Math.ceil(trailLen / speed);
    const fadePts  = Math.ceil(fadeLen  / speed);
    const pts      = [];

    // parse trailColor
    const { r, g, b } = hexToRgb(trailColor);

    const bike = new Image();
    bike.src = bikeSrc;

    function animate() {
      // random wiggle
      if (Math.random() < wiggleP) {
        angle += (Math.random() * 2 - 1) * maxTurn;
      }

      // move & bounce
      x += Math.cos(angle) * speed;
      y += Math.sin(angle) * speed;
      if (x < 0 || x > w) angle = Math.PI - angle;
      if (y < 0 || y > h) angle = -angle;

      // record path
      pts.push({ x, y });
      if (pts.length > maxPts) pts.shift();

      // clear
      ctx.clearRect(0, 0, w, h);

      // draw trail
      ctx.lineWidth = 12;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1],
              p1 = pts[i];
        let alpha =
          i < pts.length - fadePts
            ? 1
            : (pts.length - i) / fadePts;
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // draw bike sprite (128px)
      const size = 128;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      // flip horizontally if heading left
      if (Math.cos(angle) < 0) ctx.scale(1, -1);

      ctx.drawImage(bike, -size/2, -size/2, size, size);

      // apply tint if provided
      if (spriteTint) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = spriteTint;
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.restore();
      requestAnimationFrame(animate);
    }

    bike.onload = animate;
    return () => window.removeEventListener("resize", () => {});
  }, [trailColor, spriteTint]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         "100vw",
        height:        "100vh",
        pointerEvents: "none",
        zIndex:        9999,
      }}
    />
  );
}