import express from "express";
import { BaseController } from "./abstractions/base-controller";
import { PrismaClient } from '@prisma/client'

interface CustomReqQuery {
  limit: string | '10',
  page: string | '1',
  driver: string | undefined,
  constructor: string | undefined
}

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
    const { limit, page, driver, constructor } = request.query as unknown as CustomReqQuery;
    const offset: number = parseInt(page) * parseInt(limit) - parseInt(limit);
    const condition: any = {
      take: parseInt(limit),
      skip: offset,
      include: {
        driver: true,
        constructors: true,
        fastestLap: true,
        time: true,
        circuit: true
      },
      orderBy: [
        {
          number: 'asc',
        }
      ],
    }
    const searchConstructor = JSON.stringify(constructor)
    const searchDriver = JSON.stringify(driver)

    if (searchConstructor !== undefined || searchDriver !== undefined) condition.where = {}

    if (searchDriver !== undefined) {
      condition.where.driver = {  
        some: {
          OR: [
            {
              givenName: {
                search: searchDriver 
              }
            },
            {
              familyName: {
                search: searchDriver 
              }
            }
          ]
        }
      }
    }

    if (searchConstructor !== undefined) {
      condition.where.constructors = {
        some: {
          name: {
            search: searchConstructor
          }
        }
      }
    }
    try {
      const results = await prisma.results.findMany(condition)
      return response.json({ data: results });

    } catch (error) {
      console.log(error)
    }
    
  
  };
}
