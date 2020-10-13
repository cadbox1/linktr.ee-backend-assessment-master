import express from "express";
import bodyParser from "body-parser";
import { linkRouter } from "./link/link-router";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());

app.use("/links", linkRouter);

// @ts-ignore
app.get("/", async (req, res) => {
	res.send("Hello world");
});

export default app;