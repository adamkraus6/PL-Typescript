import "reflect-metadata";
import { Actor } from "./entity/Actor";
import { DataSource } from "typeorm";
import { Movie } from "./entity/Movie";
import { Rating } from "./entity/Rating";
import { Role } from "./entity/Role";
import { WatchlistFilter } from "./entity/WatchlistFilter";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "password",
	database: "pl",
	synchronize: true,
	logging: false,
	entities: [Movie, Actor, Role, Rating, WatchlistFilter],
	migrations: [],
	subscribers: [],
});
