import React from "react";

import { api } from "../../trpc/react";
import RsvpCard from "./RsvpCard";

function RsvpCardGrid() {
  const { data, isLoading, isError, refetch } = api.rsvps.getUserGuests.useQuery();

  if (isLoading) {
    return (
      <div className="relative mb-10 flex h-[30lvh] w-full items-center justify-center px-10 py-12 text-center">
        <div className="flex items-center gap-3 text-sm text-neutral-200">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading guest list…
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <p className="text-lg font-medium text-white">We couldn’t load your invitation.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
        >
          Try again
        </button>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-12 text-center">
        <p className="text-lg font-medium text-white">No guests are linked to this invitation yet.</p>
        <p className="text-sm text-neutral-300">This demo invitation is fictional and ready for RSVP testing.</p>
      </div>
    );
  }

  return (
    <div className="relative z-[40] grid w-full grid-cols-1 items-center justify-center gap-8 overflow-hidden px-4 pb-20 pt-5 md:grid-cols-2">
      {data.map((guest) => (
        <RsvpCard key={guest.id} guest={guest} />
      ))}
    </div>
  );
}

export default RsvpCardGrid;
