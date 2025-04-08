import { MovieImages } from "@/app/types/typeMovieImages";
import { useEffect, useState } from "react";
import SkeletonCard from "@/components/SkeletonCard";

const visualArtifacts: Array<keyof MovieImages> = [
  "backdrops",
  "posters",
  "logos",
];

export default function Pictures({ images }: { images: MovieImages }) {
  const [statusVisualArtifacts, setVisualArtifacts] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleSortName = (event: React.MouseEvent<HTMLButtonElement>) => {
    setVisualArtifacts(Number((event.target as HTMLButtonElement).id));
    setLoaded(false);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [statusVisualArtifacts]);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  const selectedImages =
    images && visualArtifacts[statusVisualArtifacts] in images
      ? (images[visualArtifacts[statusVisualArtifacts]] ?? [])
      : [];

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold text-purple-500 uppercase">
          Artefatos Visuais
        </h2>
        <p className="text-gray-300 mt-2">
          Explore os cenários, cartazes e logotipos deste filme.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-lg h-12 bg-gray-800 rounded-full flex items-center px-2 shadow-lg hover:bg-gray-700 transition duration-300">
          <div
            className={`absolute w-1/3 h-10 bg-purple-500 opacity-55 rounded-full transition-all duration-300 shadow-md ${
              statusVisualArtifacts === 0
                ? "left-0"
                : statusVisualArtifacts === 1
                  ? "left-1/3"
                  : "left-2/3"
            }`}
          />
          <div className="flex w-full justify-around text-white font-semibold">
            <button
              className={`flex items-center justify-center w-32 py-2 rounded-lg transition ${
                statusVisualArtifacts === 0
                  ? "text-cyan-400 font-bold"
                  : "text-white"
              }`}
              id="0"
              onClick={toggleSortName}
            >
              Cenários
            </button>
            <button
              className={`flex items-center justify-center w-32 py-2 rounded-lg transition ${
                statusVisualArtifacts === 1
                  ? "text-cyan-400 font-bold"
                  : "text-white"
              }`}
              id="1"
              onClick={toggleSortName}
            >
              Cartazes
            </button>
            <button
              className={`flex items-center justify-center w-32 py-2 rounded-lg transition ${
                statusVisualArtifacts === 2
                  ? "text-cyan-400 font-bold"
                  : "text-white"
              }`}
              id="2"
              onClick={toggleSortName}
            >
              Logotipos
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {selectedImages.length > 0 ? (
              selectedImages.map(
                (image: { file_path: string }, index: number) => (
                  <div key={index} className="flex-shrink-0 w-full px-4">
                    {!loaded && <SkeletonCard />}
                    <img
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      alt={`Artefato visual ${index}`}
                      className="rounded-lg shadow-md object-contain w-full h-auto max-h-[300px] mx-auto transition duration-300 hover:scale-105 cursor-pointer"
                      onClick={() =>
                        openModal(
                          `https://image.tmdb.org/t/p/original${image.file_path}`,
                        )
                      }
                      onLoad={() => setLoaded(true)}
                      style={{ opacity: loaded ? 1 : 0 }}
                    />
                  </div>
                ),
              )
            ) : (
              <div className="w-full text-center py-10 flex flex-col items-center gap-2">
                <div className="text-6xl">📷🤷‍♂️</div>
                <p className="text-gray-400">
                  Nenhuma imagem disponível nesta categoria.
                </p>
              </div>
            )}
          </div>

          {selectedImages.length > 1 && !modalOpen && (
            <>
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === 0 ? selectedImages.length - 1 : prev - 1,
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-80 transition"
              >
                ◀
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev === selectedImages.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-3 rounded-full text-white hover:bg-opacity-80 transition"
              >
                ▶
              </button>
            </>
          )}
        </div>
      </div>

      {modalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] flex justify-center items-center">
            <img
              src={selectedImage}
              alt="Imagem expandida"
              className="object-contain max-h-[80vh] rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
