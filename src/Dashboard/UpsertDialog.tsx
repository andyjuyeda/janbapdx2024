import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BowlerInfoForm from "./BowlerInfoForm";
import { GetBowlerInfo } from "./BowlersAPICalls";



interface UpsertBowlerDialogProps {
  upsert: string;
  id?: string;
  isOpen: boolean; 
  isEditing: boolean; // new prop
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // new prop
}

export function UpsertBowlerDialog({
  upsert,
  id,
  isOpen,
  isEditing,  // new prop
  setIsEditing,  // new prop
}: UpsertBowlerDialogProps) {
  console.log("UpsertBowlerDialog Init");

  return (
    <Dialog>
      <DialogContent className="text-dark-blue">
        <DialogHeader>
          <DialogTitle>{upsert}</DialogTitle>
        </DialogHeader>
        {upsert === "Add Bowler" ? (
          <BowlerInfoForm />
        ) : (
          <>
            {isEditing ? (
              <BowlerInfoForm />
            ) : isOpen ? ( // Render only if the dialog is open
              <GetBowlerInfo bowlerID={id} />
            ) : null}
            <button onClick={() => setIsEditing(!isEditing)} className="mx-auto w-fit">
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

