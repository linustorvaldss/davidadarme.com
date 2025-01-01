const Vault = require('hashi-vault-js');
const fs = require('fs');

const RoleId = process.env.VAULT_ROLE_ID;
const SecretId = process.env.VAULT_SECRET_ID;

const vault = new Vault.RoleId( {
    https: true,
    baseUrl: 'http://127.0.0.1:8200',
    apiVersion: "v1",
    rootPath: 'secret',
    timeout: 5000,
    proxy: false
});

export default vault;