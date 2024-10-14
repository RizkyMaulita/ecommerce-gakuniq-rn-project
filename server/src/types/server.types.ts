import { ReqUserLoginType } from "./user.types";

export interface ServerContext {
  authN: () => Promise<ReqUserLoginType>;
}
