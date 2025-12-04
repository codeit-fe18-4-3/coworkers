import DoneBadgeComponent from "@/components/badge/DoneBadge";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/DoneBadge",
  component: DoneBadgeComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DoneBadgeComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DoneBadge: Story = {
  args: {
    current: 0,
    total: 5,
    size: "large",
  },
  render: () => {
    return (
      <div className="flex w-xl items-center justify-center gap-4 bg-gray-400 p-4">
        <DoneBadgeComponent current={0} total={5} size="large" />
        <DoneBadgeComponent current={3} total={5} size="large" />
        <DoneBadgeComponent current={5} total={5} size="large" />
        <DoneBadgeComponent current={0} total={5} size="small" />
        <DoneBadgeComponent current={3} total={5} size="small" />
        <DoneBadgeComponent current={5} total={5} size="small" />
      </div>
    );
  },
};
