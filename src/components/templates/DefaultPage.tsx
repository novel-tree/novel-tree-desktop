import { Typography } from "../atoms/Typography";

export function DefaultPage() {
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">No scripts selected</Typography>
      <Typography variant="p" color="secondary">
        Select a script from the sidebar to view its content
      </Typography>
    </div>
  );
}
