const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Publication = require('../models/publication');

router.use(authMiddleware);

router.get('/listar', async(req, res) => {
    try {
        const { title, img } = req.body;
        const publications = await Publication.find();
        return res.send({ publications });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar publicação' });
    }
});

router.get('/:id', async(req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        return res.send({ publication });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao buscar publicação' });
    }
});

router.post('/', async (req, res) => {
    try{
        const { title, img } = req.body;
        const publication = await Publication.create({ title, img, user: req.userId });

        return res.send({ publication });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao adicionar nova publicação' });
    }
});

router.delete('/:publicationId', async(req, res) => {
    try {
        await Publication.findByIdAndRemove(req.params.publicationId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar publicação' });
    }
});

module.exports = app => app.use('/publications', router);