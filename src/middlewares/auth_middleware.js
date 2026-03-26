import jwt from 'jsonwebtoken'

export const authArtist = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== 'artist'){
            return res.status(403).json({message: "you don't have access to create music"})
        }

        req.user = decoded
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Unauthorized", error})
    }
}

export const authUser = async (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        res.status(401).json({message: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({message: "you don't have access"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Unauthorized", error})
    }
}