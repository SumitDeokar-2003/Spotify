import express from 'express'
import { createAlbum, createMusic, getAlbumById, getAllAlbums, getAllMusic } from '../controllers/music_controller.js';
import multer from 'multer';
import { authArtist, authUser } from '../middlewares/auth_middleware.js';
import limiter from '../limiter/limit.js';

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post('/upload', authArtist, upload.single("music"), createMusic)
router.post('/create-album',authArtist, createAlbum)
router.get('/', authUser, limiter, getAllMusic)
router.get('/album', authUser, getAllAlbums)
router.get('/albumById/:id', authUser, getAlbumById)

export default router