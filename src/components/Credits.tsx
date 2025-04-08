import { MovieCredits } from "@/types/typeMovie";
import { Card } from "./ui/card";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Credits({ artists }: { artists: MovieCredits }) {
  const { cast } = artists;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  let scrollInterval: NodeJS.Timeout | null = null;

  const startScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -20 : 20;
      scrollInterval = setInterval(() => {
        scrollContainerRef.current?.scrollBy({ left: scrollAmount });
      }, 16);
    }
  };

  const stopScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      scrollInterval = null;
    }
  };

  return (
    <div className="mt-10 relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-xl rounded-2xl overflow-hidden border border-gray-700/50">
      <p className="text-white text-2xl font-bold text-center py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 uppercase tracking-wide">
        Elenco Principal
      </p>

      <button
        onMouseDown={() => startScroll("left")}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full shadow-lg z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hidden flex space-x-6 p-6"
      >
        {cast?.map((artist) => (
          <Card
            key={artist.id}
            className="flex flex-col items-center bg-gray-800 shadow-md rounded-xl overflow-hidden min-w-[220px] max-w-[240px] transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-700/50"
          >
            <div className="w-24 h-24 mt-4 rounded-full bg-gray-700 overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={
                  artist.profile_path
                    ? `https://image.tmdb.org/t/p/w500${artist.profile_path}`
                    : "/placeholder-profile.png"
                }
                alt={artist.name || "Imagem do artista"}
              />
            </div>

            <div className="p-4 text-center text-white">
              <h1
                className="font-bold text-lg truncate w-full"
                title={artist.name}
              >
                {artist.name}
              </h1>
              <p className="text-sm text-gray-400">
                <strong>Departamento:</strong> {artist.known_for_department}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Popularidade:</strong> {artist.popularity.toFixed(1)}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Personagem:</strong> {artist.character}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <button
        onMouseDown={() => startScroll("right")}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-full shadow-lg z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
