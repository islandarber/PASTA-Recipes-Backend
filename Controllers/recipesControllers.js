import {pool} from '../db/pool.js'

export const getRecipes = async (req, res) => {
  try {
    const {rows} = await pool.query('SELECT * FROM recipes;');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
}

export const getRecipe = async (req, res) => {
  const {id} = req.params;
  try {
    const {rows} = await pool.query('SELECT * FROM recipes WHERE id=$1;', [id]);
    if(rows.length === 0){
      res.sendStatus(404)
  } else {
      res.json(rows[0])
  }

  } catch (error) {
    res.status(500);
    
  }
}