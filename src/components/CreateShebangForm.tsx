import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";

function CreateShebangForm(props: {
  defaultPrefix?: string;
  defaultName?: string;
  defaultSubtitle?: string;
  onCreate: (prefix: string, name: string, subtitle: string) => void;
}) {
  const { onCreate, defaultPrefix = "/usr/bin/", defaultName = "bash", defaultSubtitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { prefix: string; name: string; subtitle: string }) => {
      onCreate(values.prefix, values.name, values.subtitle);
      pop();
    },
    [onCreate, pop]
  );

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Create Shebang" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="prefix" defaultValue={defaultPrefix} title="Path" />
      <Form.TextField id="name" defaultValue={defaultName} title="Name" />
      <Form.TextField id="subtitle" defaultValue={defaultSubtitle} title="Description" />
    </Form>
  );
}

export default CreateShebangForm;
