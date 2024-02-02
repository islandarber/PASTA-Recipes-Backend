import express from "express";
import cors from 'cors';
import 'dotenv/config';
import recipesRouter from './Routes/recipes.js'

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());
app.use('/recipes', recipesRouter );

app.listen(port, () => {
  console.log('Listening to port', port);
})