import Joi from "joi";
import { Users, RefreshToken } from "../../database/model"
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config'

const loginController = {
    async login (req, res, next) {

        // validation
        const loginSchema = Joi.object({
            email_id: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })

        const { error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const { email_id, password } = req.body;
        try {
            const result = await Users.findOne({ where: { email_id } })

            if (!result) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            //compare password
            const match = await bcrypt.compare(password, result.password);


            if (!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            //token

            const payload = { user_id: result.user_id, role: result.role };

            const access_token = JwtService.sign(payload);
            const refresh_token = JwtService.sign(payload, '1y', REFRESH_SECRET);

            // refresh token database whitelist
            await RefreshToken.create({ token: refresh_token })


            res.status(200).json({ access_token, refresh_token })

        } catch (error) {
            return next(error)
        }
    }
}

export default loginController;