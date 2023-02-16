import * as React from "react";
import { getCurrentTab } from "../utils";
import { extractHeaderAndRowValuesFromDOM } from "./chrome-handler";

export default function PopupApp() {
  const [showTable, setShowTable] = React.useState(false);
  const [headers, setHeaders] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<string[][]>([]);
  const [refreshCount, setRefreshCount] = React.useState(0);

  const tableRef = React.useRef(null);

  React.useEffect(() => {
    if (showTable) {
      window.setTimeout(() => {
        extractHeaderAndRowValuesFromDOM(setHeaders, setRows);
      }, 600);
    }
  }, [showTable, refreshCount]);

  // async function handleGoAlertHubProject() {
  //   let tab = await getCurrentTab();
  //   if (tab) {
  //     await chrome.scripting.executeScript({
  //       target: { tabId: tab.id as number },
  //       func: () => {
  //         document.location.href =
  //           "https://github.com/orgs/inditex/projects/45/views/26?layout=table";
  //       },
  //     });
  //   }
  // }

  async function handleShowTable() {
    let tab = await getCurrentTab();
    if (tab) {
      await chrome.scripting.executeScript(
        {
          target: { tabId: tab.id as number },
          func: () => {
            //@ts-ignore
            document.body.style.zoom = "20%";
          },
        },
        () => {
          setShowTable(true);
          setRefreshCount(refreshCount + 1);
        }
      );
    }
  }

  async function handleCopyTable() {
    if (window) {
      var urlField = document.querySelector("table");
      var range = document.createRange();
      //@ts-ignore
      range.selectNode(urlField);
      window?.getSelection()?.addRange(range);
      document.execCommand("copy");
    }
  }

  return (
    <div style={{ minWidth: "600px", minHeight: "800px" }}>
      <div style={{ margin: "25px 0px" }}>
        <div
          style={{
            padding: 15,
            backgroundColor: "#bbdefb",
            borderRadius: 5,
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          <b>ATTENTION!</b>
          <br />
          Remember that you must be in "Table Layout" for the extension to work
          well
        </div>

        <div
          style={{
            padding: 15,
            backgroundColor: "#bbdefb",
            borderRadius: 5,
            fontSize: 15,
            marginBottom: 20,
          }}
        >
          You need to follow below steps to copy the table
          <ol>
            <li>Click on the button "Show Table"</li>
            <li>Click on the button "Copy Table"</li>
          </ol>
        </div>

        <div>
          <button style={{ marginLeft: 5 }} onClick={handleShowTable}>
            {showTable ? "Refresh Table" : "Show Table"}
          </button>
          <button
            style={{
              marginLeft: 5,
              backgroundColor: "#1976d2",
              color: "white",
            }}
            onClick={handleCopyTable}
          >
            Copy Table
          </button>
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <td>#</td>
            {headers
              .filter((item) => !!item)
              .map((header) => (
                <td>{header}</td>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {row.map((item) => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
