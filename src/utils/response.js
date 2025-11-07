
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};



export const errorhandling = ({ res, status = 500, error, stack }) => {
  if (!res) {
    throw new Error("Missing response object (res) in errorhandling");
  }

  return res.status(status).json({
    success: false,
    message: error?.message || "Internal Server Error",
    stack,
  });
};


export const successResponse = ({ res, data = {}, message = "", status = 200 }) => {
  // تأكد إن res موجود
  if (!res) {
    throw new Error("Missing response object (res) in successResponse");
  }

  return res.status(status).json({
    success: true,
    message,
    data,
  });
};




