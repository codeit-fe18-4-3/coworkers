import SelectComponent, { SelectOption } from "@/components/select";
import type { Meta } from "@storybook/nextjs";
import { useState } from "react";

const meta = {
  title: "Components/Select",
  component: SelectComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SelectComponent>;

export default meta;

export function Select() {
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const options: SelectOption[] = [
    { label: "한 번", value: "once" },
    { label: "매일", value: "daily" },
    { label: "주 반복", value: "weekly" },
    { label: "월 반복", value: "monthly" },
  ];

  const handleChange = (value: SelectOption) => {
    console.log("Selected:", value);
    setSelectedOption(value);
  };

  return (
    <div className="flex items-center gap-4">
      <SelectComponent
        className="w-[109px]"
        value={selectedOption}
        placeholder="반복 안함"
        options={options}
        size="large"
        onChange={handleChange}
      />
    </div>
  );
}
