const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  roles: [
    {
      type: string,
      default: "employee",
    },
  ],
  active: {
    type: boolean,
    default: true,
  },
});

module.export = mongoose.model("User", userSchema);
