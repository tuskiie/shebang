import { useCallback } from "react";
import { Form, Action, ActionPanel, useNavigation } from "@raycast/api";

function CreateShebangForm(props: {
  defaultTitle?: string;
  defaultSubtitle?: string;
  onCreate: (title: string, subtitle: string) => void;
}) {
  const { onCreate, defaultTitle = "#!/usr/bin/", defaultSubtitle = "" } = props;
  const { pop } = useNavigation();

  const handleSubmit = useCallback(
    (values: { title: string; subtitle: string }) => {
      onCreate(values.title, values.subtitle);
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
      <Form.TextField id="title" defaultValue={defaultTitle} title="Shebang" />
      <Form.TextField id="subtitle" defaultValue={defaultSubtitle} title="Description" />
    </Form>
  );
}

export default CreateShebangForm;
