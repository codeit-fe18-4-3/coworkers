import { FloatingButton as FloatingButtonComponent } from "@/components/button";
import Icon from "@/components/icon";
import type { Meta } from "@storybook/nextjs";

const meta = {
  title: "Components/FloatingButton",
  component: FloatingButtonComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FloatingButtonComponent>;

export default meta;

export function FloatingButton() {
  const handleClick = () => {
    console.log("Floating button clicked");
  };

  return (
    <div className="flex items-center gap-4">
      <FloatingButtonComponent
        variant="primary"
        icon={<Icon name="plus" color="white" />}
        onClick={handleClick}
      />
      <FloatingButtonComponent
        variant="inverse"
        icon={<Icon name="heart" color="transparent" />}
        onClick={handleClick}
      />
    </div>
  );
}
