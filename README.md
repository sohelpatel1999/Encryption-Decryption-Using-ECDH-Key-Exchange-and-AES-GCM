# Encryption-Decryption-Using-ECDH-Key-Exchange-and-AES-GCM

ECDH (Elliptic Curve Diffie-Hellman) key exchange and AES-GCM (Advanced Encryption Standard Galois/Counter Mode) encryption/decryption are two cryptographic techniques often used together to establish secure communication channels over insecure networks. Let's break down how they work individually and then how they can be combined for secure communication.

ECDH Key Exchange:
Key Generation:

Each party (for example, Alice and Bob) generates an ephemeral ECDH key pair.
The key pair consists of a public key and a private key. The private key is kept secret, while the public key is shared.
Key Exchange:

Alice and Bob exchange their public keys.
Using their own private key and the received public key, they independently compute a shared secret.
The shared secret will be the same for both parties but practically impossible for an eavesdropper to calculate.
Shared Secret:

The shared secret is used as a basis for deriving encryption keys.
AES-GCM Encryption/Decryption:
Encryption:

AES-GCM is an authenticated encryption mode, providing both confidentiality and integrity.
A unique Initialization Vector (IV) is generated for each encryption operation.
AES-GCM encryption results in a ciphertext and an authentication tag.
The encryption key is derived from the shared secret obtained from ECDH key exchange.
Decryption:

The recipient uses the same shared secret to derive the decryption key.
The IV, ciphertext, and authentication tag are used along with the decryption key to decrypt the message.
The authentication tag is checked to ensure that the message has not been tampered with during transmission.
Combining ECDH Key Exchange and AES-GCM Encryption/Decryption:
Key Exchange:

Alice and Bob perform ECDH key exchange to obtain a shared secret.
Encryption:

They derive an encryption key from the shared secret.
When Alice wants to send a secure message to Bob, she uses AES-GCM encryption with the derived key and a unique IV to encrypt the message and generate an authentication tag.
Decryption:

Bob receives the ciphertext, IV, and authentication tag.
He uses the same shared secret to derive the decryption key.
Bob decrypts the ciphertext using AES-GCM decryption and checks the authentication tag to ensure the message's integrity.
