import React, {
  FunctionComponent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { api } from "../../trpc/react";
import Button from "./Button";

type MealChoice =
  | "BEEF_FILLET"
  | "PRAWN_LINGUINE"
  | "VEGETARIAN"
  | "KIDS_MEAL";

type RsvpStatus = "PENDING" | "ATTENDING" | "DECLINED";

interface Guest {
  id: string;
  name: string;
  rsvpStatus: string;
  mealChoice: string | null;
  dietaryRequirements: string | null;
}

const options = [
  { value: "ATTENDING", label: "Yes" },
  { value: "DECLINED", label: "No" },
];

const mains = [
  { value: "BEEF_FILLET", label: "Beef Fillet" },
  { value: "PRAWN_LINGUINE", label: "Prawn Linguine" },
  { value: "VEGETARIAN", label: "Vegetarian" },
  { value: "KIDS_MEAL", label: "Kids Meal" },
];

const RsvpCard: FunctionComponent<{ guest: Guest }> = ({ guest }) => {
  const [attendingOption, setAttendingOption] = useState<RsvpStatus>(
    (guest.rsvpStatus as RsvpStatus) ?? "PENDING",
  );
  const [mealChoice, setMealChoice] = useState<MealChoice | "">(
    (guest.mealChoice as MealChoice | null) ?? "",
  );
  const [dietChoice, setDietChoice] = useState(guest.dietaryRequirements ?? "");
  const utils = api.useContext();

  const { mutate, isLoading: isSaving } = api.rsvps.updateGuest.useMutation({
    onSuccess: async () => {
      await utils.rsvps.getUserGuests.invalidate();
      toast.success("RSVP saved successfully.");
    },
    onError: (error) => {
      const message =
        error.data?.zodError?.fieldErrors?.mealChoice?.[0] ??
        error.message ??
        "Failed to save RSVP. Please try again.";
      toast.error(message);
    },
  });

  const layer = useRef<HTMLDivElement | null>(null);
  const card = useRef<HTMLDivElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(container.current, { perspective: 500 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top+=100px bottom",
          end: "bottom+=50px bottom",
          scrub: 1,
        },
      });

      tl.fromTo(
        card.current,
        {
          translateZ: -200,
          rotateX: -90,
          opacity: 0,
        },
        {
          transform: "translate(0px, 0px)",
          opacity: 1,
          translateZ: 0,
          rotateX: 0,
          transformOrigin: "50% 0",
        },
      );

      gsap.to(layer.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top-=50px bottom",
          end: "bottom-=100px bottom",
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const hasChanged =
    guest.rsvpStatus !== attendingOption ||
    guest.mealChoice !== mealChoice ||
    (guest.dietaryRequirements ?? "") !== dietChoice;

  const submit = () => {
    const safeMealChoice =
      attendingOption === "ATTENDING" && mealChoice ? mealChoice : null;
    const trimmedDiet = dietChoice.trim();
    const safeDiet =
      attendingOption === "ATTENDING"
        ? trimmedDiet
          ? trimmedDiet
          : null
        : null;

    mutate({
      guestId: guest.id,
      rsvpStatus: attendingOption,
      mealChoice: safeMealChoice,
      dietaryRequirements: safeDiet,
    });
  };

  return (
    <div ref={container}>
      <div
        ref={card}
        className="flex flex-col gap-8 rounded-3xl border border-neutral-800 bg-[#1A1A1A] bg-center bg-repeat px-5 py-10 shadow-[10px_10px_10px_rgba(0,0,0,0.3),0_10px_10px_rgba(0,0,0,0.3)] md:p-10 md:shadow-[10px_10px_20px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.4)]"
      >
        <div
          ref={layer}
          style={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 z-[40] bg-[#1A1A1A] opacity-0"
        ></div>
        <h2 className="lg:text-4rem mb-10 font-violentica text-5xl">
          {guest.name}
        </h2>

        <label className="text-sm font-extralight lg:text-base" htmlFor={`attendance-${guest.id}`}>
          Will you be joining us?
        </label>
        <div className="relative -mt-6">
          <select
            id={`attendance-${guest.id}`}
            disabled={isSaving}
            value={attendingOption}
            onChange={(event) => setAttendingOption(event.target.value as RsvpStatus)}
            className="block w-full cursor-pointer appearance-none rounded border border-gray-400 bg-neutral-300 px-4 py-1 pr-8 text-xs leading-tight text-gray-700 focus:border-gray-500 focus:bg-neutral-300 focus:outline-none lg:text-base"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} className="cursor-pointer text-xs lg:text-base">
                {option.label}
              </option>
            ))}
          </select>
        </div>

          <label className="text-base font-extralight lg:text-base" htmlFor={`meal-${guest.id}`}>
          Select a main
        </label>
        <div className="relative -mt-6">
          <select
            id={`meal-${guest.id}`}
            disabled={isSaving || attendingOption !== "ATTENDING"}
            value={mealChoice}
            onChange={(event) => setMealChoice(event.target.value as MealChoice)}
            className="block w-full cursor-pointer appearance-none rounded border border-gray-400 bg-neutral-300 px-4 py-1 pr-8 text-xs leading-tight text-gray-700 focus:border-gray-500 focus:bg-neutral-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 lg:text-base"
          >
            <option value="">Select a meal</option>
            {mains.map((option) => (
              <option key={option.value} value={option.value} className="cursor-pointer text-xs lg:text-base">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <label className="text-base font-extralight lg:text-base" htmlFor={`diet-${guest.id}`}>
          Any dietary requirements or allergies?
        </label>
        <textarea
          id={`diet-${guest.id}`}
          disabled={isSaving || attendingOption !== "ATTENDING"}
          className="-mt-6 rounded-md bg-neutral-300 p-2 text-base text-black outline-none disabled:cursor-not-allowed disabled:opacity-60 lg:text-base"
          value={dietChoice}
          onChange={(event) => setDietChoice(event.target.value)}
        />

        <Button
          buttonColor="#000000"
          textColor="#ffffff"
          backgroundColor="rgb(37 99 235)"
          onClick={hasChanged ? submit : () => undefined}
          aria-label={`Save RSVP for ${guest.name}`}
        >
          {isSaving ? "Saving…" : "Save RSVP"}
        </Button>
      </div>
    </div>
  );
};

export default RsvpCard;
