import express from "express";
import { PrismaClient } from "@prisma/client";

export type MyContext = {
  req: express.Request;
  res: express.Response;
  prismaClient: PrismaClient;
};
