import app from "./app";
import { getEnv } from "./config/environments";

const port = getEnv("PORT");

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
