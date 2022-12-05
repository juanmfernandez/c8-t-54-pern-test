const { db } = require("./utils/database.util");
const { app } = require("./app");

const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: false });
    console.log("Db connected");
    const PORT = process.env.PORT || 3000;
    console.log(
      "process.env.HOST ", process.env.HOST,
      " || ", "process.env.CLIENT_URL", process.env.CLIENT_URL,
      "process.env.SERVER", process.env.SERVER
    )
    app.listen(PORT, () => {
      console.log("Express app running", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
