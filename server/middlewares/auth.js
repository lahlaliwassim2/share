import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if(!token) return  res.status(403).json({error: "Acces Denied"})
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.lenght).trimLeft()
        }
        const virified = jwt.virified(token, process.env.SECRET)
        req.user = virified
        next()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}