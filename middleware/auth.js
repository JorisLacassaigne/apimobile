const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const clientCodec = decodedToken.codec;
    req.auth = {
      codec: clientCodec,
    };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Vous n'êtes pas... Donc accès non autorisé." });
  }
};
