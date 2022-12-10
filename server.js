var express = require('express');

const app = express();
const staticServe = express.static(`${ __dirname }/dist`);
const PORT = process.env.PORT || 3000;

app.use("/", staticServe);
app.use("*", staticServe);

app.listen(PORT, function () {
  console.log(`Chat is on next port - ${PORT}!`);
});
