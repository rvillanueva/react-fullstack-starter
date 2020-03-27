import VaultClient from './vault-client';
import config from '../config/environment';

const vaultClient = new VaultClient(config.vault.url, config.vault.secret);

export default vaultClient;
