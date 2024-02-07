import { ReqUserLoginType } from "./user.types";

export type ServerContext = {
  authN: () => Promise<ReqUserLoginType>;
};
