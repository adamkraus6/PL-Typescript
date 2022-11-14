import "reflect-metadata"
import { DataSource } from "typeorm"
// import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "pl",
    synchronize: true,
    logging: false,
    entities: [], // Database entities need to be here like [User]
    migrations: [],
    subscribers: [],
})
