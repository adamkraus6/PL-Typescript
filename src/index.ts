import { AppDataSource } from "./data-source";
// import { User } from "./entity/User"
import * as express from "express";
import * as path from "path";
import * as bodyparser from "body-parser";

const PORT: number = 3000;

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(
      express.static("src"),
      bodyparser.json(),
      bodyparser.urlencoded({ extended: false })
    );

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/html/index.html"));
    });

    app.get("/add", (req, res) => {
      res.sendFile(path.join(__dirname, "/html/add.html"));
    });

	// TODO: post for new actor, new movie, new role

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
