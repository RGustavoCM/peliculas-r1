import { Request, Response } from 'express';


import pool from '../database';

class PeliculasController {

    public async list(req: Request, res: Response): Promise<void> {
        const peliculas = await pool.query('SELECT * FROM pelicula');
        res.json(peliculas);
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO pelicula set ?', [req.body]);
        res.json({ message: 'Pelicula Guardada' });
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const peliculas = await pool.query('SELECT * FROM pelicula WHERE cvePelicula = ?', [id]);
        console.log(peliculas.length);
        if (peliculas.length > 0) {
            return res.json(peliculas[0]);
        }
        res.status(404).json({ text: "Esa Pelicula No Esta Aqui XD" });
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const peliVieja = req.body;
        await pool.query('UPDATE pelicula set ? WHERE cvePelicula = ?', [req.body, id]);
        res.json({ message: "La Pelicula Esta Actualizada" });
    }


    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM pelicula WHERE cvePelicula = ?', [id]);
        res.json({ message: "La Pelicula Fue Eliminada" });
    }
}

const peliculasController = new PeliculasController;
export default peliculasController;