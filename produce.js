(async function () {
  const messages = ["hey", "watch", "one piece", "anime", "it’s great!"];

  for (const message of messages) {
    const req = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });
    const res = await req.json();
    if (res.message) {
      console.log(`Message ${message} added ✅`);
    }
  }
})();
