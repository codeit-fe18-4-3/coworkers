import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "Design Tokens/Typography",
};
export default meta;

type Story = StoryObj;

export const TextStyles: Story = {
  render: () => (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-4xl-m">text-4xl-m</div>
        <div className="text-3xl-b">text-3xl-b</div>
        <div className="text-3xl-s">text-3xl-s</div>
        <div className="text-2xl-b">text-2xl-b</div>
        <div className="text-2xl-s">text-2xl-s</div>
        <div className="text-2xl-m">text-2xl-m</div>
        <div className="text-2xl-r">text-2xl-r</div>
        <div className="text-xl-b">text-xl-b</div>
        <div className="text-xl-s">text-xl-s</div>
        <div className="text-xl-m">text-xl-m</div>
        <div className="text-xl-r">text-xl-r</div>
        <div className="text-2lg-b">text-2lg-b</div>
        <div className="text-2lg-s">text-2lg-s</div>
        <div className="text-2lg-m">text-2lg-m</div>
        <div className="text-2lg-r">text-2lg-r</div>
        <div className="text-lg-b">text-lg-b</div>
        <div className="text-lg-s">text-lg-s</div>
        <div className="text-lg-m">text-lg-m</div>
        <div className="text-lg-r">text-lg-r</div>
        <div className="text-md-b">text-md-b</div>
        <div className="text-md-s">text-md-s</div>
        <div className="text-md-m">text-md-m</div>
        <div className="text-md-r">text-md-r</div>
        <div className="text-sm-s">text-sm-s</div>
        <div className="text-sm-m">text-sm-m</div>
        <div className="text-xs-s">text-xs-s</div>
        <div className="text-xs-m">text-xs-m</div>
        <div className="text-xs-r">text-xs-r</div>
      </div>
    </>
  ),
};
