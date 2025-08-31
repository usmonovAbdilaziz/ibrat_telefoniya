export const handleError = (res, error, code = 500) => {
  const errorMessage = error.message ? error.message : error;
  return res.status(code).json({
    statusCode: code,
    message: errorMessage || "Internal Server Error",
  });
};

export const successMessage = (res, resData, code = 200) => {
  return res.status(code).json({
    statusCode: code,
    message: "Success",
    data: resData || null,
  });
};