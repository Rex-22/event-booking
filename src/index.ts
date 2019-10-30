import * as express from "express";
import * as bodyParser from "body-parser";

let app = express();

app.use(bodyParser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
