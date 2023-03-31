const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const _ = require("lodash");


// API: Upload files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "storage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get("/upload", async (req, res, next) => {
    try {
        const storagePath = path.join(__basedir, "storage");
        const files = fs.readdirSync(storagePath);
        res.send(files);
    } catch (e) {
        res.sendStatus(500) && next(e);
    }
});

router.post("/upload", upload.single("file-key"), async (req, res, next) => {
    res.send({ message: "Uploaded successfully" });
});

//-----------------------------------------------

// API: others

router.get("/", function (req, res, next) {
    res.send("Hello world");
});

router.post("/echo", function (req, res, next) {
    res.send(req.body);
});

router.get("/lotto", function (req, res, next) {
    const lotto = require("../data/lotto.json");
    res.send(lotto);
});

router.get("/random", function (req, res, next) {
    const ran = _.random(10000, 999999, false);
    let app_id = `app_id_${ran}`;
    let app_key = `app_key_${ran}`;
    let consumer_id = `consumer_id_${ran}`;

    let obj = {
        "app_id": app_id,
        "app_key": app_key,
        "consumer_id": consumer_id
    }
    res.send(obj);
});

module.exports = router;