const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args)=>
    import('node-fetch').then(({default : fetch}) => fetch(...args));
    const dotenv = require('dotenv');

    dotenv.config(); // Load environment variables from .env file
    
    const CLIENT_ID = "c1c15041b40cebc5271e";
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/getUserData', async function (req, res) {
    const authorizationHeader = req.get("Authorization");
    
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    try {
        const response = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
                "Authorization": authorizationHeader
            }
        });

        const data = await response.json();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getAccessToken', async function (req, res) {
    const code = req.query.code;
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;

    try {
        const response = await fetch("https://github.com/login/oauth/access_token" + params, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(4000, function () {
    console.log("Server is running on port 4000");
});
