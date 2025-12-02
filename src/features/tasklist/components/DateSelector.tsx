import { DatePicker } from "@/features/date-picker";
import { useBackdropClick } from "@/hooks/use-backdrop-click";
import { useState } from "react";
import DateNav from "./DateNav";
import DateTabs from "./DateTabs";

interface DateSelectorProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export default function DateSelector({
  selectedDate,
  onSelect,
}: DateSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsCalendarOpen(false),
  });

  const handlePrevMonth = () => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);

    onSelect(date);
  };
  const handleNextMonth = () => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);

    onSelect(date);
  };

  return (
    <div className="relative flex flex-col gap-4">
      <DateNav
        selectedDate={selectedDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onCalendarOpen={() => setIsCalendarOpen((prev) => !prev)}
      />

      {isCalendarOpen && (
        <div
          ref={targetRef}
          className="absolute top-8 right-0 z-(--z-popover) rounded-xl border border-border-primary bg-background-primary p-2 shadow-lg"
        >
          <DatePicker
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onSelect(date);
              }
              setIsCalendarOpen(false);
            }}
          />
        </div>
      )}

      <DateTabs selectedDate={selectedDate} onSelect={onSelect} />
    </div>
  );
}
