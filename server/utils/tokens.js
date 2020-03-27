import vault from './vault';
import {cipherEncrypt, cipherDecrypt, initializeVector} from './crypto';
import config from '../config/environment';

export async function tokenize(plaintext, userId) {
  const iv = await initializeVector(16);
  const encrypted = await cipherEncrypt(plaintext, iv, config.secrets.tokenEncryption);
  const concat = `${encrypted}${iv}`;
  return vault.create(concat, userId);
}

export async function detokenize(encryptedValue, userId) {
  const data = await vault.get(encryptedValue, userId);
  const value = data.value;
  const cipherText = value.slice(0, value.length - 16);
  const iv = value.slice(value.length - 16);
  const decrypted = await cipherDecrypt(cipherText, iv, config.secrets.tokenEncryption);
  return decrypted;
}
