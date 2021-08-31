export class User {
  constructor(
    private _name: string,
    private _token: string,
    private _roles: string[]
  ) {}

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get token(): string {
    return this._token;
  }

  public set token(password: string) {
    this._token = password;
  }

  public get roles(): string[] {
    return this._roles;
  }

  public set roles(roles: string[]) {
    this._roles = roles;
  }
}
