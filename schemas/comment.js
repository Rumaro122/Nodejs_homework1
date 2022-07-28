const mongoose = require("mongoose");

const schema = new mongoose.Schema({

   //   commentsId: {
   //      type: Number,
   //      required: true,
   //      unique: true,
   //   },
   username: {
      type: String,
      required: true,  
   },
   commentDate: {
      type: Date,
      default: Date.now,
   },
   comment: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   postId: {                     //ObjectId와 populate을 써보려고 했으나 잘안됨
      type: String,
      required: true,
   },
});

// schema.virtual("commentId").get(function () {
//    return this._id.toHexString();
//  });
//  schema.set("toJSON", {
//    virtuals: true,
//  });

schema.pre ('save', function(next) {
   now = new Date();
   this.commentDate = now;

   next();
});

module.exports = mongoose.model("Comment", schema);