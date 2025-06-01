import express from "express";
import cors from "cors";
import rootRouter from "./router/root.router";
import { PORT } from "./common/constant";
import { handleError } from "./common/helpers/error.helper";

const app = express();
const port = PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "google.com"],
  })
);

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(rootRouter);
app.use(handleError);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
