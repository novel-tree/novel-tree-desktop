import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ModeListItem } from "../../components/molecules/ModeListItem";

const meta = {
  title: "Molecules/ModeListItem",
  component: ModeListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "select",
      options: ["script", "setting"],
    },
    name: {
      control: "text",
    },
    description: {
      control: "text",
    },
    selected: {
      control: "boolean",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof ModeListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "script",
    name: "Mode",
    description: "Description",
    selected: false,
  },
};
