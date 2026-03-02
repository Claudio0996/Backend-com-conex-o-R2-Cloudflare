const { connectDb } = require("./config/db");

const startServer = async (server) => {
  try {
    const connectedDb = await connectDb();
    if (connectedDb) {
      server.listen(process.env.PORT);
      console.log("Servidor iniciado na porta: " + process.env.PORT);
    }
  } catch (err) {
    console.error("Erro ao iniciar o servidor: ", err.message);
    process.exit(1);
  }
};

module.exports = { startServer };
