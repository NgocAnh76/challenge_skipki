export const responseSuccess = (
  data: any = null,
  message: string = `Ok`,
  code: number = 200
) => {
  if (typeof code !== `number` || code < 100 || code > 599) code = 200;
  return {
    status: `success`,
    code: code,
    message: message,
    data: data,
  };
};

export const responseError = (
  message: string = `Internal Server Error`,
  code: number = 400
) => {
  if (typeof code !== `number` || code < 100 || code > 599) code = 400;
  return {
    status: `error`,
    code: code,
    message: message,
  };
};
