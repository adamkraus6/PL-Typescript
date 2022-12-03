import { Actor } from "./entity/Actor";
import { AppDataSource } from "./data-source";
import { Movie } from "./entity/Movie";
import { Rating } from "./entity/Rating";
import { Role } from "./entity/Role";
import * as bodyparser from "body-parser";
import * as express from "express";
import * as path from "path";
import { WatchlistFilter } from "./entity/WatchlistFilter";

const PORT: number = 3000;

AppDataSource.initialize()
	.then(async () => {
		const actorRepo = AppDataSource.getRepository(Actor);
		const movieRepo = AppDataSource.getRepository(Movie);
		const roleRepo = AppDataSource.getRepository(Role);
		const ratingRepo = AppDataSource.getRepository(Rating);
		const filterRepo = AppDataSource.getRepository(WatchlistFilter);

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
		});

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

		app.get("/list/rating", async (req, res) => {
			let data = await ratingRepo.find({
				relations: {
					movie: true,
				},
			});
			res.send(JSON.stringify(data));
		});

		app.get("/list/filter", async (req, res) => {
			let data = await filterRepo.find();
			res.send(JSON.stringify(data));
		});

		// POST add database
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
			if (actor != null && movie != null) {
				role.actor = actor;
				role.movie = movie;
				await roleRepo.save(role);
			}
			res.redirect("back");
		});

		app.post("/add/rating", async (req, res) => {
			let movie = await movieRepo.findOne({
				where: {
					title: req.body.movie,
				},
			});
			if (movie != null) {
				let rating = new Rating();
				rating.rating = req.body.rating;
				rating.movie = movie;
				await ratingRepo.save(rating);
			}
			res.redirect("back");
		});

		app.post("/add/filter", async (req, res) => {
			let filter = new WatchlistFilter();
			let { filterType, genre, dateFrom, dateTo, title } = req.body;
			filter.filterType = filterType
			switch (filterType) {
				case "genre":
					if (genre) {
						filter.genre = genre;
						await filterRepo.save(filter);
					}
					break;
				case "title":
					if (title) {
						filter.title = title;
						await filterRepo.save(filter);
					}
					break;
				case "released":
					if (dateFrom && dateTo) {
						filter.dateFrom = dateFrom;
						filter.dateTo = dateTo;
						await filterRepo.save(filter);
					}
					break;
				default:
					break;
			}
			res.redirect("back");
		});

		// POST del database
		app.post("/del/filter", async (req, res) => {
			await filterRepo.delete(req.body.filterID);
			res.redirect("back");
		});

		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch((error) => console.log(error));
