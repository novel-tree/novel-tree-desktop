import type { StoryObj } from "@storybook/react";
import { ModeList } from "../../components/organisms/ModeList";

const meta = {
  title: "Organisms/ModeList",
  component: ModeList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
