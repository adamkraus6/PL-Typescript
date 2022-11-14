import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"
import * as express from "express"
import * as path from "path"

AppDataSource.initialize().then(async () => {
    const app = express()

    app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "/html/index.html"))
    })

    app.listen(3000, () => {
		console.log("Listening on port 3000")
    })
}).catch(error => console.log(error))
