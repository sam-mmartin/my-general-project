import "dotenv/config";
import app from "./src/application/app.js";

const port = 3000;

app.listen(port, () => {
    console.log("Aplicação em execução...");
});