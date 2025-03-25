import { authAtom } from "@/atoms/auth/auth-atom";
import Endpoint from "@mongez/http";

export const endpoint = new Endpoint({
  baseURL: "https://jsonplaceholder.typicode.com",

  setAuthorizationHeader: () => {
    if (authAtom.isLoggedIn()) {
      return `Bearer ${authAtom.getAccessToken()}`;
    }

    return "key some-api-key";
  },
});
