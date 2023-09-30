class TokenService {
  private static key = 'token';

  public static getToken(): string | null {
    return localStorage.getItem(this.key);
  }

  public static setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  public static removeToken(): void {
    localStorage.removeItem(this.key);
  }
}

export { TokenService };
