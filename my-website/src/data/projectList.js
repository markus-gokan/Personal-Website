// src/data/projectList.js

const hero = require.context(
    "@site/src/pages",   // root to search
    true,                         // search sub-dirs
    /\/media\/hero\.(jpg|jpeg|png|webp)$/   // only hero files
  );

export const projects = [
    {
      slug: "/ArcKholer/writeup",     // page path
      title: "Enabling self-motility in wheelchair users with minimal hand functionality",
      thumb: hero("./ArcKholer/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/FIRSTKORG/writeup",
      title: "Transparent Oscillating Heat-Pipe",
      thumb: hero("./FIRSTKORG/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/Corvette/writeup",
      title: "1986 Corvette LED Retrofit",
      thumb: hero("./Corvette/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/BeastBoard/writeup",
      title: "Electric SkateBoard: The BEAST",
      thumb: hero("./BeastBoard/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/MAE3Class/writeup",
      title: "1986 Corvette LED Retrofit",
      thumb: hero("./MAE3Class/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/Commuterboard/writeup",
      title: "1986 Corvette LED Retrofit",
      thumb: hero("./Commuterboard/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/RocketComp/writeup",
      title: "1986 Corvette LED Retrofit",
      thumb: hero("./RocketComp/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/WEEG/writeup",
      title: "1986 Corvette LED Retrofit",
      thumb: hero("./WEEG/media/hero.jpg").default,
      featured: true,
    },
    {
      slug: "/MAE148Class/writeup",
      title: "1986 Corvette LED Retrofit",
      thumb: hero("./MAE148Class/media/hero.jpg").default,
      featured: true,
    },
    // …add the rest
  ];