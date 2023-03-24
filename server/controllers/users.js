import User from '../models/User'

export const getUser = async (req, res) => {
    try {
        const {id}=req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const getUserFrinds = async (req, res) => {
    try {
        const {id} = req.params
    const user = await User.findById(id)

    const frinds = await Promise.all(
        user.friends.map((id)=> User.findById(id))
    )
    const formattedFriends = frinds.map(
        ({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath}
        }
    )
    res.status(201).json(formattedFriends)

    } catch (error) {
        res.status(500).json({error: error.message})
    }

}


export const addRemoveFrind = async (req, res) => {
    try {
        const {id, friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)) {
            user.friends = user.frinds.filter((id)=> id !== friendId)
            friend.friends = friend.friends.filter((id)=> id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()
        const frinds = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )
        const formattedFriends = frinds.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        )
        res.status(201).json(formattedFriends)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}