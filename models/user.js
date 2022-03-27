const mongoose = require("mongoose");
const passwordHasher = require("password-hash");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function () {
  this.password = passwordHasher.generate(this.password);
});

UserSchema.methods.checkPassword = function (password) {
  return passwordHasher.verify(password, this.password);
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      isAdmin: this.isAdmin,
      userId: this._id
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = mongoose.model("User", UserSchema);
