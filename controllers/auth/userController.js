import { Users } from "../../database/model"
import CustomErrorHandler from "../../services/CustomErrorHandler"

const userController = {
    async me (req, res, next) {
        try {

            const user = await Users.findOne({ attributes: { exclude: ["createdAt", "updatedAt"] }, where: { user_id: req.user.user_id } })
            if (!user) {
                return next(CustomErrorHandler.notFound());
            }

            res.json(user);
        } catch (error) {
            return next(error)
        }
    }
}

export default userController;