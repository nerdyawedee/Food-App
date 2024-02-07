const express = require('express');
const router = express.Router();
const user = require("../models/User.js");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "qwertyuioplkjhgfdsazxcvbnmlpoiu";

router.post('/createuser',
    // providing validation
    body('email', 'Incorrect Email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }), // password must be at least 5 chars long

    async (req, res) => {

        // verify the validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            await user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false, error: error.message });
        }
    });

// verifying login detais check 

router.post('/loginuser',
    // providing validation
    body('email', 'Incorrect Email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    async (req, res) => {
        // verify the validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            
            let userData = await user.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "try login with correct credential" });
            }
            const passwordcompare = await bcrypt.compare(req.body.password, userData.password);
            if (!passwordcompare) {
                return res.status(400).json({ errors: "try giving correct password" });
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false, error: error.message });
        }
    });


module.exports = router;