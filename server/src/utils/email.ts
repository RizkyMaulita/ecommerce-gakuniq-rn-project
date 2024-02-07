import config from "../config";

export function generateAddressEmail(username: string) {
  const prefix = config.EMAIL_PREFIX ? `.${config.EMAIL_PREFIX}` : "";

  return `${username}${prefix}@${config.EMAIL_DOMAIN}`;
}
