import express from "express";

const app = express();

app.use("/v1/*", (req, res, next) => {
  const { method, originalUrl, query, ip } = req;

  const requestData = {
    method,
    originalUrl,
    query,
    ip,
  };

  res.json(requestData);

  next();
});

app.listen(3000);
