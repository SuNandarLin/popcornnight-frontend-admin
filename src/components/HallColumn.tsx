"use client";

import { Hall, Showtime } from "@/types/types";

type Props = {
  hall: Hall;
  onAddShowtime: () => void;
  onRemoveShowtime: (hallId: number, showtimeId: number) => void;
};

export default function HallColumn({
  hall,
  onAddShowtime,
  onRemoveShowtime,
}: Props) {
  return (
    <div className="w-64 bg-zinc-900 border border-zinc-700 rounded p-3">
      <h3 className="text-sm font-semibold text-indigo-300 mb-3">
        Hall {hall.hallNumber}
      </h3>

      {hall.showTimes.map((showtime) => (
        <ShowtimeCard
          key={showtime.id}
          showtime={showtime}
          onRemove={() => onRemoveShowtime(hall.id, showtime.id!)}
        />
      ))}

      <button
        onClick={onAddShowtime}
        className="mt-2 w-full py-2 rounded border border-dashed border-indigo-500 text-indigo-400 hover:bg-zinc-800 transition"
      >
        ＋ Add Showtime
      </button>
    </div>
  );
}

function ShowtimeCard({
  showtime,
  onRemove,
}: {
  showtime: Showtime;
  onRemove: () => void;
}) {
  return (
    <div className="bg-zinc-800 text-gray-100 px-3 py-2 mb-2 rounded border border-zinc-700 hover:bg-zinc-700 flex items-center gap-3 justify-between">
      {/* Poster + Info */}
      <div className="flex items-center gap-3">
        {showtime.movie?.imageUrl ? (
          <img
            src={showtime.movie.imageUrl}
            alt={showtime.movie.title}
            className="w-10 h-14 object-cover rounded"
          />
        ) : (
          <div className="w-10 h-14 bg-zinc-700 rounded flex items-center justify-center text-sm text-zinc-400">
            🎬
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-semibold text-sm truncate">
            {showtime.movie?.title || (
              <span className="italic text-zinc-400">Unassigned</span>
            )}
          </div>
          <div className="text-xs text-gray-400">{showtime.timeslot}</div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-600 text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
}

// "use client";

// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   SortableContext,
//   useSortable,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import { useState } from "react";
// import { Hall, Showtime } from "@/types/types";

// type Props = {
//   hall: Hall;
//   onAddShowtime: () => void;
// };

// export default function HallColumn({ hall, onAddShowtime }: Props) {
//   const items = hall.showTimes;

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     const oldIndex = items.findIndex((s) => s.id === active.id);
//     const newIndex = items.findIndex((s) => s.id === over.id);
//     // setItems(arrayMove(items, oldIndex, newIndex));
//   };

//   return (
//     <div className="w-64 bg-zinc-900 border border-zinc-700 rounded p-3">
//       <h3 className="text-sm font-semibold text-indigo-300 mb-3">
//         Hall {hall.hallNumber}
//       </h3>

//       {items && (
//         <DndContext
//           collisionDetection={closestCenter}
//           modifiers={[restrictToVerticalAxis]}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={items.map((s) => s.id ?? 0)}
//             strategy={verticalListSortingStrategy}
//           >
//             {items.map((showtime) => (
//               <SortableShowtimeCard key={showtime.id} showtime={showtime} />
//             ))}
//           </SortableContext>
//         </DndContext>
//       )}

//       {/* + Add card */}
//       <button
//         onClick={onAddShowtime}
//         className="mt-2 w-full py-2 rounded border border-dashed border-indigo-500 text-indigo-400 hover:bg-zinc-800 transition"
//       >
//         ＋ Add Showtime
//       </button>
//     </div>
//   );
// }

// // ─── Sortable Showtime Card ───────────────────────────────────────

// function SortableShowtimeCard({ showtime }: { showtime: Showtime }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({
//       id: showtime.id ?? 0,
//     });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       {...attributes}
//       {...listeners}
//       style={style}
//       className="bg-zinc-800 text-gray-100 px-3 py-2 mb-2 rounded cursor-move border border-zinc-700 hover:bg-zinc-700 flex items-center gap-3"
//     >
//       {/* Poster */}
//       {showtime.movie?.imageUrl ? (
//         <img
//           src={showtime.movie.imageUrl}
//           alt={showtime.movie.title}
//           className="w-10 h-14 object-cover rounded"
//         />
//       ) : (
//         <div className="w-10 h-14 bg-zinc-700 rounded flex items-center justify-center text-sm text-zinc-400">
//           🎬
//         </div>
//       )}

//       {/* Text */}
//       <div className="flex flex-col">
//         <div className="font-semibold text-sm truncate">
//           {showtime.movie?.title || (
//             <span className="italic text-zinc-400">Unassigned</span>
//           )}
//         </div>
//         <div className="text-xs text-gray-400">{showtime.timeslot}</div>
//       </div>
//     </div>
//   );
// }
