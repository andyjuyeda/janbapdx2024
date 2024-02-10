import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import "./schedule.module.css";
import eventSchedule from "./UpdatedEventSchedule.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  setShowEventDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventDetails({
  gender,
  event,
  divisions,
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
                  <a href="#" className="flex gap-2 text-lg font-bold">
                    <span>Download PDF</span>
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
          <div className="flex justify-between border-b-2 border-dark-blue text-lg font-semibold">
            <span>Name</span>
            <span>Lane</span>
          </div>
        </div>
      </>
    );
  }
  interface Bowler {
    name: string;
    average: number;
    lane: number;
    division: number;
    gender: string;
    instance_id: number;
  }

  const [bowlers, setBowlers] = useState<Bowler[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      // Simulate API call delay
      setTimeout(() => {
        try {
          // Simulate fetching data by setting bowlers to an empty array
          // or predefined data structure to test UI components
          setBowlers([]);
          setIsLoading(false);
        } catch (error) {
          console.error("Error simulating fetch:", error);
          setIsLoading(false);
        }
      }, 2000); // Adjust this delay as needed
    }

    fetchData();
  }, [event, divisions, gender]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pb-2 text-center">
      <EventDetailsHeader />
      {bowlers.map((bowler) => (
        <div className="mb-1 space-y-1">
          <div
            key={bowler.instance_id}
            className="flex justify-between px-6 text-lg"
          >
            <span className="font-bold">{bowler.name}</span>
            <span>{bowler.lane}</span>
          </div>
          <Separator className="mx-6 w-auto bg-slate-200" />
        </div>
      ))}
      {bowlers.length === 0 && (
        <div className="mt-5 text-lg font-semibold">
          Lane assignments are currently unavailable.
        </div>
      )}
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
}: ScheduleTabsContentProps) {
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
          <div className="flex justify-between md:py-5">
            <h2 className="mb-8 text-3xl font-bold uppercase md:relative md:left-0 md:right-0 md:mx-auto md:text-3xl">
              {day.name}
            </h2>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 cursor-pointer md:fixed md:right-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-10 bg-slate-50">
                <DropdownMenuItem className="text-lg font-bold">
                  Printable Schedule
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg font-bold">
                  Get Your Personal Schedule
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
          {/* <h3 className="mb-8 mt-[-5px] font-semibold md:mt-[-10px] md:text-center md:text-lg">
            {day.mainevent.map((event, index) => (
              <div key={index}>{event}</div>
            ))}
          </h3> */}

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

          {/* <div className="grid h-full place-items-center">
            <div className="flex flex-col text-center">
              {day.mainevent.map((event) => (
                <h3 className="text-xl font-semibold md:text-2xl">{event}</h3>
              ))}
            </div>
          </div>
          <div className="text-center font-semibold">
            <span>Event times have not yet been determined.</span>
          </div> */}
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

  const variants = {
    enter: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.2, delay: 0 },
    },
    center: { x: "0%", opacity: 1, transition: { duration: 0.2 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
  };

  const eventDetailsVariants = {
    enter: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.2, delay: 0 },
    },
    center: { x: "0%", opacity: 1, transition: { duration: 0.2 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="h-[800px] md:h-screen md:min-h-[900px]">
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
        <AnimatePresence mode="wait">
          <motion.div
            key={showEventDetails ? "eventDetails" : "schedule"}
            initial="enter"
            animate="center"
            exit="exit"
            variants={showEventDetails ? eventDetailsVariants : variants}
            className="h-full"
          >
            {showEventDetails ? (
              <>
                {showEventDetails && selectedEvent ? (
                  <EventDetails {...selectedEvent} />
                ) : null}
              </>
            ) : (
              <Tabs
                defaultValue={currentDay}
                className="grid h-full grid-rows-6 p-2"
              >
                <ScheduleTabsContent
                  setShowEventDetails={setShowEventDetails}
                  setSelectedEvent={setSelectedEvent}
                />
                <ScheduleTabs setCurrentDay={setCurrentDay} />
              </Tabs>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
