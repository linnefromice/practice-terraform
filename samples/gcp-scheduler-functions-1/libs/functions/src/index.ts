import { http, HttpFunction } from "@google-cloud/functions-framework";
import escapeHtml from "escape-html";

const handler: HttpFunction = (req, res) => {
  const msg = req.query.name || req.body.name || "Functions Framework!";
  res.status(200).send(`Hello, ${escapeHtml(msg)}!`);
};

http("entry", handler);
