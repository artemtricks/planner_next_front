import Cookie from "js-cookie";

export enum EnumToken {
  "ACCESS_TOKEN" = "accessToken",
  "REFRESH_TOKEN" = "refreshToken",
}

export const getAccessToken = () => {
  const accessToken = Cookie.get(EnumToken.ACCESS_TOKEN);

  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  Cookie.set(EnumToken.ACCESS_TOKEN, accessToken, {
    domain: "localhost",
    sameSite: "strict",
    expires: 1,
  });
};

export const removeToken = () => {
  Cookie.remove(EnumToken.ACCESS_TOKEN);
};
