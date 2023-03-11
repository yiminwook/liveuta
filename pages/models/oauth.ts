import getConfig from "next/config";
import path from "path";
import fs from "fs/promises";
import process from "process";

const { publicRuntimeConfig } = getConfig();

export const credencial = {
  installed: {
    auth_client_id: publicRuntimeConfig.auth_client_id,
    auth_project_id: publicRuntimeConfig.auth_project_id,
    auth_auth_uri: publicRuntimeConfig.auth_auth_uri,
    auth_token_uri: publicRuntimeConfig.auth_token_uri,
    auth_auth_provider_x509_cert_url:
      publicRuntimeConfig.auth_auth_provider_x509_cert_url,
    auth_client_secret: publicRuntimeConfig.auth_client_secret,
    auth_redirect_uris: publicRuntimeConfig.auth_redirect_uris,
  },
};
