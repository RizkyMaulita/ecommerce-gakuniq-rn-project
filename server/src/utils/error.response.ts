import { GraphQLError } from "graphql";

export enum ErrorCodeEnum {
  INVALID_LOGIN = "INVALID_LOGIN",
  INVALID_TOKEN = "INVALID_TOKEN",
  UNAUTHENTICATION = "UNAUTHENTICATION",
  BAD_REQUEST = "BAD_REQUEST",
}

type ErrorStatusCode = 400 | 401 | 403 | 404 | 500;

type ErrorInstanceType = {
  message: string;
  code: ErrorCodeEnum;
  statusCode: ErrorStatusCode;
};

export const generateInstanceError = ({
  message,
  code,
  statusCode,
}: ErrorInstanceType) => {
  return new GraphQLError(message, {
    extensions: {
      code,
      http: {
        status: statusCode,
      },
    },
  });
};
