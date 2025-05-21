"use client";

import React, { useState } from "react";
import { createMovie } from "@/api/movie";

type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  imageUrl: string;
};

type MovieFormProps = {
  onAdd: (movie: Movie) => void;
  onCancel: () => void;
  nextId: number;
};

const MovieForm: React.FC<MovieFormProps> = ({ onAdd, onCancel, nextId }) => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    releaseDate: "",
    duration: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Temporary use of preview URL as imageUrl
      setNewMovie((prev) => ({
        ...prev,
        imageUrl: previewUrl,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const created = await createMovie({
        title: newMovie.title,
        description: newMovie.description,
        duration: parseInt(newMovie.duration),
        releaseDate: new Date(newMovie.releaseDate).toISOString(),
      });

      onAdd(created);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      setNewMovie({
        title: "",
        description: "",
        releaseDate: "",
        duration: "",
        imageUrl: "",
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Failed to create movie:", err);
      // optionally show toast or error UI
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-6 bg-zinc-900 p-6 rounded-lg shadow-md space-y-4 text-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Upload - Left */}
        <div className="flex justify-center md:block">
          <label
            htmlFor="imageUpload"
            className="group relative w-40 h-60 border-2 border-dashed border-zinc-700 rounded-md cursor-pointer flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 transition overflow-hidden"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-zinc-500 text-4xl group-hover:scale-110 transition-transform">
                ＋
              </span>
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* Form Inputs - Right */}
        <div className="flex-1 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) =>
              setNewMovie({ ...newMovie, title: e.target.value })
            }
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) =>
              setNewMovie({ ...newMovie, description: e.target.value })
            }
            className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="flex gap-4">
            <input
              type="date"
              value={newMovie.releaseDate}
              onChange={(e) =>
                setNewMovie({ ...newMovie, releaseDate: e.target.value })
              }
              className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={newMovie.duration}
              onChange={(e) =>
                setNewMovie({ ...newMovie, duration: e.target.value })
              }
              className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          {success && (
            <p className="text-green-400 text-sm">
              ✅ Movie created successfully!
            </p>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              Add Movie
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
