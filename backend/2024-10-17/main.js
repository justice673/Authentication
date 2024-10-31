const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/level4_auth')
    .then(connection => {
        
        const app = express();

        app.use(cors());

        app.use(express.json());

        const authRoute = require('./routes/auth.route');
        const adminRoute = require('./routes/admin.route');

        app.use('/api/auth', authRoute);
        app.use('/api/admin', adminRoute);

        app.listen(3000, () => {
            console.log("Application listening on http://localhost:3000");
            
        });
    })
    .catch(err => {
        console.error(err)
    });
