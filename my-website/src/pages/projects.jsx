import React from "react";
import Link from "@docusaurus/Link";
import Masonry from "react-masonry-css";
import { projects } from "@site/src/data/projectList";

const bp = { default: 3, 1100: 2, 700: 1 }; // breakpoints → cols

export default function ProjectsPage() {
  return (
    <main style={{ padding: "2rem 1rem" }}>
      <h1 style={{ textAlign: "center" }}>All Projects</h1>

      <Masonry breakpointCols={bp} className="my-masonry" columnClassName="my-column">
        {projects.map(p => (
          <Link key={p.slug} href={p.slug} style={{ display: "block", marginBottom: 16 }}>
            <img
              src={p.thumb}
              alt={p.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <h3 style={{ margin: "8px 0" }}>{p.title}</h3>
          </Link>
        ))}
      </Masonry>
    </main>
  );
}