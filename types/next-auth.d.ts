import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    accessToken: string;
    user?: DefaultUser & any;
    refreshToken: string;
  }
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    user: any;
  }
}
