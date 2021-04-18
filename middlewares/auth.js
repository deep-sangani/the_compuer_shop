import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from '../services/JwtService'
const auth = async (req, res, next) => {

    let authHeader = req.headers.authorization;


    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(" ")[1];

    try {
        const { user_id, role } = await JwtService.verify(token);
        const user = {
            user_id,
            role
        }
        req.user = user;
        next();

    } catch (error) {
        return next(CustomErrorHandler.unAuthorized());
    }


}

export default auth;