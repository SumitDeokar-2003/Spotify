import musicModel from "../models/music_model.js";
import albumModel from "../models/album_model.js";
import uploadFile from "../services/storage_services.js"


export const createMusic = async (req, res) => {
    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer);

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id
    })

    res.status(201).json({
        message: "music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}

export const createAlbum = async (req, res) => {
        const {title, musicIds} = req.body

        const album = await albumModel.create({
            title: title,
            musics: musicIds,
            artist: req.user.id
        })

        res.status(201).json({message: "album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.musics
            }
        })
}

export const getAllMusic = async (req, res) => {
    try {
        const music = await musicModel.find().skip(1).limit(1).populate("artist");
        res.status(200).json({message: "music fetched successfully", music})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "problem in getMusic controller", error})
    }
}

export const getAllAlbums = async (req, res) => {
    try {
        const album = await albumModel.find().select("title artist").populate("artist", "username email");
        res.status(200).json({message: "album fetched successfully", album})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "prooblem in getAlbum controller", error})
    }
}

export const getAlbumById = async (req, res) => {
    try {
        const id = req.params.id
        const album = await albumModel.findById(id).populate("musics")
        res.status(200).json({message: "album fetched successfully", album})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "problem in getAlbumById controller"})
    }
}