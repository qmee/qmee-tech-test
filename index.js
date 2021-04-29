const express = require("express");
const app = express();
const port = Number(process.env.PORT) || 3001;

// The Box-Muller transform converts two independent uniform variates on (0, 1) into two standard Gaussian variates (mean 0, variance 1)
function randn_bm() {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const SURVEY_DURATIONS_IN_MINUTES = (process.env.SURVEY_DURATIONS || '12,5,3,6,20,7').split(',').map(Number);

app.get("/survey-completed-event", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const index = Math.floor(Math.random() * SURVEY_DURATIONS_IN_MINUTES.length);
  const durationInMinutes = SURVEY_DURATIONS_IN_MINUTES[index];
  // Variance is around half of the duration. Ie longer surveys have a bigger variance
  const sampledDuration =
    durationInMinutes * 60000 + 30000 * durationInMinutes * randn_bm();
  res.end(
    JSON.stringify({
      startTime: new Date(
        new Date().getTime() - Math.max(0, sampledDuration)
      ).toISOString(),
      endTime: new Date().toISOString(),
      surveyId: index,
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
