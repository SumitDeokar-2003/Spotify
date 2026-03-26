import cookieParser from 'cookie-parser';
import express from 'express'
import authRoutes from './routes/auth_routes.js'
import musicRoutes from './routes/music_route.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)

export default app;