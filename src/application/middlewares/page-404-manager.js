function page404Manager(req, res, next) {
    res.status(404).json({ message: "Página não encontrada" });
}

export default page404Manager;