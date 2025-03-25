import { SignInSchema } from "@/schema/auth/sign-in-schema";
import { SignUpSchema } from "@/schema/auth/sign-up-schema";
import { AuthResponse, UserData } from "@/types/auth";
import { endpoint } from "@/utils/endpoints";
import { atom } from "@mongez/react-atom";
import { AxiosError } from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { z } from "zod";

type AuthAtom = {
  isLoading: boolean;
  data: UserData | null;
};

type AuthActions = {
  /**
   * register
   */
  register: (data: z.infer<typeof SignUpSchema>, onSuccess: () => void) => void;
  /***
   * login
   */
  login: (data: z.infer<typeof SignInSchema>, onSuccess: () => void) => void;
  /***
   * logout
   */
  logout: (onSuccess: () => void) => void;
  /**
   * get user
   */
  getUser: () => UserData | null;
  /***
   * get access token
   */
  getAccessToken: () => string;
  /***
   * is logged in
   */
  isLoggedIn: () => boolean;
};

export const authAtom = atom<AuthAtom, AuthActions>({
  key: "auth-atom",
  default: {
    isLoading: false,
    /***
     * get user from cookie
     */
    data: Cookie.get("user") ? JSON.parse(Cookie.get("user") as string) : null,
  },

  beforeUpdate(newValue) {
    /***
     * save user data in the cookie
     */
    Cookie.set("user", JSON.stringify(newValue.data));

    return newValue;
  },

  actions: {
    async register(
      values: z.infer<typeof SignUpSchema>,
      onSuccess: () => void,
    ) {
      try {
        /***
         * start loading
         */
        authAtom.change("isLoading", true);

        /***
         * register user
         */
        const { data } = await endpoint.post<AuthResponse>(
          "/auth/register",
          values,
        );

        /***
         * set user data
         */
        authAtom.change("data", {
          ...data.user,
          accessToken: data.token,
        });

        /***
         * show success message
         */
        toast.success("Account created successfully");

        /***
         * redirect to create workspace
         */
        onSuccess();
      } catch (error) {
        if (error instanceof AxiosError) {
          /***
           * show error message
           */
          toast.error(error.response?.data.message);
        } else {
          /***
           * show generic error message
           */
          toast.error("something went wrong");
        }
      } finally {
        /***
         * stop loading
         */
        authAtom.change("isLoading", false);
      }
    },

    async login(values: z.infer<typeof SignInSchema>, onSuccess: () => void) {
      try {
        /***
         * start loading
         */
        authAtom.change("isLoading", true);

        /***
         * login user
         */
        const { data } = await endpoint.post<AuthResponse>(
          "/auth/login",
          values,
        );

        /***
         * set user data
         */
        authAtom.change("data", {
          ...data.user,
          accessToken: data.token,
        });

        /***
         * call the onSuccess callback
         */
        onSuccess();

        /***
         * show success message
         */
        toast.success("Logged in successfully");
      } catch (error) {
        if (error instanceof AxiosError) {
          /***
           * show error message
           */
          toast.error(error.response?.data.message);
        } else {
          /***
           * show generic error message
           */
          toast.error("something went wrong");
        }
      } finally {
        /***
         * stop loading
         */
        authAtom.change("isLoading", false);
      }
    },
    /***
     * logout
     */
    logout(onSuccess: () => void) {
      /***
       * clear user data
       */
      authAtom.change("data", null);

      /***
       * clear cache to remove selected workspace
       */
      // cache.clear();
      Cookie.remove("user");

      /***
       * call the onSuccess callback
       */
      onSuccess();

      /***
       * show success message
       */
      toast.success("Logged out successfully");
    },
    /***
     * get user
     */
    getUser() {
      return authAtom.value.data;
    },
    /***
     * get access token
     */
    getAccessToken() {
      return authAtom.value?.data?.accessToken;
    },
    /***
     * is logged in
     */
    isLoggedIn() {
      return authAtom.value.data !== null;
    },
  },
});
