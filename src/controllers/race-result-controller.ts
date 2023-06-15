import express from "express";
import { BaseController } from "./abstractions/base-controller";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class RaceResultController extends BaseController {
  public path = "/races";

  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.list);
  }

  list = async (request: express.Request, response: express.Response) => {
    console.log(request.query)
    // const limit:  = request.query.limit ?? 3;
    // const page:  = request.query.limit ?? 1;
    // const offset: number = page * limit - limit;

    const allUsers = await prisma.results.findMany({
      // take: limit,
      // skip: offset,
      include: {
        driver: true,
        constructors: true,
        fastestLap: true,
        time: true,
        circuit: true,
        _count: true
      },
    })
  
    return response.json({ message: allUsers});
  };
}
