"use client";
import React, { useState } from "react";
import DmsTestTable from "@/components/DmsTestTable";
import Properties from "@/components/Properties";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [currentView, setCurrentView] = useState("dms");
  const [direction, setDirection] = useState("right");

  const views = ["dms", "properties"];
  const currentIndex = views.indexOf(currentView);
  const hasNext = currentIndex < views.length - 1;
  const hasPrev = currentIndex > 0;

  const goNext = () => {
    if (hasNext) {
      setDirection("right");
      setCurrentView(views[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    if (hasPrev) {
      setDirection("left");
      setCurrentView(views[currentIndex - 1]);
    }
  };

  const renderComponent = () => {
    switch (currentView) {
      case "dms":
        return <DmsTestTable />;
      case "properties":
        return <Properties />;
      default:
        return null;
    }
  };

  // Variants untuk animasi slide berdasarkan arah
  const variants = {
    enter: (dir) => ({
      x: dir === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 sm:p-20 pb-20 font-[family-name:var(--font-geist-sans)] relative w-full">
      {/* Tombol Panah Kiri */}
      {hasPrev && (
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition-all z-10"
          title="Sebelumnya"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}

      {/* Tombol Panah Kanan */}
      {hasNext && (
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition-all z-10"
          title="Selanjutnya"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}

      {/* Animasi Konten */}
      <main className="row-start-2 w-full max-w-6xl relative min-h-[500px]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentView}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-full h-full"
          >
            {renderComponent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
