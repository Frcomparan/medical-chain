import * as IPFS from "ipfs-core";
import fs from "fs";
import crypto from "crypto";
import { configMod } from "../../config/config.mjs";

// Crear una clave secreta compartida
const secretKey = Buffer.from(configMod.secretKey, "hex");

// Crear un vector de inicialización (IV) aleatorio
const iv = Buffer.from(configMod.iv, "hex");

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

const node = await IPFS.create();

export async function uploadIPFS(path, name) {
  // Cargar la imagen en la memoria como un Buffer
  const fileBuffer = fs.readFileSync(path);

  // Encriptar el contenido del archivo antes de subirlo.
  const encryptedData = encryptFile(fileBuffer);

  const fileAdded = await node.add({
    path: name,
    content: encryptedData,
  });

  console.log("Added file:", fileAdded.path, fileAdded.cid);

  return {
    hash: fileAdded.cid,
    encryptedSize: encryptedData.byteLength,
    name: name,
  };
}

export async function downloadIPFS(name, cid) {
  // Función para descargar la imagen.
  try {
    // Obtiene la imagen del hash.
    const chunks = [];
    for await (const chunk of node.cat(cid)) {
      chunks.push(chunk);
    }
    console.log(chunks);
    console.log(secretKey);
    console.log(iv);

    const encryptedBuffer = Buffer.concat(chunks);

    // Desencripta los datos de la imagen.
    const decryptedData = decryptFile(encryptedBuffer);

    // Crea un archivo local y escribe los datos de la imagen.
    const path = `uploads/${name}`;
    fs.writeFileSync(path, decryptedData, (err) => {
      if (err) throw err;
      console.log("Archivo descargada exitosamente!");
    });
    return path;
  } catch (err) {
    console.error(err);
  }
}
