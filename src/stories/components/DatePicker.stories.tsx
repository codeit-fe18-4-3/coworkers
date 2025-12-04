import {
  DatePicker as DatePickerComponent,
  DateRangePicker as DateRangePickerComponent,
} from "@/features/date-picker";
import type { Meta } from "@storybook/nextjs";
import { endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const meta = {
  title: "Components/DatePicker",
  component: DatePickerComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePickerComponent>;

export default meta;

// 단일 날짜 선택
export function DatePicker() {
  const [selected, setSelected] = useState<Date>();

  return <DatePickerComponent selected={selected} onSelect={setSelected} />;
}

// 주간 범위 선택
export const DateRangePicker = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return <DateRangePickerComponent range={range} onChange={setRange} />;
};
