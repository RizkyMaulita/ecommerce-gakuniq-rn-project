export type UserType = {
  id: string;
  username: string;
  email: string;
  statusVerify?: UserVerifyStatusEnum;
  fullName?: string;
  imgUrl?: string;
  dob?: string;
  roleId?: string;
  addresses?: [UserAddressType];
};

export enum UserVerifyStatusEnum {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  NOT_VERIFIED = "NOT_VERIFIED",
}

export type UserAddressType = {
  address: string;
  province: string;
  provinceId?: string;
  city: string;
  cityId?: string;
  subDistrict?: string;
  subDistrictId?: string;
  zipCode: string;
  latitude?: string;
  longitude?: string;
  benchmark?: string;
  contactName: string;
  contactPhoneNumber: string;
  tag?: UserAddressTagEnum;
  isMainAddress: boolean;
};

export enum UserAddressTagEnum {
  HOME = "HOME",
  OFFICE = "OFFICE",
}
