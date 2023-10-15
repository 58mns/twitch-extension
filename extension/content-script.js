async function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

async function doThing() {
  await wait(500);

  let elementToClick = document.getElementsByClassName(
    "ScCoreButtonSuccess-sc-ocjdkq-5"
  )[0];

  //alert("The green box is visible.");
  elementToClick.click();
}

function waitForAddedNode(params) {
  new MutationObserver(function (mutations) {
    var el = document.getElementsByClassName(params.classname)[0];
    if (el) {
      //this.disconnect();
      params.done();
    }
  }).observe(document, {
    childList: true,
    subtree: true,
  });
}

waitForAddedNode({
  classname: "ScCoreButtonSuccess-sc-ocjdkq-5",
  done: async function () {
    await doThing();
  },
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "hello!") {
    //console.log(request.url) // new url is now in content scripts!
    waitForAddedNode({
      classname: "ScCoreButtonSuccess-sc-ocjdkq-5",
      done: async function () {
        await doThing();
      },
    });
  }
});
