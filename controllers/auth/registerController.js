import Joi from 'joi';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import { Users } from "../../database/model"
import bcrypt from 'bcrypt'
import JwtService from '../../services/JwtService'

const registerController = {
    async register (req, res, next) {
        /*
        check list
        [*] validate req
        [*] authorise req
        [*] check if user is in the database or not
        [*] make model
        [*] store in database
        [*] genrate jwt tokens
        [*] send appropriate response
        */

        // validate req
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email_id: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            confirm_password: Joi.ref('password')

        });

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // check the use email is in database or not

        const { name, email_id, password } = req.body;
        try {
            const isExist = await Users.count({ where: { email_id } })
            if (isExist) {
                return next(CustomErrorHandler.allreadyExist("This email is already exist"));

            }


        } catch (error) {
            return next(error)
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // prepare model

        const user = {
            name,
            email_id,
            password: hashedPassword
        }

        let access_token = "";
        try {
            const result = await Users.create(user);


            //create token
            const payload = { user_id: result.user_id, role: result.role };

            access_token = JwtService.sign(payload);



        } catch (error) {
            return next(error);
        }

        res.status(200).json({ access_token })

    }
}

export default registerController;