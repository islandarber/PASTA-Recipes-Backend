import express from "express";
import 'dotenv/config';
import recipesRouter from './Routes/recipes.js'

const app = express();
const port = 8000;

app.use(express.json());
app.use('/recipes', recipesRouter );

app.listen(port, () => {
  console.log('Listening to port', port);
})