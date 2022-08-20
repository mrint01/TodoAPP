const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      },
    text: {
        type: String,
        required: true,
      },
    completed: {
      type: Boolean,
      default: false
    },
   
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("Todo", schema);
