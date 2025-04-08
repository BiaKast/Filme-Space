"use client";

import React from "react";
import { useMovies } from "../context/MoviesContext";

const Timeline = () => {
  const { years, setReload, selectYear, setSelectYear, setPage } = useMovies();

  // Função para lidar com a seleção de ano ou década
  const handleYearClick = (year: number) => {
    setPage(1);
    setSelectYear(year);
    setReload(true);
  };

  // Função para renderizar os anos da timeline
  const renderYears = () => {
    return years.map((year, index) => (
      <div
        key={year}
        className={`timeline-item flex flex-col items-center relative ${index % 2 === 0 ? "mt-8" : "-mt-8"}`}
      >
        <div
          className={`year px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all transform hover:scale-110 shadow-md ${
            selectYear === year
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-white hover:bg-gray-600"
          }`}
          onClick={() => handleYearClick(year)}
        >
          {year}
        </div>
        <div className="w-2 h-6 bg-gray-400"></div>
      </div>
    ));
  };

  return (
    <div className="timeline flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-200">Linha do Tempo</h2>
      <div className="relative flex items-center">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"></div>
        <div className="flex space-x-8 px-6 relative items-center">
          <div
            onClick={() => handleYearClick(0)}
            className={`cursor-pointer py-2 px-5 rounded-full text-sm font-semibold transition-all transform hover:scale-110 shadow-md ${
              selectYear === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-400"
            }`}
          >
            Todos
          </div>
          {renderYears()}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
