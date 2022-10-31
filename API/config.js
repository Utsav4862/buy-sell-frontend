import { getTkn } from "../Functions/token";

export const getConfig = async () => {
  let tkn = await getTkn();
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${tkn}`,
    },
  };
};
