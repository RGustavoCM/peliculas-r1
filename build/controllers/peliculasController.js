"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PeliculasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const peliculas = yield database_1.default.query('SELECT * FROM pelicula');
            res.json(peliculas);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO pelicula set ?', [req.body]);
            res.json({ message: 'Pelicula Guardada' });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const peliculas = yield database_1.default.query('SELECT * FROM pelicula WHERE cvePelicula = ?', [id]);
            console.log(peliculas.length);
            if (peliculas.length > 0) {
                return res.json(peliculas[0]);
            }
            res.status(404).json({ text: "Esa Pelicula No Esta Aqui XD" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const peliVieja = req.body;
            yield database_1.default.query('UPDATE pelicula set ? WHERE cvePelicula = ?', [req.body, id]);
            res.json({ message: "La Pelicula Esta Actualizada" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM pelicula WHERE cvePelicula = ?', [id]);
            res.json({ message: "La Pelicula Fue Eliminada" });
        });
    }
}
const peliculasController = new PeliculasController;
exports.default = peliculasController;
