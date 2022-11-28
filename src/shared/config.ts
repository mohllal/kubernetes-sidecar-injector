export const environment = process.env.NODE_ENV || 'development';

export const httpPort = process.env.HTTP_PORT || 8010;

export const httpsPort = process.env.HTTPS_PORT || 8443;

export const httpsEnabled = process.env.HTTPS_ENABLED == 'true' || false;

export const tlsPrivateKeyFile = process.env.TLS_PRIVATE_KEY_FILE
  || '/var/run/secrets/certs/tls-private-key-file';

  export const tlsCertFile = process.env.TLS_CERT_FILE
  || '/var/run/secrets/certs/tls-cert-file';

export default {
  environment,
  httpPort,
  httpsPort,
  httpsEnabled,
  tlsPrivateKeyFile,
  tlsCertFile,
} as const;
