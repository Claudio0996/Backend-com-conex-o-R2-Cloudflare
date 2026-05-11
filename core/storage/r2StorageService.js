const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { uuid } = require("uuidv4");

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

exports.upload = async ({ buffer, type }) => {
  if (!buffer) {
    throw {
      status: 404,
      message: "Arquivo não adicionado",
    };
  }

  const key = `${uuid()}.${type.split("/")[1]}`;

  const command = new PutObjectCommand({
    Key: key,
    Bucket: process.env.R2_BUCKET_NAME,
    Body: buffer,
    ContentType: type,
  });
  try {
    await client.send(command);
    const url = `${process.env.R2_PUBLIC_URL}/${key}`;
    return url;
  } catch (err) {
    console.log(err);
    throw {
      status: 500,
      message: "Erro ao inserir arquivo no servidor",
    };
  }
};

exports.delete = async (key) => {
  const command = new DeleteObjectCommand({
    Key: key,
    Bucket: process.env.R2_BUCKET_NAME,
  });

  try {
    await client.send(command);
  } catch (err) {
    console.log(err);
    throw {
      status: 500,
      message: "Erro ao excluir arquivo do servidor",
    };
  }
};
