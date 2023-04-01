const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: string,
      required: true,
    },
    text: {
      type: string,
      required: true,
    },
    completed: {
      type: boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

module.export = mongoose.model("Note", noteSchema);
