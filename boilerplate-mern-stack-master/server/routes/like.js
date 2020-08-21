const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


//=================================
//            Like
//=================================



  router.post("/getLikes", (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId : req.body.videoId}
    } else {
        variable = { commentId : req.body.commentId }
    }
    
    Like.find(variable)
        .exec((err, likes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, likes})
        })

  });

  router.post("/getDislikes", (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId : req.body.videoId}
    } else {
        varible = { commentId : req.body.commentId }
    }
    
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, dislikes})
        })

  });
  
  router.post("/upLike", (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId : req.body.videoId, userId : req.body.userId}
    } else {
        varible = { commentId : req.body.commentId, userId : req.body.userId }
    }
    
    // Like collection에 클릭정보를 넣는다.
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.status(400).json({success : false, err})

        // 만약에 Dislike가 이미 클릭되어있다면, Dislike -1
        Dislike.findOneAndDelete(variable)
            .exec((err, disLikeResult) => {
                if(err) return res.status(400).json({success:false. err})
                res.status(200).json({ success: true })
            })
    })

  });

  router.post("/unLike", (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId : req.body.videoId, userId : req.body.userId}
    } else {
        varible = { commentId : req.body.commentId, userId : req.body.userId }
    }
    
    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success : false, err})
            res.status(200).json({ success : true })
        })

  });

  router.post("/unDislike", (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId : req.body.videoId, userId : req.body.userId}
    } else {
        varible = { commentId : req.body.commentId, userId : req.body.userId }
    }
    
    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success : false, err})
            res.status(200).json({ success : true })
        })

  });

  router.post("/upDislike", (req, res) => {
    
    let variable = {}

    if(req.body.videoId) {
        variable = { videoId : req.body.videoId, userId : req.body.userId}
    } else {
        varible = { commentId : req.body.commentId, userId : req.body.userId }
    }
    
    // Like collection에 클릭정보를 넣는다.
    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if(err) return res.status(400).json({success : false, err})

        // 만약에 Like가 이미 클릭되어있다면, Like -1
        Like.findOneAndDelete(variable)
            .exec((err, likeResult) => {
                if(err) return res.status(400).json({success:false. err})
                res.status(200).json({ success: true })
            })
    })

  });
  

module.exports = router;
