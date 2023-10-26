const crypto = require("crypto");

async function performKeyExchange(publicKeyA, privateKeyB) {
  const sharedSecret = await crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: publicKeyA,
    },
    privateKeyB,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  return sharedSecret;
}

async function generateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256", // You can choose a different curve if needed
    },

    true,
    ["deriveKey"]
  );
  // console.log(keyPair);
  return keyPair;
}

async function deriveSharedSecret(sharedSecretKey) {
  const rawKey = await crypto.subtle.exportKey("raw", sharedSecretKey);
  return new Uint8Array(rawKey);
}

async function encryptData(data, sharedSecret, nonce) {
  // Import sharedSecret as a CryptoKey object
  const encryptionKey = await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );

  // Encrypt the data using the imported encryption key and nonce
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: nonce,
    },
    encryptionKey,
    data
  );

  // Return the ciphertext as Uint8Array
  return new Uint8Array(ciphertext);
}

// async function encryptData(data, encryptionKey, nonce) {
//     const ciphertext = await crypto.subtle.encrypt(
//     {
//     name: "AES-GCM",
//     iv: nonce,
//     },
//     encryptionKey,
//     data
//     );
//     return new Uint8Array(ciphertext);
//     }

async function decryptData(ciphertext, sharedSecret, nonce) {
  // Import sharedSecret as a CryptoKey object
  const decryptionKey = await crypto.subtle.importKey(
    "raw",
    sharedSecret,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );

  // Decrypt the ciphertext using the imported decryption key and nonce
  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: nonce,
    },
    decryptionKey,
    ciphertext
  );

  // Return the plaintext as Uint8Array
  return new Uint8Array(plaintext);
}

// async function decryptData(ciphertext, encryptionKey, nonce) {
//   const plaintext = await crypto.subtle.decrypt(
//     {
//       name: "AES-GCM",

//       iv: nonce,
//     },
//     encryptionKey,
//     ciphertext
//   );
//   return new Uint8Array(plaintext);
// }

async function main() {
  const key =
    "302a300506032b656e0321009101f242aa14be2dc24a50415b58217c4d8400b700d6222c554edc054fc7c965";
  //step 1
  const key1 = await generateKeyPair();
  const key2 = await generateKeyPair();

  //step 2
  const data1 = await performKeyExchange(key1.publicKey, key2.privateKey);
  console.log("data");
  console.log(data1);

  //step 3

  const sharedSecret = await deriveSharedSecret(data1);
  console.log(sharedSecret);

  // step 4
  const nonce = new Uint8Array(12); // A random nonce
  crypto.getRandomValues(nonce);
  const plaintextData = new TextEncoder().encode("Sohel is ");
  console.log(plaintextData);

  const ciphertext = await encryptData(plaintextData, sharedSecret, nonce);
  console.log("this is ciphertext");
  console.log(ciphertext);

  const decryptedData = await decryptData(ciphertext, sharedSecret, nonce);
  console.log("decryptedData");
  console.log(decryptedData);
  console.log("Decrypted Data:", new TextDecoder().decode(decryptedData));

  // console.log(key1);
  // console.log(key2);
}

main();
