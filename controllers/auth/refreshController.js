import Joi from 'joi'
import { RefreshToken } from '../../database/model'
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService'
import { REFRESH_SECRET, JWT_SECRET } from '../../config'
const refreshController = {
    async refresh (req, res, next) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        })

        const { error } = refreshSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        // check in database
        try {
            const isExist = await RefreshToken.count({ where: { token: req.body.refresh_token } });
            if (!isExist) {
                return next(CustomErrorHandler.unAuthorized('Invalid refresh token'))
            }
            const result = await JwtService.verify(req.body.refresh_token, REFRESH_SECRET)

            // genrate new accesstoken
            const payload = { user_id: result.user_id, role: result.role };
            const access_token = JwtService.sign(payload, '1y', JWT_SECRET);

            const refresh_token = req.body.refresh_token;

            return res.status(200).json({ refresh_token, access_token })
        } catch (error) {
            return next(error);
        }
    }
}


export default refreshController;