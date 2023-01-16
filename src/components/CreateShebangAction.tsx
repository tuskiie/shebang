import { Action, Icon } from "@raycast/api";
import CreateShebangForm from "./CreateShebangForm";

function CreateShebangAction(props: {
  defaultTitle?: string;
  defaultSubtitle?: string;
  onCreate: (title: string, subtitle: string) => void;
}) {
  return (
    <Action.Push
      icon={Icon.Pencil}
      title="Create Shebang"
      shortcut={{ modifiers: ["cmd"], key: "n" }}
      target={
        <CreateShebangForm defaultTitle={(props.defaultTitle, props.defaultSubtitle)} onCreate={props.onCreate} />
      }
    />
  );
}

export default CreateShebangAction;
