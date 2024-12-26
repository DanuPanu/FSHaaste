import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createServer = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    })
    
    .get("/", async (_, res) => {
      try {
        const factories = await prisma.factory.findMany({
          include: { features: true },
        });
        res.json(factories);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch factories" });
      }
    })

    .get("/:name", async (req, res) => {
      try {
        const { name } = req.params; // Hakee tehtaan nimen parametrista
        const factory = await prisma.factory.findFirst({
          where: { name: name },
          include: { features: true }, // Sisällyttää ominaisuudet
        });
    
        if (!factory) {
          return res.status(404).json({ error: "Factory not found" });
        }
    
        res.json(factory);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch factory" });
      }
    })
    

    .post("/factories", async (req, res) => {
      const { name, features } = req.body;
      if (!name || !features || features.length === 0) {
        return res.status(400).json({ error: "Factory name and at least one feature are required" });
      }
    
      try {
        // Luo uusi tehdas
        const factory = await prisma.factory.create({
          data: {
            name,
            features: {
              create: features.map((featureName: string) => ({
                name: featureName,
              })),
            },
          },
          include: { features: true },
        });
    
        res.status(201).json(factory);
      } catch (error) {
        console.error("Error while adding factory:", error);
        res.status(500).json({ error: "Failed to create factory" });
      }
    })
    
    
    .patch("/features/:id", async (req, res) => {
      const { id } = req.params;
      const { state } = req.body; // Ominaisuuden uusi tila (boolean)

      if (typeof state !== "boolean") {
        return res.status(400).json({ error: "State must be a boolean value" });
      }

      try {
        // Päivitetään ominaisuuden state
        const updatedFeature = await prisma.feature.update({
          where: { id: Number(id) },
          data: { state },
        });

        res.status(200).json(updatedFeature);
      } catch (error) {
        res.status(500).json({ error: "Failed to update feature state" });
      }
    })
        
  return app;
};
