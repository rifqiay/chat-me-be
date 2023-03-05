const response = (res, result, status, message, success, pagination) => {
  const resultPrint = {};
  resultPrint.status = success ? "success" : "error";
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  res.status(status).json(resultPrint);
};

module.exports = { response };
