import { Routes, Route } from "react-router";
import Home from "./routes/index";
import About from "./routes/about";
import Careers from "./routes/careers";
import Services from "./routes/services";
import Projects from "./routes/projects";

import Blog from "./routes/blog";
import Contact from "./routes/contact";
import NotFound from "./routes/not-found";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />

      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
