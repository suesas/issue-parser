import ForgeUI, { useProductContext, render, Fragment, Text, IssuePanel, useState, useEffect } from '@forge/ui';
import api, { route } from "@forge/api";

const App = () => {

  const context = useProductContext();
  const key = context.platformContext.issueKey;

  const [issue, setIssue] = useState(undefined);
  const [attachment, setAttachment] = useState(undefined);

  useEffect(async () => {
    const issue = await getIssue(key);
    setIssue(issue);
  }, []);

  async function getIssue(key) {
    const response = await api.asUser().requestJira(route`/rest/api/3/issue/${key}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const json = await response.json();
    return json;
  }

  return (
    <Fragment>

      <Text>{JSON.stringify(issue)}</Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
