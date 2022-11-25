import express from  'express'
import cors from 'cors'
const app = express();
import indexRouter from "./routes/index"
import path from "path"

app.use(cors());
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || process.env.CLIENT_URL || 'http://localhost');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(indexRouter)

module.exports ={app}