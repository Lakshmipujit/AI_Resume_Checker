const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");

const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });


router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),

    async (req, res) => {

        try {

            const filePath = path.join(
                __dirname,
                "..",
                req.file.path
            );

            const FormData = require("form-data");
            const fs = require("fs");

            const formData = new FormData();

            formData.append(
                "file",
                fs.createReadStream(filePath)
            );

            const response = await axios.post(
                "https://ai-resume-checker-1-1wzs.onrender.com",
                formData,
                {
                    headers: formData.getHeaders(),
                }
            );

            await Resume.create({

                user: req.user.id,

                filePath,

                extractedSkills:
                    response.data.matched_skills,

                score:
                    response.data.score,
            });

            res.json({

                score:
                    response.data.score,

                matched_skills:
                    response.data.matched_skills,

                missing_skills:
                    response.data.missing_skills,
            });

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message: err.message
            });
        }
    }
);


router.get(
    "/my-resumes",
    authMiddleware,

    async (req, res) => {

        try {

            const resumes = await Resume.find({
                user: req.user.id
            });

            res.json(resumes);

        } catch (err) {

            res.status(500).json({
                message: err.message
            });
        }
    }
);

module.exports = router;