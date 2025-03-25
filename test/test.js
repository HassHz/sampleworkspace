async function sendPostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function sendPostRequestNoCatch(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
}

const option = 2;

describe("Dummy Test", () => {
  it("Just Passes", async () => {});

  it("Dummy Test", async () => {
    // This also causes wdio to stop running.
    // console.error("Error: This is a dummy error");

    // Test to reproduce issue where a thrown error (regardless of whether it's caught or not) causes wdio to stop running.

    const url = "https://nonexistent.com/api";
    const data = { key1: "value1", key2: "value2" };
    // Option 1
    // Sometimes goes through all the tests and shows summary spec reporter results (with this current test marked as failure).
    // But most of the time shows an error and stops wdio with no spec reporter results.
    if (option === 1) {
      console.log("OPTION 1 - No Catch");
      await sendPostRequestNoCatch(url, data);
    }

    // Option 2
    // Sometimes test passes since error is caught and test ends (and shows spec reporter results).
    // But most of the time shows an error and stops wdio with no spec reporter results.
    if (option === 2) {
      console.log("OPTION 2 - Catch");
      await sendPostRequest(url, data);
    }

    // May help with reproducing for some reason.
    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 5000);
    });
  });

  it("Just Passes Again after 5 Seconds", async () => {
    console.log("^^^ Waiting 5 secs");
    await new Promise((res, rej) => {
      setTimeout(() => {
        console.log("^^^ Waited 5 secs");
        res();
      }, 5000);
    });
  });
});
