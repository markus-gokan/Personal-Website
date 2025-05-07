// src/pages/projects.jsx
import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Masonry from "react-masonry-css";
import { projects } from "@site/src/data/projectList";

const bp = { default: 3, 1100: 2, 700: 1 };

export default function ProjectsPage() {
  return (
    <Layout
      title="All Projects"
      description="Browse every project in my portfolio"
    >
      <main style={{
     padding: "2rem 1rem",
     maxWidth: "1600px",    // shrink the page width
     margin: "0 auto"       // center it
 }}>
        <h1 style={{ textAlign: "center"}}>All Projects</h1>

        <Masonry
          breakpointCols={bp}
          className="my-masonry"
          columnClassName="my-column"
        >
           {projects.map((p) => (
   <Link
     key={p.slug}
     to={p.slug}
     className="project-card"
   >
     <img
       src={p.thumb}
       alt={p.title}
       className="project-thumb"
     />
     <h3 className="project-title">{p.title}</h3>
   </Link>
 ))}
        </Masonry>
      </main>
    </Layout>
  );
}