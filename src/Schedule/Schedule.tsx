import React, { useState, useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import "./schedule.module.css";
import janbaScores from "@/data/janbaScores.json";
import eventSchedule from "./UpdatedEventSchedule.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import schedulePdf from "@/assets/doc/janba-schedule-min.pdf";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

function BackButton({
  setShowEventDetails,
}: {
  setShowEventDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setShowEventDetails(false)}
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

interface EventDetailsProps {
  gender: string | null;
  event: string;
  divisions: string;
  time: string;
  setShowEventDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventDetails({
  gender,
  event,
  divisions,
  time,
  setShowEventDetails,
}: EventDetailsProps) {
  function EventDetailsHeader() {
    return (
      <>
        <div className="sticky top-0 mb-2 w-full bg-slate-50 px-6 pt-2 md:pt-5">
          <div className="flex justify-between">
            <BackButton setShowEventDetails={setShowEventDetails} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10 bg-slate-50">
                <DropdownMenuItem className="">
                  <a
                    href={schedulePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 text-lg font-bold"
                  >
                    <span>Download Full Schedule</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className="text-xl font-bold text-dark-blue">{`${
            gender ? gender : ""
          } ${event}`}</span>
          <p>
            {divisions.includes("and")
              ? `Divisions ${divisions}`
              : `Division ${divisions}`}
          </p>
          <p>{time}</p>
          <div className="mt-4 grid grid-cols-[1fr_4fr_1fr_1fr] border-b-2 border-dark-blue font-semibold">
            <span className="place-self-start">Ln.</span>
            <span className="place-self-start font-bold">Name</span>
            <span>Avg.</span>
            <span className="place-self-end">Div.</span>
          </div>
        </div>
      </>
    );
  }

  const divisionNumbers = divisions.includes("and")
    ? divisions.split(" and ").map(Number) // For "2 and 3" => [2, 3]
    : [Number(divisions)]; // For "1" => [1]

  const isDoubles = event.toLowerCase().includes("doubles");
  const isTeam = event.toLowerCase().includes("team");

  const renderBowlers = () => {
    const filteredBowlers = janbaScores.filter((bowler) => {
      const eventCheck = gender ? `${gender} ${event}` : event;
      return (
        bowler.Event === eventCheck && divisionNumbers.includes(bowler.Division)
      );
    });

    if (isDoubles) {
      // Render for doubles
      // Group bowlers and render with a shared attribute
      return renderDoublesBowlers(filteredBowlers);
    } else if (isTeam) {
      // Render for team events
      // Implement grouping and rendering for teams
      return renderTeamBowlers(filteredBowlers);
    } else {
      // Render for singles or any other types
      return renderSinglesBowlers(filteredBowlers);
    }
  };

  interface Bowler {
    _id: string;
    Lane: number;
    Name: string;
    Average: number;
    Division: number;
  }

  const renderSinglesBowlers = (bowlers: Bowler[]) =>
    bowlers.map((bowler) => (
      <div key={bowler._id} className="mb-1 space-y-1">
        <div className="grid grid-cols-[1fr_4fr_1fr_1fr] px-6">
          <span className="place-self-start">{bowler.Lane}</span>
          <span className="place-self-start font-bold">{bowler.Name}</span>
          <span>{bowler.Average}</span>
          <span className="place-self-end">{bowler.Division}</span>
        </div>
        <Separator className="mx-6 w-auto bg-slate-200" />
      </div>
    ));

  const renderDoublesBowlers = (bowlers: Bowler[]) => {
    const pairs = [];
    for (let i = 0; i < bowlers.length; i += 2) {
      pairs.push(
        <div key={i} className="mt-1">
          <div className="grid grid-cols-[1fr_4fr_1fr_1fr] grid-rows-2 gap-y-0 px-6 pt-0">
            <span className="row-span-2 place-self-center justify-self-start">
              {bowlers[i].Lane}
            </span>
            <span className="col-start-2 place-self-center justify-self-start font-bold">
              {bowlers[i].Name}
            </span>
            <span className="col-start-2 row-start-2 place-self-center justify-self-start font-bold">
              {bowlers[i + 1].Name}
            </span>
            <span className="col-start-3 row-start-1">
              {bowlers[i].Average}
            </span>
            <span className="col-start-3 row-start-2">
              {bowlers[i + 1].Average}
            </span>
            <span className="row-span-2 place-self-center justify-self-end">
              {bowlers[i].Division}
            </span>
          </div>
          <Separator className="mx-6 mt-1 w-auto bg-slate-200" />
        </div>
      );
    }
    return pairs;
  };

  const renderTeamBowlers = (bowlers: Bowler[]) => {
    const teams = [];
    for (let i = 0; i < bowlers.length; i += 5) {
      teams.push(
        <div key={i} className="mt-1">
          <div className="grid grid-cols-[1fr_4fr_1fr_1fr] grid-rows-5 gap-y-0 px-6 pt-0">
            <span className="row-span-5 place-self-center justify-self-start">
              {bowlers[i].Lane}
            </span>
            <span className="col-start-2 place-self-center justify-self-start font-bold">
              {bowlers[i].Name}
            </span>
            <span className="col-start-2 row-start-2 place-self-center justify-self-start font-bold">
              {bowlers[i + 1].Name}
            </span>
            <span className="col-start-2 row-start-3 place-self-center justify-self-start font-bold">
              {bowlers[i + 2].Name}
            </span>
            <span className="col-start-2 row-start-4 place-self-center justify-self-start font-bold">
              {bowlers[i + 3].Name}
            </span>
            <span className="col-start-2 row-start-5 place-self-center justify-self-start font-bold">
              {bowlers[i + 4].Name}
            </span>
            <span className="col-start-3 row-start-1">
              {bowlers[i].Average}
            </span>
            <span className="col-start-3 row-start-2">
              {bowlers[i + 1].Average}
            </span>
            <span className="col-start-3 row-start-3">
              {bowlers[i + 2].Average}
            </span>
            <span className="col-start-3 row-start-4">
              {bowlers[i + 3].Average}
            </span>
            <span className="col-start-3 row-start-5">
              {bowlers[i + 4].Average}
            </span>
            <span className="row-span-5 place-self-center justify-self-end">
              {bowlers[i].Division}
            </span>
          </div>
          <Separator className="mx-6 mt-1 w-auto bg-slate-200" />
        </div>
      );
    }
    return teams;
  };

  return (
    <div className="pb-2 text-center">
      <EventDetailsHeader />
      {renderBowlers()}
    </div>
  );
}

interface ScheduleTabsProps {
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
}

function ScheduleTabs({ setCurrentDay }: ScheduleTabsProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TabsList className="row-start-7 flex self-end shadow">
      {eventSchedule.days.map((day) => (
        <TabsTrigger
          value={day.name}
          key={`${day.name}trigger`}
          className={`flex-1 ${isSmallScreen ? "" : "capitalize"}`}
          onClick={() => setCurrentDay(day.name)} // Update the state when clicked
        >
          {isSmallScreen ? day.abbrev : day.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

interface ScheduleTabsContentProps {
  setShowEventDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedEvent: React.Dispatch<
    React.SetStateAction<EventDetailsProps | null>
  >;
}

function ScheduleTabsContent({
  setShowEventDetails,
  setSelectedEvent,
  toggleSearchPanel,
}: ScheduleTabsContentProps & {
  toggleSearchPanel: (direction: "fromRight" | "fromLeft") => void;
}) {
  const renderDivisions = (divisions: string[] | null) => {
    if (divisions === null || divisions.length === 0) {
      return null;
    }

    if (divisions.length === 1) {
      return <p className="text-sm">Division {divisions[0]}</p>;
    }

    return (
      <p className="text-sm">
        Divisions {divisions[0]} and {divisions[1]}
      </p>
    );
  };

  return (
    <>
      {eventSchedule.days.map((day) => (
        <TabsContent
          value={day.name}
          key={`${day.name}content`}
          className="row-span-5 row-start-1 px-4"
        >
          <div className="mb-8 grid grid-cols-2 md:grid-cols-3 md:py-5">
            <h2 className="text-3xl font-bold uppercase md:col-start-2 md:place-self-center md:text-3xl">
              {day.name}
            </h2>

            <button
              onClick={() => toggleSearchPanel("fromRight")}
              className="col-start-2 flex items-center gap-1 justify-self-end md:col-start-3"
            >
              <span className="text-base"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>

          {day.agenda.map((event, index) => (
            <React.Fragment key={event.key}>
              <div className="my-1 grid grid-cols-3 items-center">
                {/* CHANGE HIDDEN TO GRID WHEN READY */}

                <span>{event.time}</span>
                <div className="col-start-2 col-end-4 row-start-1 md:col-end-3 md:justify-self-center md:text-center">
                  {event.event === "Lane Oiling" ? (
                    <span className="text-center text-sm">{event.event}</span>
                  ) : (
                    <span
                      className="cursor-pointer text-center text-base font-bold"
                      onClick={
                        event.divisions !== null
                          ? () => {
                              setShowEventDetails(true);
                              setSelectedEvent({
                                gender: event.gender,
                                event: event.event,
                                divisions: event.divisions
                                  ? event.divisions.join(" and ")
                                  : "N/A",
                                time: event.time,
                                setShowEventDetails: setShowEventDetails,
                              });
                            }
                          : undefined
                      }
                    >
                      {event.gender !== null
                        ? `${event.gender} ${event.event}`
                        : event.event}
                    </span>
                  )}

                  {renderDivisions(event.divisions)}
                </div>
                {event.divisions !== null && (
                  <button
                    className="col-start-3 row-start-1 w-max justify-self-end"
                    onClick={() => {
                      setShowEventDetails(true);
                      setSelectedEvent({
                        gender: event.gender,
                        event: event.event,
                        divisions: event.divisions
                          ? event.divisions.join(" and ")
                          : "N/A",
                        time: event.time,
                        setShowEventDetails: setShowEventDetails,
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {index < day.agenda.length - 1 && (
                <Separator className="bg-slate-300" />
              )}
            </React.Fragment>
          ))}
        </TabsContent>
      ))}
    </>
  );
}

export default function Schedule() {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [currentDay, setCurrentDay] = useState("sunday");
  const [selectedEvent, setSelectedEvent] = useState<EventDetailsProps | null>(
    null
  );
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState("fromRight");

  const variantsFromLeft = {
    enter: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.2, delay: 0 },
    },
    center: { x: "0%", opacity: 1, transition: { duration: 0.2 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
  };

  const variantsFromRight = {
    enter: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.2, delay: 0 },
    },
    center: { x: "0%", opacity: 1, transition: { duration: 0.2 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
  };

  const toggleSearchPanel = (direction: "fromRight" | "fromLeft") => {
    setShowSearchPanel((prevShow) => !prevShow);
    setAnimationDirection(direction);
  };

  interface Bowler {
    Lane: number;
    Name: string;
    Average: number;
    Division: number;
    Score: number[];
    Event: string;
    _id: string;
  }

  const bowlers: Bowler[] = janbaScores as Bowler[];

  const uniqueNames: string[] = Array.from(
    new Set(bowlers.map((bowler) => bowler.Name))
  );

  const sortedUniqueNames = useMemo(() => uniqueNames.sort(), [uniqueNames]);

  const handleNameClick = (name: string) => {
    setSelectedName(name);
  };

  interface BowlerSchedule {
    event: string;
    division: number;
    lane: number;
    day: string;
    time: string;
    average: number;
  }

  const buildIndividualSchedule = (
    individualName: string | null
  ): BowlerSchedule[] => {
    if (!individualName) return [];

    return bowlers
      .filter((bowler) => bowler.Name === individualName)
      .map((bowler) => {
        let dayOfEvent = "";
        let timeOfEvent = "Time not found";

        for (const day of eventSchedule.days) {
          const matchingEvent = day.agenda.find((agendaItem) => {
            // Adjust eventName construction to account for null gender
            const eventName = agendaItem.gender
              ? `${agendaItem.gender} ${agendaItem.event}`
              : agendaItem.event;

            // Now eventName will either be "Men's EventName", "Women's EventName", or just "EventName" if gender is null
            return (
              eventName === bowler.Event &&
              (agendaItem.divisions === null ||
                agendaItem.divisions.includes(bowler.Division.toString()))
            );
          });

          if (matchingEvent) {
            dayOfEvent = day.name;
            timeOfEvent = matchingEvent.time;
            break;
          }
        }

        return {
          event: bowler.Event,
          division: bowler.Division,
          lane: bowler.Lane,
          average: bowler.Average,
          day: dayOfEvent,
          time: timeOfEvent,
        };
      });
  };

  interface BowlerScheduleProps {
    selectedName: string | null;
  }

  const BowlerSchedule: React.FC<BowlerScheduleProps> = ({ selectedName }) => {
    const individualSchedule = useMemo(
      () => buildIndividualSchedule(selectedName),
      [selectedName]
    );

    // Ensure individualSchedule is always an array with the correct structure
    return (
      <div>
        <h1 className="mt-3 text-center text-2xl font-bold uppercase md:mt-5">
          {selectedName}
        </h1>
        <h2 className="text-center text-lg font-bold uppercase">
          Average - {individualSchedule[0].average}
        </h2>
        <div className="pt-5">
          {individualSchedule.length > 0 ? (
            individualSchedule.map((event, index) => (
              <React.Fragment key={index}>
                <div className="my-2 grid grid-cols-2 grid-rows-3 gap-x-10">
                  <div className="col-start-1 row-span-3 row-start-1 self-center justify-self-end">
                    <h2 className="text-xl font-semibold uppercase">
                      {event.day}
                    </h2>
                    <p className="text-right">{event.time}</p>
                  </div>
                  <div className="col-start-2 row-start-1">
                    <span>{event.event}</span>
                  </div>
                  <div className="col-start-2 row-start-2">
                    <span>Division {event.division}</span>
                  </div>
                  <div className="col-start-2 row-start-3">
                    <span>
                      Lane <span className="font-bold">{event.lane}</span>
                    </span>
                  </div>
                </div>
                {/* Only render <Separator /> if not the last item */}
                {index !== individualSchedule.length - 1 && (
                  <Separator className="mx-10 w-auto bg-slate-400" />
                )}
              </React.Fragment>
            ))
          ) : (
            <p>No schedule available.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto h-[800px] max-w-[800px] md:h-screen md:min-h-[900px]">
      <h1
        id="schedule"
        className="mt-10 text-center text-2xl font-bold uppercase text-slate-50 xl:text-5xl"
      >
        Schedule
      </h1>
      <div
        className={`mt-5 h-3/4 rounded-xl bg-slate-50 text-sm lg:px-20 ${
          showEventDetails ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {selectedName ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="individualPanel"
              initial="enter"
              animate="center"
              exit="exit"
              variants={variantsFromRight} // Use the defined variants
              className="search-panel-overlay"
            >
              <div>
                <button
                  onClick={() => {
                    setAnimationDirection("fromLeft");
                    setSelectedName(null);
                  }}
                  className="mx-3 mt-2 flex items-center gap-1 justify-self-start text-lg md:mt-5"
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
                <div>
                  <BowlerSchedule selectedName={selectedName} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : showSearchPanel ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="searchPanel"
              initial="enter"
              animate="center"
              exit="exit"
              variants={
                animationDirection === "fromRight"
                  ? variantsFromRight
                  : variantsFromLeft
              } // Use the defined variants
              className="search-panel-overlay"
            >
              <div className="search-panel-overlay">
                <button
                  onClick={() => setShowSearchPanel(false)}
                  className="mx-3 mt-2 flex items-center gap-1 justify-self-start text-lg md:mt-5"
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
              </div>
              <div className="grid items-center">
                <Command className="bg-slate-50 p-3">
                  <CommandInput
                    className="bg-slate-50"
                    placeholder="Search by name..."
                  />
                  <CommandList className="mt-1 min-h-[450px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sortedUniqueNames.map((name) => (
                      <CommandItem
                        className="my-[-1px] py-0 md:py-1"
                        key={name}
                      >
                        <button onClick={() => handleNameClick(name)}>
                          {name}
                        </button>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : showEventDetails ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={"eventDetails"}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variantsFromRight}
              className="h-full"
            >
              <>
                {showEventDetails && selectedEvent ? (
                  <EventDetails {...selectedEvent} />
                ) : null}
              </>
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={"defaultSchedule"}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variantsFromLeft}
              className="h-full"
            >
              <Tabs
                defaultValue={currentDay}
                className="grid h-full grid-rows-6 p-2"
              >
                <ScheduleTabsContent
                  setShowEventDetails={setShowEventDetails}
                  setSelectedEvent={setSelectedEvent}
                  toggleSearchPanel={toggleSearchPanel}
                />
                <ScheduleTabs setCurrentDay={setCurrentDay} />
              </Tabs>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      <div className="mt-5">
        <a
          href={schedulePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 text-lg font-bold"
        >
          <Button className="mx-auto flex w-[60%] gap-2 p-2 font-bold">
            <span>Download Full Schedule</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </span>
          </Button>
        </a>
      </div>
    </div>
  );
}
