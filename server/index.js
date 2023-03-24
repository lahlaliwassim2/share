import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import path from 'path'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import authRoutes from "./routes/auth.js"
import{ register } from './controllers/auth.js'

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

const storage = multer.diskStorage({
  destination : function( req, res, cb) {
    cb(null, "public/assets")
  },
  filname: function (req, res , cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

app.post("/auth/register", upload.single("picture"), register)

// ROUTES 

app.use("/auth", authRoutes)

const CONNECTION_URL = 'mongodb://127.0.0.1:27017/share'
const PORT = process.env.PORT || 8000
mongoose.connect(CONNECTION_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>app.listen(PORT,()=>console.log(`Serverrunning on port  ${PORT}`)))
  .catch((error)=>console.log(error.message))

