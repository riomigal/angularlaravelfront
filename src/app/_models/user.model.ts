export class User {
  constructor(private _name: string, private _email: string) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }
  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }
}
