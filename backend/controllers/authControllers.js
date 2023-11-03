const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleError = (err) => {
    console.log(err.message, err.code);

    let errors = { name: '', email: '', password: '' };

    //duplicate email
    if(err.code === 11000){
        errors.email = 'This email is already registered';
        return errors;
    }

    //validation errors
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

//creating jwt tokens
const createToken = (id) => {
    return jwt.sign({id}, 'nikhil secret key', {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports.post_signup = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
      };

    if(req.body.name){
        userData.name = req.body.name;
        User.schema.path('name').required(true);
    }

    try {
        const user = await User.create(userData);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRES_TIME });
        res.status(200).json({ Status: "Success" });
    } catch(err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}

module.exports.post_login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.COOKIE_EXPIRES_TIME });
        res.status(200).json({ Status: "Success" });
    } 
    catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}

module.exports.get_logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.json({ Status: "Sucess" });
}

module.exports.get_dashboard = (req, res) => {
    return res.json({Status: "Success", name: req.name});
}