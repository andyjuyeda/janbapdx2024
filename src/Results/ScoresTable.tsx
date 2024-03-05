import { useState } from "react";
import { Participant, chunkArray } from "./scoreUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function BackButton({
  setSelectedEvent,
}: {
  setSelectedEvent: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <button
      onClick={() => setSelectedEvent(null)}
      className="-ms-3 flex items-center gap-1 justify-self-start text-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
          clipRule="evenodd"
        />
      </svg>
      <span>Back</span>
    </button>
  );
}

interface ScoresTableProps {
  eventName: string;
  scores: Participant[]; // Expecting scores to be an array of Participant objects
  setSelectedEvent: React.Dispatch<React.SetStateAction<string | null>>;
}

// Accepting eventName as a prop
const ScoresTable: React.FC<ScoresTableProps> = ({
  eventName,
  scores,
  setSelectedEvent,
}) => {
  const [selectedDivision, setSelectedDivision] = useState<
    string | "all divisions"
  >("all divisions");

  const divisions = Array.from(
    new Set(scores.map((score) => score.Division))
  ).sort();
  return (
    <div className="px-2">
      <div className="sticky top-0 bg-slate-50">
        <BackButton setSelectedEvent={setSelectedEvent} />
        {/* Render your scores table here */}
        <div className="flex items-center gap-4 md:block">
          <h2 className="text-center text-2xl font-bold md:mb-2">{eventName}</h2>
          <Select value={selectedDivision} onValueChange={setSelectedDivision}>
            <SelectTrigger className="border-md flex-1 bg-slate-50">
              <SelectValue placeholder="All Divisions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"all divisions"} value={"all divisions"}>
                All Divisions
              </SelectItem>
              {divisions.map((division) => (
                <SelectItem key={division} value={division.toString()}>
                  Division {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {eventName.toLowerCase().includes("doubles") ||
        eventName.toLowerCase().includes("team") ? (
          <div className="mt-5 grid grid-cols-[0.8fr_4fr_1fr_1fr] border-b-2 text-base md:grid-cols-[1fr_4fr_2fr_1fr_1fr]">
            <span className="font-bold">Div.</span>
            <span className="font-bold">Name</span>
            <span className="hidden font-bold md:block">Games</span>
            <span className="justify-self-start font-bold">Score</span>
            <span className="justify-self-center font-bold">Total</span>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-[1fr_4fr_1fr] border-b-2 text-base md:grid-cols-[0.5fr_3fr_3fr_0.5fr]">
            <span className="font-bold">Div.</span>
            <span className="font-bold">Name</span>
            <span className="hidden font-bold md:block">Games</span>
            <span className="font-bold">Score</span>
          </div>
        )}
      </div>
      {eventName.toLowerCase().includes("doubles") ? (
        <div>
          <ul className="divide-y">
            {chunkArray(
              scores.filter(
                (score) =>
                  selectedDivision === "all divisions" ||
                  score.Division.toString() === selectedDivision
              ),
              2 // Chunk size
            ).map((pair, pairIndex) => (
              <li key={pairIndex} className="pt-[0.15rem]">
                <div className="grid grid-cols-[0.8fr_4fr_1fr_1fr] grid-rows-2 text-base md:grid-cols-[1fr_4fr_2fr_1fr_1fr]">
                  <span className="row-span-2 place-self-center justify-self-start">
                    {pair[0].Division}
                  </span>
                  <span className="col-start-2 row-start-1 text-sm font-bold">
                    {pair[0].Name}
                  </span>
                  <span className="col-start-3 row-start-1 hidden md:block">
                    {pair[0].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-1 justify-self-start">
                    {pair[0].Score.reduce((a, b) => a + b, 0)}
                  </span>

                  <span className="col-start-2 row-start-2 text-sm font-bold">
                    {pair[1].Name}
                  </span>
                  <span className="col-start-3 row-start-2 hidden md:block">
                    {pair[1].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-2 justify-self-start">
                    {pair[1].Score.reduce((a, b) => a + b, 0)}
                  </span>
                  <span className="col-start-[-2] row-span-2 self-center justify-self-center text-base font-bold">
                    {pair[0].Score.reduce((a, b) => a + b, 0) +
                      pair[1].Score.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : eventName.toLowerCase().includes("team") ? (
        <div>
          <ul className="divide-y">
            {chunkArray(
              scores.filter(
                (score) =>
                  selectedDivision === "all divisions" ||
                  score.Division.toString() === selectedDivision
              ),
              5 // Chunk size
            ).map((pair, pairIndex) => (
              <li key={pairIndex} className="pt-[0.15rem]">
                <div className="grid grid-cols-[0.8fr_4fr_1fr_1fr] grid-rows-5 text-base md:grid-cols-[1fr_4fr_2fr_1fr_1fr]">
                  <span className="row-span-5 place-self-center justify-self-start">
                    {pair[0].Division}
                  </span>
                  <span className="col-start-2 row-start-1 text-sm font-bold">
                    {pair[0].Name}
                  </span>
                  <span className="col-start-3 row-start-1 hidden md:block">
                    {pair[0].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-1 justify-self-start">
                    {pair[0].Score.reduce((a, b) => a + b, 0)}
                  </span>

                  <span className="col-start-2 row-start-2 text-sm font-bold">
                    {pair[1].Name}
                  </span>
                  <span className="col-start-3 row-start-2 hidden md:block">
                    {pair[1].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-2 justify-self-start">
                    {pair[1].Score.reduce((a, b) => a + b, 0)}
                  </span>

                  <span className="col-start-2 row-start-3 text-sm font-bold">
                    {pair[2].Name}
                  </span>
                  <span className="col-start-3 row-start-3 hidden md:block">
                    {pair[2].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-3 justify-self-start">
                    {pair[2].Score.reduce((a, b) => a + b, 0)}
                  </span>

                  <span className="col-start-2 row-start-4 text-sm font-bold">
                    {pair[3].Name}
                  </span>
                  <span className="col-start-3 row-start-4 hidden md:block">
                    {pair[3].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-4 justify-self-start">
                    {pair[3].Score.reduce((a, b) => a + b, 0)}
                  </span>

                  <span className="col-start-2 row-start-5 text-sm font-bold">
                    {pair[4].Name}
                  </span>
                  <span className="col-start-3 row-start-5 hidden md:block">
                    {pair[4].Score.join(", ")}
                  </span>
                  <span className="col-start-[-3] row-start-5 justify-self-start">
                    {pair[4].Score.reduce((a, b) => a + b, 0)}
                  </span>

                  <span className="col-start-[-2] row-span-5 self-center justify-self-center text-base font-bold">
                    {pair[0].Score.reduce((a, b) => a + b, 0) +
                      pair[1].Score.reduce((a, b) => a + b, 0) +
                      pair[2].Score.reduce((a, b) => a + b, 0) +
                      pair[3].Score.reduce((a, b) => a + b, 0) +
                      pair[4].Score.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {/* Default rendering for events that are neither doubles nor team */}
          <ul className="divide-y">
            {scores
              .filter(
                (score) =>
                  selectedDivision === "all divisions" ||
                  score.Division.toString() === selectedDivision
              )
              .map((score, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[1fr_4fr_1fr] py-[0.15rem] text-base md:grid-cols-[0.5fr_3fr_3fr_0.5fr]"
                >
                  <span>{score.Division}</span>
                  <span className="font-bold">{score.Name}</span>
                  <span className="hidden md:block">
                    {score.Score.join(", ")}
                  </span>{" "}
                  {/* Adjusted to display Score array */}
                  <span className="font-bold">{score.Score.reduce((a, b) => a + b, 0)}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ScoresTable;
