import React, { useState } from "react";
import RingCarousel from "@site/src/components/RingCarousel";
import { projects } from "@site/src/data/projectList";
import Link from "@docusaurus/Link";
import "./HomeHero.css";                 /* new css below */

export default function Home() {
  const featured = projects.filter(p => p.featured);
  const [open,setOpen] = useState(false);
  
  return (
    <>
    
      {/* ---------- HERO TEXT ---------- */}
      <section className="hero">
        <h1>Markus&nbsp;Gokan</h1>
        <p>Mechanical engineer • Classic Car Enthusiast • Struggling Web Designer</p>
  
        <div className="btnRow">
          
        <Link to="/about" className="toggleBtn aboutBtn">
  About Me
  <span className="glow"></span>
</Link>
        </div>
  
        {/* ---------- SHOWCASE TOGGLE BUTTON ---------- */}
        <button
          className={`toggleBtn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {open ? "Collapse Showcase" : "Project Showcase"}
          <span className="glow"></span>
        </button>
  
      </section>

     {/* ---------- CAROUSEL WRAPPER ---------- */}
     <div   className={`carouselWrap ${open ? "open" : "fade"}`}>
     <RingCarousel items={featured} />
   </div>
  
  </>
  )
};