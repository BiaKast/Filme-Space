"use client";

import { useState } from "react";
import { MovieVideos } from "@/app/types/typeMovieImages";
import ReactPlayer from "react-player";
import { Dialog } from "@headlessui/react";
import { Card, CardContent } from "@/components/ui/card";
import SkeletonCard from "./SkeletonCard";
import { PlayCircle, VideoOff } from "lucide-react";

export function Player({ videos }: { videos: MovieVideos }) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const hasVideos = videos.results && videos.results.length > 0;

  return (
    <div className="relative mt-6 flex flex-col gap-6 items-center">
      {/* Seção de Vídeos */}
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-lg shadow-xl p-6 rounded-2xl w-full max-w-6xl border border-gray-700/50">
        <CardContent>
          <h2 className="text-3xl font-bold text-cyan-400 uppercase text-center glow">
            Destaques em Vídeo
          </h2>
          <p className="text-gray-300 mt-2 text-center">
            Explore os trailers e cenas deste filme.
          </p>

          {!hasVideos ? (
            <div className="flex flex-col justify-center items-center mt-6 text-gray-400 gap-4">
              <VideoOff className="w-16 h-16" />
              <span className="text-lg">Nenhum vídeo encontrado</span>
            </div>
          ) : (
            <>
              {!loaded && <SkeletonCard />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {videos.results.map((video) => (
                  <div
                    key={video.id}
                    className="relative w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedVideo(video.key)}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      alt={video.name}
                      onLoad={() => setLoaded(true)}
                      loading="lazy"
                      className="rounded-xl shadow-lg border border-gray-700/50 w-full h-auto object-cover"
                      style={{ opacity: loaded ? 1 : 0 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                      <PlayCircle className="text-white w-16 h-16 opacity-80" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Modal do Player */}
      <Dialog
        open={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
      >
        <Dialog.Panel className="relative bg-black/90 p-4 rounded-2xl shadow-2xl w-[90%] max-w-4xl h-[60%] border border-gray-700/50">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-3 right-3 text-white text-xl hover:text-red-400 transition"
          >
            ✖
          </button>
          {selectedVideo && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${selectedVideo}`}
              controls
              width="100%"
              height="100%"
            />
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
