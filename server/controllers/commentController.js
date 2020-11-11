// import Popup from "../models/popupModel.js";
const Comment = require("../models/commentModel").Item;

const addCommentData = async(req,res) => {
    const comment = req.body;
    if (!comment) {
      return res.status(200).send({
        error: "Comment data not found",
      });
    }
    await new Comment(comment).save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
}

const findCommentData = async(req,res) => {
  console.log("yo yo");
  await Comment.find({}, (err, data) => {
    if (err)
      return res.status(200).send({
        message: err.message || "An unknown error occurred",
      });
    res.json(data);
  });
}

const getCommentsByClass = async(req,res) => {
  // console.log("yo");
  const _class_ = req.query.class;
  // console.log(_class_);

  await Comment.find({class:_class_})
  .then(comment => {
    if (!comment) {
      return res.status(200).send({
        error: "Comment not found with a course code: " + _class_,
      });
    }
    res.json(comment);
  })
  .catch((err) => {
    res.status(200).send({
      error: err.message || "An unknown error has occurred.",
    });
  });

  // await Comment.find({class:_class_}, (err, data) => {
  //   if (err)
  //     return res.status(200).send({
  //       message: err.message || "An unknown error occurred",
  //     });
  //   res.json(data);
  // });
}



// const getCommentsByProf = async(req,res) => {



// }

module.exports = {
    addCommentData: addCommentData,
    // findCommentData: findCommentData,
    getCommentsByClass: getCommentsByClass
}