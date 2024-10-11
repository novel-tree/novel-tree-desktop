import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../../components/atoms/Typography";

const meta = {
  title: "Atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "code"],
      },
    },
    color: {
      control: {
        type: "select",
        options: ["primary", "secondary", "error"],
      },
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Typography",
  },
};
