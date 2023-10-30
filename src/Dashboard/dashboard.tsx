import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllBowlers } from "./BowlersAPICalls";
import { BowlerInEvent } from "./types";

const EventData = ({
  event,
  divisions,
  gender,
}: {
  event?: string;
  divisions?: number[];
  gender?: string;
}) => {
  const [bowlers, setBowlers] = useState<BowlerInEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://192.168.4.134:5001/api/event?event=${event}`;
        if (divisions) {
          divisions.forEach((div) => {
            url += `&div=${div}`;
          });
        }
        if (gender) {
          url += `&gender=${gender}`;
        }

        const response = await fetch(url);
        const data: BowlerInEvent[] = await response.json();

        setBowlers(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [event, divisions, gender]);

  return (
    <div>
      <h3>{event} Bowlers</h3>
      <ul>
        {bowlers.map((bowler) => (
          <li key={bowler.name}>
            {bowler.name} - {bowler.average} - Lane: {bowler.lane} - Division:{" "}
            {bowler.division}
          </li>
        ))}
      </ul>
    </div>
  );
};

function Header() {
  return (
    <header className="h-10 p-3">
      <a href="/" className="flex items-center gap-2 text-slate-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
        Home
      </a>
    </header>
  );
}

function DashboardTabsList() {
  return (
    <div className="sticky top-0 flex w-full bg-slate-50 p-2">
      <TabsList className="w-full">
        <TabsTrigger value="bowlers" className="flex-1">
          Bowlers
        </TabsTrigger>
        <TabsTrigger value="events" className="flex-1">
          Events
        </TabsTrigger>
      </TabsList>
    </div>
  );
}

function DashboardTabsContent() {
  return (
    <>
      <TabsContent value="bowlers" className="mt-0 flex-1 px-2">
        <AllBowlers />
      </TabsContent>
      <TabsContent value="events" className="">
        <EventData />
      </TabsContent>
    </>
  );
}

function Dashboard() {
  return (
    <>
      <Header />
      <div className="mt-5 h-screen px-3 md:px-5 lg:px-10 xl:px-20">
        <Tabs
          defaultValue="bowlers"
          className="flex h-4/5 flex-col overflow-scroll rounded-lg bg-slate-50"
        >
          <DashboardTabsList />
          <DashboardTabsContent />
        </Tabs>
      </div>
    </>
  );
}

export default Dashboard;
