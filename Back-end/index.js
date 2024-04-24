const express = require('express');
const cors = require('cors');
require('./DB/Config');
const Users = require('./DB/ModuleSchema/UsersSchema');
const Jwt = require('jsonwebtoken');
const jwtKey = 'Mern-Task';


const app = express();
app.use(express.json());
app.use(cors())


// SINGUP & REGISTER API START HERE
app.post('/registerrr', async (req, res) => {
    const { firstName, lastName, gender, email, password, confirmPassword } = req.body;

    // Check if all required fields are present
    if (!firstName || !email || !password || !confirmPassword) {
        return res.status(400).send("Missing required fields!");
    }

    try {
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return res.status(400).send("Email already exists!");
        }

        const createUser = new Users({ firstName, lastName, gender, email, password, confirmPassword });
        const result = await createUser.save();

        const sensitiveInfo = { ...result.toObject() };
        delete sensitiveInfo.password;
        delete sensitiveInfo.confirmPassword;



        console.log(result);
        return res.status(200).send("User registered successfully!");
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// SINGUP & REGISTER API END HERE


// LOGIN API END HERE
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Something is missing");
    }
    try {
        let user = await Users.findOne({ email });
        if (!user) {
            res.status(401).send("Invalid Email try Another email")
        }
        if (user.password !== password) {
            res.status(401).send("Invalid Password !")
        }
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "3h" }, (err, token) => {
                if (err) {
                    res.status(500).send({ result: "Something went wrong, Please try again" });

                } else {
                    return res.status(200).send({ user, auth: token })
                }
            })
        } else {
            res.send({ result: "No User Found!" })
        }

    } catch (error) {
        console.log("Error ", error);
        res.status(500).send("Internal Server error !");
    }
});




function tokenValidation(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please Provide Valid token !" })
            } else {
                next();
            }
        })
    }
    else {
        res.status(403).send({ result: "Pleace add token in headers !" })
    }
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server in runing on Port # ${PORT} `)
})