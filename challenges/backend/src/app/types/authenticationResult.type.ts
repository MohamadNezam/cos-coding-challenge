import { IError } from "./error.type";

export interface IAuthenticationResult {
  authenticated?: boolean;
  userId?: string;
  internalUserId?: number;
  internalUserUUID?: string;
  token?: string;
  type?: number;
  privileges?: string;
  userRole?: string;
  authenticationChallenge?: string;
  authenticationError?: IError;
}
