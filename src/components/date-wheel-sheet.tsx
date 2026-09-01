import { useMemo, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Add, Calendar } from "iconsax-react";
import { Button } from "./ui/button";

const months = Array.from({ length: 12 }, (_, index) => new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(2026, index, 1)));
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, index) => currentYear + index);

export function DateWheelSheet({ onConfirm }: { onConfirm?(value: Date): void }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  const [year, setYear] = useState(today.getFullYear());
  const value = useMemo(() => new Date(year, month, day), [day, month, year]);

  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button />}><Add color="currentColor" size="19" /> Create event</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" />
        <Dialog.Viewport className="sheet-viewport">
          <Dialog.Popup className="date-sheet">
            <span className="sheet-handle" />
            <div className="sheet-title"><span><Calendar color="currentColor" size="22" /></span><div><Dialog.Title>Choose a date</Dialog.Title><Dialog.Description>Start with the event date. You can add the remaining details next.</Dialog.Description></div></div>
            <div className="date-wheels">
              <label><span>Month</span><select value={month} onChange={(event) => setMonth(Number(event.target.value))}>{months.map((label, index) => <option value={index} key={label}>{label}</option>)}</select></label>
              <label><span>Day</span><select value={day} onChange={(event) => setDay(Number(event.target.value))}>{days.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
              <label><span>Year</span><select value={year} onChange={(event) => setYear(Number(event.target.value))}>{years.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
            </div>
            <Dialog.Close render={<Button className="w-full" onClick={() => onConfirm?.(value)} />}>Continue with {value.toLocaleDateString("en", { day: "numeric", month: "short" })}</Dialog.Close>
            <Dialog.Close render={<Button className="w-full" variant="ghost" />}>Cancel</Dialog.Close>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
