const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   //   postId: {                //ID를 직접 제공하는건 안좋음
   //      type: Number,
   //      required: true,
   //      unique: true,
   //   },   
   postName: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
   },
   postDate: {
      type: Date,
      default: Date.now,
   },
   password: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true,
   }

});

schema.pre('save', function (next) {
   now = new Date();
   this.postDate = now;

   next();
})

module.exports = mongoose.model("Post", schema);