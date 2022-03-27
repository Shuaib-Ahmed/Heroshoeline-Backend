const User = require("../models/user");

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const existData = await User.find({ email: data.email });

    // check duplicate emails
    if (existData.length) {
      res.status(200).json({ error: true, message: "Email Already Exist" });
      return;
    }

    await User.create(data);
    res.status(201).json({ error: false, message: "Successfuly Sign Up" });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Something Went Wrong Plaese Try Again" });
  }
};

const checkUser = async (req, res) => {
  const data = req.body;
  try {
    const existData = await User.find({ email: data.email });

    // check emails exist
    if (!existData.length) {
      res
        .status(200)
        .json({ error: true, message: "Email Not Exist Please Sign Up" });
      return;
    }

    // check password
    if (!existData[0].checkPassword(data.password)) {
      res.status(200).json({ error: true, message: "Incorrect Password" });
      return;
    }

    // create jwt token
    const token = existData[0].createJWT();
    const responseData = {
      token,
      name: existData[0].name,
      isAdmin: existData[0].isAdmin
    };

    res
      .status(201)
      .json({ error: false, message: "Successfuly Log In", responseData });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: "Something Went Wrong Plaese Try Again" });
  }
};

module.exports = { createUser, checkUser };
