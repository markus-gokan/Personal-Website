import React, { useState } from "react";
import RingCarousel from "@site/src/components/RingCarousel";
import { projects } from "@site/src/data/projectList";
import Link from "@docusaurus/Link";
import "./HomeHero.css";                 /* new css below */
import TronBike from "../components/TronBike";

export default function Home() {
  const featured = projects.filter(p => p.featured);
  const [open,setOpen] = useState(false);
  
  return (
    <>
  <TronBike
        trailColor="#00d5ff"
        spriteTint="rgba(0, 213, 255, 0.3)"
      />
       <TronBike
        trailColor="#d20000"
        spriteTint="rgba(210, 0, 0, 0.25)"
      />
      {/* ---------- HERO TEXT ---------- */}
      <section className="hero">
        <h1>Markus&nbsp;Gokan</h1>
        <p>Mechanical engineer • Classic Car Enthusiast • Struggling Web Designer</p>
  
        <div className="btnRow">
    <Link to="/about" className="toggleBtn aboutBtn">
      About Me<span className="glow"/></Link>
    <button
      className={`toggleBtn ${open ? "open" : ""}`}
      onClick={()=>setOpen(!open)}
    >
      {open ? "Collapse Showcase" : "Project Showcase"}
      <span className="glow"></span>
    </button>
  </div>
</section>

     {/* ---------- CAROUSEL WRAPPER ---------- */}
     <div   className={`carouselWrap ${open ? "open" : "fade"}`}>
     <RingCarousel items={featured} />
   </div>
  
  </>
  )
};