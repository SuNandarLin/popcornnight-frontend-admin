"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// Dummy halls
const initialHalls = [
  {
    id: "hall1",
    name: "Hall 1",
    showtimes: [
      { id: "st1", movieTitle: "Movie A" },
      { id: "st2", movieTitle: "Movie B" },
    ],
  },
  {
    id: "hall2",
    name: "Hall 2",
    showtimes: [
      { id: "st3", movieTitle: "" },
      { id: "st4", movieTitle: "" },
    ],
  },
];

export default function AssignPage() {
  const [halls, setHalls] = useState(initialHalls);

  const handleDragEnd = (event: any, hallId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setHalls((prev) =>
      prev.map((hall) => {
        if (hall.id !== hallId) return hall;

        const oldIndex = hall.showtimes.findIndex((s) => s.id === active.id);
        const newIndex = hall.showtimes.findIndex((s) => s.id === over.id);

        return {
          ...hall,
          showtimes: arrayMove(hall.showtimes, oldIndex, newIndex),
        };
      })
    );
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
      {halls.map((hall) => (
        <div
          key={hall.id}
          className="bg-zinc-900 p-4 rounded shadow border border-zinc-700"
        >
          <h2 className="text-indigo-400 font-bold mb-4">{hall.name}</h2>

          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={(e) => handleDragEnd(e, hall.id)}
          >
            <SortableContext
              items={hall.showtimes.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              {hall.showtimes.map((slot) => (
                <SortableShowtimeCard key={slot.id} showtime={slot} />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
}

function SortableShowtimeCard({
  showtime,
}: {
  showtime: { id: string; movieTitle?: string };
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: showtime.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-zinc-800 text-gray-100 px-4 py-2 mb-2 rounded cursor-move border border-zinc-700 hover:bg-zinc-700"
    >
      {showtime.movieTitle || (
        <span className="text-zinc-500 italic">Unassigned</span>
      )}
    </div>
  );
}
