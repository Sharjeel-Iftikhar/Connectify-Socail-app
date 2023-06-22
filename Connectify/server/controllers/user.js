import User from '../models/User.js';

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

export const getUserFriends = async (req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(   // promise .all used because we are using multiple promises (API calls)
            user.friends.map((id) => User.findById(id)) // to get all the friends of the user
        );
        const formattedFriends = friends.map(({
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath
        }) => {
            return {
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath
            };
        });
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

export const addRemoveFriend = async (req,res) =>{
    try{
        const {id} = req.params;
        const {friendId} = req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        const isFriend = user.friends.includes(friendId); // to filter out the friend from the friends list
        if(isFriend){
            console.log("isFriend in IF");
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else{
            console.log("isFriend in ELSE");
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(({
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath
        }) => {
            return {
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath
            };
        });
        res.status(200).json(formattedFriends);

    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};