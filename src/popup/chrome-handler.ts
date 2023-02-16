import { getCurrentTab } from "../utils";

export async function extractHeaderAndRowValuesFromDOM(
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>,
  setRows: React.Dispatch<React.SetStateAction<string[][]>>
) {
  let tab = await getCurrentTab();

  if (tab) {
    await chrome.scripting.executeScript(
      {
        target: { tabId: tab.id as number },
        func: () => {
          function extractHeaders(headerSelector = "div[role='columnheader']") {
            let headerNodeList = document.querySelectorAll(headerSelector);
            let headers: string[] = [];

            headerNodeList.forEach((node) => {
              headers.push(node.textContent as string);
            });

            return headers;
          }

          function extractRows(rowSelector = "div[data-test-id*='TableRow']") {
            let rowNodeList = document.querySelectorAll(rowSelector);
            let rows: string[][] = [];

            rowNodeList.forEach((node) => {
              let childNodeList: string[] = [];
              node.childNodes.forEach((childNode) => {
                childNodeList.push(childNode.textContent as string);
              });
              rows.push(childNodeList);
            });

            return rows;
          }

          return {
            headers: extractHeaders(),
            rows: extractRows(),
          };
        },
      },
      (result) => {
        setHeaders(result[0].result.headers);
        setRows(result[0].result.rows);
      }
    );
  }
}
