import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ theme, setTheme }) => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const CURSOR_COLOR = "#FF6B00";

  useEffect(() => {
    const isMouse = window.matchMedia("(pointer: fine)").matches;
    setShowCursor(isMouse);
    if (!isMouse) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.12;
      position.current.y += (mouse.current.y - position.current.y) * 0.12;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${position.current.x - 18}px, ${position.current.y - 18}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="dark:bg-black relative min-h-screen">

      <Navbar theme={theme} setTheme={setTheme} />

      <Outlet />

      <Footer theme={theme} />

      {/* TOAST */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />

      {/* CURSOR CUSTOM TRIPLAKAY */}
      {showCursor && (
        <>
          {/* OUTLINE GLOW */}
          <div
            ref={outlineRef}
            className="fixed top-0 left-0 h-10 w-10 rounded-full pointer-events-none z-[9999]"
            style={{
              border: `2px solid ${CURSOR_COLOR}`,
              backgroundColor: "rgba(255, 107, 0, 0.08)",
              backdropFilter: "blur(4px)",
              boxShadow: `0 0 20px ${CURSOR_COLOR}40`,
              transition: "transform 0.08s linear",
            }}
          />

          {/* DOT CENTER */}
          <div
            ref={dotRef}
            className="fixed top-0 left-0 h-2.5 w-2.5 rounded-full pointer-events-none z-[9999]"
            style={{
              backgroundColor: CURSOR_COLOR,
              boxShadow: `0 0 12px ${CURSOR_COLOR}`,
              transition: "transform 0.05s linear",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Layout;