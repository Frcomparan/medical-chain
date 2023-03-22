import * as IPFS from "ipfs-core";
import fs from "fs";
import crypto from "crypto";

// Crear una clave secreta compartida
const secretKey = crypto.randomBytes(32);

// Crear un vector de inicialización (IV) aleatorio
const iv = crypto.randomBytes(16);

// Función para encriptar un archivo utilizando CryptoJS.
function encryptFile(data) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return encrypted;
}

// Función para desencriptar un archivo utilizando CryptoJS.
function decryptFile(data) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted;
}

export async function uploadIPFS(path) {
  const node = await IPFS.create();

  // Cargar la imagen en la memoria como un Buffer
  const fileBuffer = fs.readFileSync(path);

  // Encriptar el contenido del archivo antes de subirlo.
  const encryptedData = encryptFile(fileBuffer);

  const fileAdded = await node.add({
    path: "cat_encrypted.jpg",
    content: encryptedData,
  });

  console.log("Added file:", fileAdded.path, fileAdded.cid);
  // Función para descargar la imagen.
  try {
    // Obtiene la imagen del hash.
    const chunks = [];
    for await (const chunk of node.cat(fileAdded.cid)) {
      chunks.push(chunk);
    }
    const encryptedBuffer = Buffer.concat(chunks);

    // Desencripta los datos de la imagen.
    const decryptedData = decryptFile(encryptedBuffer);

    // Crea un archivo local y escribe los datos de la imagen.
    fs.writeFile("uploads/file.pdf", decryptedData, (err) => {
      if (err) throw err;
      console.log("Imagen descargada exitosamente!");
    });
    return "file.pdf";
  } catch (err) {
    console.error(err);
  }
}
