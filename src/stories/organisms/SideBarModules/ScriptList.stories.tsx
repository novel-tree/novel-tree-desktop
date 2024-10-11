import type { StoryObj } from "@storybook/react";
import { createStore, Provider } from "jotai";
import { ScriptList } from "../../../components/organisms/SideBarModules/ScriptList";
import { filesAtom, FileState } from "../../../states/files";

function generateFiles(count: number): FileState[] {
  return Array.from({ length: count }, (_, index) => ({
    fileId: index.toString(),
    fileName: `file-${index}`,
    directoryId: "storybook",
    filePath: `storybook/file-${index}`,
    fileType: "txt",
    isEdited: false,
    isFocused: false,
    editorOrder: index,
    openedAt: Date.now(),
    lastSavedAt: Date.now(),
  }));
}

const store = createStore();
store.set(filesAtom, generateFiles(2));

const meta = {
  title: "Organisms/SideBarModules/ScriptList",
  component: ScriptList,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    fileCount: {
      control: "number",
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileCount: 5,
  },
  beforeEach: (context: any) => {
    console.log("beforeEach", context);
    store.set(filesAtom, generateFiles(context.args.fileCount as number));
  },
};
