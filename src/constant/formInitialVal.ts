export interface initialLoginVaue {
  email: "";
  password: "";
}

export interface initialSignupVaue {
  fullname: "";
  email: "";
  country: "";
  phone: "";
  password: "";
  comfirmPassword: "";
}
export type initialSignupPayload = Omit<initialSignupVaue, "comfirmPassword">;

export interface initialForgotVal {
  email: "";
}

export interface initialResetVal {
  password: "";
  comfirmPassword: "";
}
