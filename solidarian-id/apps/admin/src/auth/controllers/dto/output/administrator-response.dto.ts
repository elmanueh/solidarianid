export class AdministratorResponseDto {
  fullName: string;
  email: string;
  phone: string;

  public constructor(fullName: string, email: string, phone: string) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
  }
}
