const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
