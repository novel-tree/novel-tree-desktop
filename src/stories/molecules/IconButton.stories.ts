import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { IconButton } from "../../components/molecules/IconButton";

const meta = {
  title: "Molecules/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: {
        type: "select",
        options: ["folder", "file"],
      },
    },
    children: {
      control: "text",
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "folder",
    children: "button",
  },
};
