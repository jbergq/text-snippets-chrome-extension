function getMetadata() {
  return {
    url: window.location.href,
    title: document.title,
    dateSaved: new Date().toISOString(),
  };
}

function getSurroundingText(selectedText) {
  // Customize this function to get the desired surrounding text.
}

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.action === "saveSnippet") {
    let selectedText = window.getSelection().toString();
    let surroundingText = getSurroundingText(selectedText);
    let metadata = getMetadata();

    let snippet = {
      text: selectedText,
      surroundingText: surroundingText,
      metadata: metadata,
    };

    try {
      await fetch("http://localhost:3000/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippet),
      });
      console.log("Text snippet saved.");
    } catch (error) {
      console.error("Error saving text snippet:", error);
    }
  }
});
