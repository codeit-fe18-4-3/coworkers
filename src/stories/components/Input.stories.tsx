import InvisibleIcon from "@/assets/icons/ic-invisible.svg";
import VisibleIcon from "@/assets/icons/ic-visible.svg";
import { Button } from "@/components/button";
import {
  InputBox as InputBoxComponent,
  Input as InputComponent,
} from "@/components/input";
import TextField from "@/components/input/TextField";
import type { Meta, StoryObj } from "@storybook/nextjs";
import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";

const trailingVariants = {
  none: null,
  button: <Button title="변경하기" size="small" isFullWidth={false} />,
  visible: <VisibleIcon width={24} height={24} />,
  invisible: <InvisibleIcon width={24} height={24} />,
  both: (
    <div className="flex items-center gap-1">
      <VisibleIcon width={24} height={24} />
      <InvisibleIcon width={24} height={24} />
    </div>
  ),
} as const;

const trailingPaddingMap = {
  none: undefined,
  button: "pr-28",
  visible: "pr-16",
  invisible: "pr-16",
  both: "pr-20",
} as const;

type InputArgs = ComponentPropsWithoutRef<typeof InputComponent> & {
  trailingVariant?: keyof typeof trailingVariants;
  errorMessage?: string;
};

const meta = {
  title: "Components/Input",
  component: InputComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["large", "small"],
    },
    type: {
      control: { type: "radio" },
      options: ["text", "email", "password"],
    },
    placeholder: {
      control: { type: "text" },
    },
    trailingVariant: {
      control: { type: "radio" },
      options: ["none", "button", "visible", "invisible"],
    },
    errorMessage: {
      control: { type: "text" },
    },
  },
  args: {
    placeholder: "이메일을 입력하세요.",
    size: "large",
    type: "text",
    trailingVariant: "none",
    errorMessage: undefined,
  },
} satisfies Meta<InputArgs>;

export default meta;

type Story = StoryObj<InputArgs>;

function mapVariants({
  trailingVariant = "none",
  ...rest
}: Partial<InputArgs>): ComponentPropsWithoutRef<typeof InputComponent> {
  const trailing = trailingVariants[trailingVariant];

  return {
    ...rest,
    trailing,
    trailingPadding: trailingPaddingMap[trailingVariant],
  };
}

export const Input: Story = {
  render: (args) => {
    const size = args.size ?? "large";
    const widthClass = size === "small" ? "w-[300px]" : "w-[460px]";
    const { errorMessage } = args;
    const inputArgs = mapVariants(args);

    return (
      <div className={`flex flex-col items-center gap-4 ${widthClass}`}>
        <TextField {...inputArgs} errorMessage={errorMessage} />
      </div>
    );
  },
};

export function InputBox() {
  const [value, setValue] = useState("제어컴포넌트");

  return (
    <div className="flex w-[300px] flex-col gap-4 text-text-primary placeholder:text-text-default">
      <InputBoxComponent
        size="large"
        placeholder="내용을 입력하세요"
        minHeight={100}
      />
      <InputBoxComponent
        size="small"
        height={200}
        value={value}
        placeholder="내용을 입력하세요"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
