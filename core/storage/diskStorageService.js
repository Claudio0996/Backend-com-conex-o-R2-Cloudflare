const { writeFile, unlink } = require("fs").promises;
const { join } = require("path");
const { uuid } = require("uuidv4");

exports.createImage = async ({ buffer, type }) => {
  try {
    const fileName = `${uuid()}.${type.split("/")[1]}`;

    await writeFile(join(process.cwd(), "uploads", fileName), buffer);

    const publicUrl = `${process.env.SERVER_URL}/uploads/${fileName}`;

    return publicUrl;
  } catch (err) {
    throw {
      status: 500,
      message: "Erro ao inserir arquivo no servidor",
    };
  }
};

exports.deleteImage = async (publicUrl) => {
  try {
    const fileName = publicUrl.split("/").pop();
    const fullPath = join(process.cwd(), "uploads", fileName);
    await unlink(fullPath);
  } catch (err) {
    throw {
      status: 500,
      message: "Erro ao excluir arquivo do servidor",
    };
  }
};
