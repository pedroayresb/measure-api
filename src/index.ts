import dotenv from "dotenv";

import path from "path";

import server from "./server";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.APP_PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
