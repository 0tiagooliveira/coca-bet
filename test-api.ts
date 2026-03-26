async function test() {
  const res = await fetch("https://api.football-data.org/v4/matches?competitions=BSA,CL,CLI,EC,WC", {
    headers: { "X-Auth-Token": "invalid" }
  });
  console.log(res.status, await res.text());
}
test();
