const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  const autHeader = req.headers.authorization;
  const errorMessage = {
    error: true,
    message: "Please Log In Again",
    responseData: { isAuth: false },
  };

  const token = autHeader.split(" ")[1];

  if (!autHeader || !autHeader.startsWith("Bearer") || token === undefined) {
    res.status(200).json({ ...errorMessage });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...payload };
    next();
  } catch (error) {
    console.log("404");
    res.status(400).json({ ...errorMessage });
  }
};

module.exports = checkAuth;
