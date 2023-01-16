import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Action, ActionPanel, Icon, List, LocalStorage } from "@raycast/api";
import { Shebang, Mode } from "./types";
import { CreateShebangAction, DeleteShebangAction, AppendDefaultsAction, EmptyView } from "./components";

type State = {
  shebangs: Shebang[];
  isLoading: boolean;
  mode: string;
};

const DEFAULT_SHEBANGS: Shebang[] = [
  {
    id: nanoid(),
    prefix: "/bin/",
    name: "sh",
    subtitle: "Bourne shell (or compatible)"
  },
  {
    id: nanoid(),
    prefix: "/bin/",
    name: "bash",
    subtitle: "Bash shell"
  }
  // {
  //   id: nanoid(),
  //   title: "#!/bin/zsh",
  //   subtitle: "Z shell"
  // },
  // {
  //   id: nanoid(),
  //   title: "#!/usr/bin/pwsh",
  //   subtitle: "Powershell"
  // },
  // {
  //   id: nanoid(),
  //   title: "#!/usr/bin/python",
  //   subtitle: "Python"
  // },
  // {
  //   id: nanoid(),
  //   title: "#!/usr/bin/python3",
  //   subtitle: "Python3"
  // }
];

export default function Command() {
  const [state, setState] = useState<State>({
    shebangs: DEFAULT_SHEBANGS,
    isLoading: true,
    mode: Mode.env
  });

  useEffect(() => {
    (async () => {
      const storedShebangs = await LocalStorage.getItem<string>("shebangs");

      if (!storedShebangs) {
        setState((previous) => ({ ...previous, isLoading: false }));
        return;
      }

      try {
        const shebangs: Shebang[] = JSON.parse(storedShebangs);
        setState((previous) => ({ ...previous, shebangs: shebangs, isLoading: false }));
      } catch (e) {
        // can't decode shebangs
        setState((previous) => ({ ...previous, shebangs: DEFAULT_SHEBANGS, isLoading: false }));
      }
    })();
  }, []);

  useEffect(() => {
    LocalStorage.setItem("shebangs", JSON.stringify(state.shebangs));
  }, [state.shebangs]);

  const handleCreate = useCallback(
    (prefix: string, name: string, subtitle: string) => {
      const newShebangs = [...state.shebangs, { id: nanoid(), prefix, name, subtitle }];
      setState((previous) => ({ ...previous, shebangs: newShebangs }));
    },
    [state.shebangs, setState]
  );

  const handleDelete = useCallback(
    (index: number) => {
      const newShebangs = [...state.shebangs];
      newShebangs.splice(index, 1);
      setState((previous) => ({ ...previous, shebangs: newShebangs }));
    },
    [state.shebangs, setState]
  );

  const handleAppend = useCallback(() => {
    const newShebangs = [...state.shebangs, ...DEFAULT_SHEBANGS];
    setState((previous) => ({ ...previous, shebangs: newShebangs }));
  }, [state.shebangs, setState]);

  const changeMode = useCallback(() => {
    if (state.mode === Mode.env) {
      return state.shebangs;
    }
    if (state.mode === Mode.noEnv) {
      return state.shebangs;
    }
    return state.shebangs;
  }, [state.shebangs, state.mode]);

  return (
    <List
      isLoading={state.isLoading}
      searchBarPlaceholder="Search shebangs..."
      searchBarAccessory={
        <List.Dropdown
          tooltip="Change mode"
          value={state.mode}
          onChange={(newValue) => setState((previous) => ({ ...previous, mode: newValue as Mode }))}
        >
          <List.Dropdown.Item title={Mode.noEnv} value={Mode.noEnv} />
          <List.Dropdown.Item title={Mode.env} value={Mode.env} />
        </List.Dropdown>
      }
    >
      <EmptyView shebangs={state.shebangs} onCreate={handleCreate} onRestore={handleAppend} />
      {state.shebangs.map((shebang, index) => (
        <List.Item
          key={shebang.id}
          title={shebang.prefix + shebang.name}
          subtitle={shebang.subtitle}
          icon={Icon.Terminal}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <Action.CopyToClipboard content={shebang.prefix + shebang.name} />
                <Action.Paste content={shebang.prefix + shebang.name} />
              </ActionPanel.Section>
              <ActionPanel.Section>
                <CreateShebangAction onCreate={handleCreate} />
                <DeleteShebangAction onDelete={() => handleDelete(index)} />
                <AppendDefaultsAction onRestore={handleAppend} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
