import { useState, useEffect } from "react";
import scoresJson from "@/data/janbaScores.json";
import ScoresTable from "./ScoresTable";
import { sortParticipantsByScore, Participant } from "./scoreUtils";

interface SortedScores {
  [eventName: string]: Participant[];
}

const ResultsPanel = () => {
  const [uniqueEventNames, setUniqueEventNames] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sortedScoresByEvent, setSortedScoresByEvent] = useState<SortedScores>(
    {}
  );

  useEffect(() => {
    const eventNames = new Set(scoresJson.map((item) => item.Event));
    setUniqueEventNames([...eventNames]);

    const sortedScores: SortedScores = {};
    eventNames.forEach((eventName) => {
      const participants = scoresJson.filter(
        (item) => item.Event === eventName
      );
      sortedScores[eventName] = sortParticipantsByScore(
        participants,
        eventName
      );
    });
    setSortedScoresByEvent(sortedScores);
  }, []);

  const handleEventClick = (eventName: string) => {
    setSelectedEvent(eventName);
  };

  return (
    <div className="h-full overflow-scroll">
      {selectedEvent ? (
        // If an event is selected, render the ScoresTable for that event
        <ScoresTable
          eventName={selectedEvent}
          scores={sortedScoresByEvent[selectedEvent]}
          setSelectedEvent={setSelectedEvent}
        />
      ) : (
        // If no event is selected, list all unique event names
        <div className="flex h-full flex-col">
          <h2 className="mb-10 mt-5 text-center text-2xl font-bold uppercase md:text-3xl">
            Events
          </h2>
          <div className="mb-5 flex flex-grow flex-col">
            {uniqueEventNames.map((eventName) => {
              // Check if the first participant for the event has scores
              const hasScores =
                sortedScoresByEvent[eventName] &&
                sortedScoresByEvent[eventName][0]?.Score?.length > 0;
              return hasScores ? (
                <div
                  key={eventName}
                  onClick={() => handleEventClick(eventName)}
                  className="flex flex-1 cursor-pointer flex-col items-center"
                >
                  <span className="text-xl font-bold md:text-2xl">
                    {eventName}
                  </span>
                </div>
              ) : null; // If there are no scores, don't render this event name
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Results = () => {
  return (
    <div className="mx-auto h-[800px] max-w-[800px] md:h-screen md:min-h-[900px]">
      <h1
        id="results"
        className="mt-10 text-center text-2xl font-bold uppercase text-slate-50 xl:text-5xl"
      >
        Results
      </h1>
      <div className="mt-5 h-3/4 rounded-xl bg-slate-50 px-3 pt-2 text-sm md:pt-5 lg:px-20">
        <ResultsPanel />
      </div>
    </div>
  );
};

export default Results;
