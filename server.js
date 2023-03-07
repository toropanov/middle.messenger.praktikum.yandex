var express = require('express');

const app = express();
const staticServe = express.static(`${ __dirname }/dist`);
const PORT = process.env.PORT || 80;

app.use("/", staticServe);
app.use("*", staticServe);

app.listen(PORT, () => {
  console.log(`Chat is on next port - ${PORT}!`);
});
