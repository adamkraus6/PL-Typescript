import { AppDataSource } from "./data-source";
import * as express from "express";
import * as path from "path";
import * as bodyparser from "body-parser";
import { Actor } from "./entity/Actor";
import { Movie } from "./entity/Movie";
import { Role } from "./entity/Role";

const PORT: number = 3000;

AppDataSource.initialize()
  .then(async () => {
    const actorRepo = AppDataSource.getRepository(Actor);
    const movieRepo = AppDataSource.getRepository(Movie);
    const roleRepo = AppDataSource.getRepository(Role);

    const app = express();

    app.use(
      express.static("src"),
      bodyparser.json(),
      bodyparser.urlencoded({ extended: false })
    );

    // GET pages
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/html/index.html"));
    });

    app.get("/add", (req, res) => {
      res.sendFile(path.join(__dirname, "/html/add.html"));
    });

    app.get("/list", (req, res) => {
      res.sendFile(path.join(__dirname, "/html/list.html"));
    });

    app.get("/watchlist", (req, res) => {
      res.sendFile(path.join(__dirname, "/html/watchlist.html"));
    })

    // GET database
    app.get("/list/actor", async (req, res) => {
      let data = await actorRepo.find();
      res.send(JSON.stringify(data));
    });

    app.get("/list/movie", async (req, res) => {
      let data = await movieRepo.find();
      res.send(JSON.stringify(data));
    });

    app.get("/list/role", async (req, res) => {
      let data = await roleRepo.find({
        relations: {
          actor: true,
          movie: true,
        },
      });
      res.send(JSON.stringify(data));
    });

    // POST database
    app.post("/add/actor", async (req, res) => {
      let actor = new Actor();
      actor.name = req.body.name;
      await actorRepo.save(actor);
      res.redirect("back");
    });

    app.post("/add/movie", async (req, res) => {
      let movie = new Movie();
      movie.title = req.body.title;
      movie.released = req.body.released;
      movie.genre = req.body.genre;
      await movieRepo.save(movie);
      res.redirect("back");
    });

    app.post("/add/role", async (req, res) => {
      let actor = await actorRepo.findOne({
        where: {
          name: req.body.actor,
        },
      });
      let movie = await movieRepo.findOne({
        where: {
          title: req.body.movie,
        },
      });
      let role = new Role();
      role.actor = actor;
      role.movie = movie;
      await roleRepo.save(role);
      res.redirect("back");
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
