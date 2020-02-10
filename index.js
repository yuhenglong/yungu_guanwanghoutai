const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("users", UserSchema);
// connnect mongodb
mongoose
    .connect(
        'mongodb://localhost:27017/databaset', { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.post("/api/sendEmail", (req, res) => {
    const newUserSchema = new User({
        username: req.body.username,
        pwd: req.body.pwd,
        email: req.body.email
    })
    newUserSchema.save().then(user => {
        res.status(200).json({
            state: "success",
            msg: "数据库添加成功",
            data: user
        })
    })
});
const port = 5000;
app.listen(port, () => {
    console.log(`express is running and listening for ${port}`)
})