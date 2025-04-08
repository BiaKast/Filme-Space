import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const SkeletonCard = () => {
  return (
    <Card
      className="movie-card bg-gray-800 animate-pulse rounded-lg shadow-lg"
      style={{ minHeight: "400px" }}
    >
      <CardContent className="p-4 flex flex-col items-center">
        {/* Imagem */}
        <div className="w-[300px] h-[200px] bg-gray-700 rounded-lg mb-4"></div>

        {/* Título */}
        <div className="w-3/4 h-5 bg-gray-600 rounded mb-2"></div>

        {/* Estrelas */}
        <div className="w-1/2 h-4 bg-gray-600 rounded mb-2"></div>

        {/* Data de lançamento */}
        <div className="w-1/3 h-4 bg-gray-600 rounded"></div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
