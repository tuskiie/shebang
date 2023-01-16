import { ActionPanel, List } from "@raycast/api";
import { Shebang } from "../types";
import CreateShebangAction from "./CreateShebangAction";
import AppendDefaultsAction from "./AppendDefaultsAction";

function EmptyView(props: {
  shebangs: Shebang[];
  onCreate: (prefix: string, name: string, subtitle: string) => void;
  onRestore: () => void;
}) {
  if (props.shebangs.length > 0) {
    return (
      <List.EmptyView
        icon="😕"
        title="No matching shebangs found"
        actions={
          <ActionPanel>
            <CreateShebangAction onCreate={props.onCreate} />
          </ActionPanel>
        }
      />
    );
  }
  return (
    <List.EmptyView
      icon="🤖"
      title="No shebangs"
      description="Either add a new shebang or append the defaults."
      actions={
        <ActionPanel>
          <CreateShebangAction onCreate={props.onCreate} />
          <AppendDefaultsAction onRestore={props.onRestore} />
        </ActionPanel>
      }
    />
  );
}

export default EmptyView;
