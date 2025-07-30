const express = require("express");
const limiterRoutes = require("./routes/limiter");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", limiterRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
