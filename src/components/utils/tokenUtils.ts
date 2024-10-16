import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
  role: string;
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    // Gọi hàm jwtDecode với kiểu trả về là TokenPayload
    return jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
