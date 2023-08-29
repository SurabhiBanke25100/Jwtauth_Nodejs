const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/db");
const secretkey = "NOTESAPI";

async function Register(req, res) {

    const { user_name, email, password } = req.body;

    try {

        //Identifying  the user with the email Id  to check  whether the  user  is  existing user or not

        const existinguser = await User.findOne({
            where: { email: email }
        });

        if (existinguser) {
            res.status(400).json({ message: "User exists already" });
        }

        //ecrypt passwd
        const hashedpassword = await bcrypt.hash(password, 10);

        //user creation
        const result = await User.create({

            user_name: user_name,
            email: email,
            password: hashedpassword

        });

        //To check whether values are storing into the database
        //res.status(201).json({ message: "user profile created", NewUser: result });


        const payload = {

            username: result.user_name,
            email: result.email,

        };

        const options = {
            expiresIn: '1hr', // Token will expire in 1 hour
            algorithm: 'HS256' //algo used to verify jwt
        };


        //Token generation
        const token = await jwt.sign(payload, secretkey, options);

        res.status(201).json({ message: "Token generated", access_token: token, result: result });


    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'An error occurred' });

    }

}

module.exports = { Register };