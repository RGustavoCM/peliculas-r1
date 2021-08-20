import { Router } from 'express';
import peliculasController from '../controllers/peliculasController';

class PeliculasRoutes{
    public router: Router = Router();

    constructor () {
        this.config();
    }

    config(): void{
        this.router.get('/', peliculasController.list);
        this.router.get('/:id', peliculasController.getOne);
        this.router.post('/', peliculasController.create);
        this.router.put('/:id', peliculasController.update);
        this.router.delete('/:id', peliculasController.delete);
    }


}

const peliculasRoutes = new PeliculasRoutes();
export default peliculasRoutes.router;