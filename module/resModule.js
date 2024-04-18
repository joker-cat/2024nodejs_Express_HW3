const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

function resSuccessWrite(res, status, data) {
  res.status(status).json({
    status,
    data,
  });
}

function resFaildWrite(res, status, message) {
  res.status(status).json({
    status,
    message,
  });
}

module.exports = { resSuccessWrite, resFaildWrite };
