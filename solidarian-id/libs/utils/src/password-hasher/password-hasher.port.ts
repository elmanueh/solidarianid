export abstract class PasswordHasherPort {
  // Este método cumple con la firma (text: string) => Promise<string>
  abstract hash(plainText: string): Promise<string>;

  // Método extra necesario para el Login (comparar), aunque el VO no lo use para crearse
  abstract compare(plainText: string, hashed: string): Promise<boolean>;
}
