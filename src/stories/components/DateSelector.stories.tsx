import DateSelectorComponent from "@/features/tasklist/components/DateSelector";
import type { Meta } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Components/DateSelector",
  component: DateSelectorComponent,
  parameters: {
    layout: "centered",
  },
  render: () => <DateSelector />,
} satisfies Meta<typeof DateSelectorComponent>;

export default meta;

export function DateSelector() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="w-[500px]">
      <DateSelectorComponent
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      />

      <div className="mt-4 rounded-md bg-gray-100 p-3">
        <p className="text-sm text-gray-600">현재 선택된 날짜:</p>
        <p className="text-md font-semibold">
          {selectedDate.toLocaleDateString("sv-SE")}
        </p>
      </div>
    </div>
  );
}
