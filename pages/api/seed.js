import User from "../../models/userModel"
import db from "../../utils/connect"
import data from "../../utils/data"

const handler = async (req, res) => {
    await db.connect()
    await User.deleteMany()
    await User.insertMany(data.users)
    await db.disconnect()
    res.send({message: "Users seeded successfully"})
}

export default handler