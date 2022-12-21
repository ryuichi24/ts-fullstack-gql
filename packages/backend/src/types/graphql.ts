import express from "express";

export type MyContext = {
  req: express.Request;
  res: express.Response;
};
