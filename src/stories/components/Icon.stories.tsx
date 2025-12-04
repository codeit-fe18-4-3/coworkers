import IconComponent from "@/components/icon";
import { Meta } from "@storybook/nextjs";

const meta = {
  title: "Assets/Icon",
  component: IconComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconComponent>;

export default meta;

export function Icon() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-gray-800 p-4">
      <IconComponent name="alert" size="large" />
      <IconComponent name="alert" size="small" />
      <IconComponent name="board" size="large" />
      <IconComponent name="board" size="small" />
      <IconComponent name="calendar" size="large" />
      <IconComponent name="calendar" size="small" />
      <IconComponent name="checkCompact" />
      <IconComponent name="checkPrimary" />
      <IconComponent name="checkbox" size="large" />
      <IconComponent name="checkbox" size="small" />
      <IconComponent name="checkboxCheck" size="large" />
      <IconComponent name="checkboxCheck" size="small" />
      <IconComponent name="chess" size="large" />
      <IconComponent name="chess" size="small" />
      <IconComponent name="chevronLeft" size="large" />
      <IconComponent name="chevronLeft" size="small" />
      <IconComponent name="chevronRight" size="large" />
      <IconComponent name="chevronRight" size="small" />
      <IconComponent name="clock" size="large" />
      <IconComponent name="clock" size="small" />
      <IconComponent name="comment" />
      <IconComponent name="dots" size="large" />
      <IconComponent name="dots" size="small" />
      <IconComponent name="expand" size="large" />
      <IconComponent name="expand" size="small" />
      <IconComponent name="fold" size="large" />
      <IconComponent name="fold" size="small" />
      <IconComponent name="gear" size="large" />
      <IconComponent name="gear" size="small" />
      <IconComponent name="heart" size="large" />
      <IconComponent name="heart" size="small" />
      <IconComponent name="heartFill" size="large" />
      <IconComponent name="heartFill" size="small" />
      <IconComponent name="image" />
      <IconComponent name="invisible" />
      <IconComponent name="magnifier" size="large" />
      <IconComponent name="magnifier" size="small" />
      <IconComponent name="menu" />
      <IconComponent name="pencil" />
      <IconComponent name="person" size="large" />
      <IconComponent name="person" size="small" />
      <IconComponent name="plus" size="large" />
      <IconComponent name="plus" size="medium" />
      <IconComponent name="plus" size="small" />
      <IconComponent name="progressDone" size="large" />
      <IconComponent name="progressDone" size="small" />
      <IconComponent name="repeat" size="large" />
      <IconComponent name="repeat" size="small" />
      <IconComponent name="secession" />
      <IconComponent name="thumbup" />
      <IconComponent name="triangleDown" size="large" />
      <IconComponent name="triangleDown" size="small" />
      <IconComponent name="visible" />
      <IconComponent name="xmark" size="large" />
      <IconComponent name="xmark" size="medium" />
      <IconComponent name="xmark" size="small" />
      <IconComponent name="union" size="large" />
      <IconComponent name="union" size="small" />
      <IconComponent name="folder" size="large" />
      <IconComponent name="folder" size="medium" />
      <IconComponent name="folder" size="small" />
      <IconComponent name="doneShadow" size="large" />
      <IconComponent name="doneShadow" size="medium" />
      <IconComponent name="doneShadow" size="small" />
      <IconComponent name="commentShadow" size="large" />
      <IconComponent name="commentShadow" size="medium" />
      <IconComponent name="commentShadow" size="small" />
      <IconComponent name="best" />
    </div>
  );
}
