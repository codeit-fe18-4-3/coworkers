import CountChipComponent from "@/components/chip/CountChip";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/CountChip",
  component: CountChipComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CountChipComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CountChip: Story = {
  args: {
    title: "법인 등기",
    count: 5,
  },
  render: () => {
    return (
      <div className="flex w-xl flex-col items-center gap-4">
        <CountChipComponent title="법인 등기" count={0} size="large" />
        <CountChipComponent title="법인 등기" count={1} size="small" />
        <CountChipComponent title="법인 등기" count={5} size="large" selected />
        <CountChipComponent
          title="법인 등기"
          count={12}
          size="small"
          selected
        />
      </div>
    );
  },
};
