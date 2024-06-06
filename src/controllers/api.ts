import { Application, Request, Response } from "express";
import { scrapeData } from "../scraper";

export const loadApiEndpoints = (app: Application): void => {
  app.get("/api", async (req: Request, res: Response) => {
    try {
      const url = "https://www.balenciaga.com/es-mx/hombre/accesorios/joyas";
      const data = await scrapeData(url);
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send("Error occurred while scraping data");
    }
  });
};
