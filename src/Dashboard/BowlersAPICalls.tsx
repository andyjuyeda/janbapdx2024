import { useEffect, useState } from "react";
import { UpsertBowlerDialog } from "./UpsertDialog";
import { Bowler } from "./types";


export const AllBowlers = () => {
  console.log("AllBowlers Init");
  const [bowlers, setBowlers] = useState<Bowler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBowlerId, setSelectedBowlerId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [upsertMode, setUpsertMode] = useState<"Add Bowler" | "Bowler Details">(
    "Bowler Details"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.4.134:5001/api/bowlers?id=all"
        );
        const data: Bowler[] = await response.json();
        setBowlers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleBowlerClick = (id: string) => {
    console.log("Bowler clicked with ID:", id);
    setSelectedBowlerId(id);
    setIsDialogOpen(true);
    setUpsertMode("Bowler Details");
    setIsEditing(false);
  };

  return (
    <div className="px-3">
      <div className="sticky top-14 bg-slate-50 pt-2">
        <div className="flex items-center justify-between py-2">
          <span className="text-xl font-bold">All Bowlers</span>
          <button
            onClick={() => {
              console.log("Add Bowler button clicked");
              setIsDialogOpen(true);
              setUpsertMode("Add Bowler");
              setIsEditing(false);
            }}
          >
            Add Bowler
          </button>
        </div>
        <div className="grid grid-cols-[3fr_1fr_1fr] border-b-2">
          <span>Name</span>
          <span className="md:hidden">Avg</span>
          <span className="hidden md:block">Average</span>
          <span>M/F</span>
        </div>
      </div>
      <ul className="pt-2 md:space-y-1">
        {bowlers.map((bowler) => (
          <li
            key={bowler.id}
            className="grid grid-cols-[3fr_1fr_1fr] items-center"
          >
            <button
              onClick={() => handleBowlerClick(`${bowler.id}`)}
              className="text-left font-semibold"
            >
              {bowler.name}
            </button>
            <span>{bowler.average}</span>
            <span>{bowler.gender}</span>
          </li>
        ))}
      </ul>
      <UpsertBowlerDialog
        upsert={upsertMode}
        id={selectedBowlerId as string | undefined}
        isOpen={isDialogOpen}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

interface GetBowlerInfoProps {
  bowlerID?: string;
}

export function GetBowlerInfo({ bowlerID }: GetBowlerInfoProps) {
  console.log("GetBowlerInfo Component Init");
  const [bowlerData, setBowlerData] = useState<Bowler | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect triggered in GetBowlerInfo");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.4.134:5001/api/bowlers?id=${bowlerID}`
        );
        console.log(response);
        const data = await response.json();
        setBowlerData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [bowlerID]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {bowlerData ? (
        <div className="mt-3 flex flex-col gap-2">
          <div className="grid grid-cols-[1fr_2.5fr]">
            <span>Name</span>
            <span className="font-semibold">{bowlerData.name}</span>
          </div>
          <div className="grid grid-cols-[1fr_2.5fr]">
            <span>Average</span>
            <span className="font-semibold">{bowlerData.average}</span>
          </div>
        </div>
      ) : (
        <h1>No bowler found</h1>
      )}
    </>
  );
}
