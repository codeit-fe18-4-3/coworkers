import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta = {
  title: "Design Tokens/Colors",
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="w-44 bg-brand-primary">brand-primary</div>
        <div className="w-44 bg-brand-secondary">brand-secondary</div>
        <div className="w-44 bg-brand-tertiary">brand-tertiary</div>
        <div className="w-44 bg-brand-gradient">bg-brand-gradient</div>
        <div className="w-44 bg-point-purple">point-purple</div>
        <div className="w-44 bg-point-cyan">point-cyan</div>
        <div className="w-44 bg-point-pink">point-pink</div>
        <div className="w-44 bg-point-rose">point-rose</div>
        <div className="w-44 bg-point-orange">point-orange</div>
        <div className="w-44 bg-point-yellow">point-yellow</div>
        <div className="w-44 bg-background-primary">background-primary</div>
        <div className="w-44 bg-background-secondary">background-secondary</div>
        <div className="w-44 bg-background-tertiary">background-tertiary</div>
        <div className="w-44 bg-background-inverse">background-inverse</div>
        <div className="w-44 bg-interaction-inactive">interaction-inactive</div>
        <div className="w-44 bg-interaction-hover">interaction-hover</div>
        <div className="w-44 bg-interaction-pressed">interaction-pressed</div>
        <div className="w-44 bg-border-primary">border-primary</div>
        <div className="w-44 bg-text-primary">text-primary</div>
        <div className="w-44 bg-text-secondary">text-secondary</div>
        <div className="w-44 bg-text-tertiary">text-tertiary</div>
        <div className="w-44 bg-text-default">text-default</div>
        <div className="w-44 bg-text-inverse">text-inverse</div>
        <div className="w-44 bg-text-disabled">text-disabled</div>
        <div className="w-44 bg-status-danger">status-danger</div>
        <div className="w-44 bg-icon-primary">icon-primary</div>
        <div className="w-44 bg-icon-inverse">icon-inverse</div>
        <div className="w-44 bg-icon-brand">icon-brand</div>
        <div className="w-44 bg-state-50">state-50</div>
        <div className="w-44 bg-state-200">state-200</div>
        <div className="w-44 bg-state-300">state-300</div>
        <div className="w-44 bg-state-400">state-400</div>
      </div>
    </>
  ),
};
