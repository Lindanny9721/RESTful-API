const express = require("express");
const router = express.Router();

const comments = require("../data/comments");
const error = require("../utilities/error");

router
    .route("/")
    .get((req,res) => {
        res.json(comments);
    })
    .post((req, res, next) => {
        if (req.body.userId && req.body.postId && req.body.comment)
        {
            const comment = {
                id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
                userId: req.body.userId,
                postId: req.body.postId,
                body: req.body.comment,
            }
            comments.push(comment);
            res.json(comments[comments.length - 1]);
        }
        else {
            next(error(400, "Insufficent Data"));
        }
    })

    module.exports = router;