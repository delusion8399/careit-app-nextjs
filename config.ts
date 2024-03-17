const env = process.env.NEXT_PUBLIC_APP_ENV || "local";

const hosts: any = {
  local: "http://localhost:3003/api",
  development: "https://dev.careit.work/api",
  production: "https://app.careit.work/api",
};

const frontendUrl: any = {
  local: "http://localhost:3000/",
  development: "https://dev.careit.work/",
  production: "https://app.careit.work/",
};

export const HOST = hosts[env] || hosts.qa;

export const FRONTEND_URL = frontendUrl[env] || frontendUrl.local;
