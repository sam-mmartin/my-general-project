import express from "express"

const app = express();
app.use(express.json());

const posts = [
    {
        id: 1,
        content: "post 1"
    },
    {
        id: 2,
        content: "post 2"
    },
    {
        id: 3,
        conten: "post 3"
    }
];

app.get("/", (req, res) => {
    res.status(200).send("Meu projeto Geral.");
});

app.get("/index", (req, res) => {
    res.status(200).json(posts);
});

app.get("/index/:id", (req, res) => {
    const search = posts.filter((p) => p.id === Number(req.params.id));
    console.log(search)
    if (search.length > 0) {
        res.status(200).json(search);
    } else {
        res.status(404).send("Post não encontrado");
    }
});

export default app;