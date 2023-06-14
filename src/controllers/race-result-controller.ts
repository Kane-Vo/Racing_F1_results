import express from "express";
import { BaseController } from "./abstractions/base-controller";
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
    console.log(123)
    return response.json({ message: "test"});
  };
}
