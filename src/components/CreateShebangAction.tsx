import { Action, Icon } from "@raycast/api";
import CreateShebangForm from "./CreateShebangForm";

function CreateShebangAction(props: {
  defaultPrefix?: string;
  defaultName?: string;
  defaultSubtitle?: string;
  onCreate: (prefix: string, name: string, subtitle: string) => void;
}) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Shebang"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={
        <CreateShebangForm
          defaultName={(props.defaultPrefix, props.defaultName, props.defaultSubtitle)}
          onCreate={props.onCreate}
        />
      }
    />
  );
}

export default CreateShebangAction;
