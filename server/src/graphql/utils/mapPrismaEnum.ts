import {
  UserVerifyStatusEnum as UserVerifyStatusEnumPrisma,
  ProductGenderEnum as ProductGenderEnumPrisma,
} from "@prisma/client";
import {
  UserVerifyStatusEnum as UserVerifyStatusEnumGraphQl,
  ProductGenderEnum as ProductGenderEnumGraphQl,
} from "../generated.resolver";

export const mapPrismaUserRoleToGraphQL = (
  status: UserVerifyStatusEnumPrisma
) => {
  switch (status) {
    case "VERIFIED":
      return UserVerifyStatusEnumGraphQl.Verified;
    case "PENDING":
      return UserVerifyStatusEnumGraphQl.Pending;
    case "NOT_VERIFIED":
      return UserVerifyStatusEnumGraphQl.NotVerified;
    default:
      throw new Error(`Unknown user status verify: ${status}`);
  }
};

export const mapPrismaProductGenderToGraphQL = (
  gender: ProductGenderEnumPrisma
) => {
  switch (gender) {
    case "FEMALE":
      return ProductGenderEnumGraphQl.Female;
    case "MALE":
      return ProductGenderEnumGraphQl.Male;
    case "UNISEX":
      return ProductGenderEnumGraphQl.Unisex;
    default:
      throw new Error(`Unknown product gender: ${gender}`);
  }
};
