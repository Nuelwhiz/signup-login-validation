export interface registered {
  fullname: string;
  email: string;
  country: string;
  phone: string;
  password: string;
  comfirmPassword: string;
}

export interface Signing {
  email: string;
  password: string;
}

export interface forgotMail {
  email: string;
}

export interface resetPassword {
  // email: string;
  password: string;
  comfirmPassword: string;
}
