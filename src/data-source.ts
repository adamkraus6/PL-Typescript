import "reflect-metadata"
import { DataSource } from "typeorm"
import { Movie } from "./entity/Movie"
import { Actor } from "./entity/Actor"
import { Role } from "./entity/Role"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "pl",
    synchronize: true,
    logging: false,
    entities: [Movie, Actor, Role],
    migrations: [],
    subscribers: [],
})
