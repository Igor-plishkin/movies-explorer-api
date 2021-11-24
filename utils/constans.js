const { NODE_ENV, JWT_SECRET } = process.env;

const constans = {
  JWT_SECRET: NODE_ENV === "production" ? JWT_SECRET : "secret-key",
  MONGO_URL: "mongodb://localhost:27017/moviesdb",
};

module.exports = constans;
