import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/addMovie', async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => console.log(`The server is listening on port: 3000`));