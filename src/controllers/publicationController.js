const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const Publication = require('../models/publication');
const multer = require("multer");

// router.use(authMiddleware);

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../../public/upload/");
    },
    filename: function (req, file, cb) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split(".")[1];

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = require("crypto").randomBytes(64).toString("hex");

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
    },
  });

let upload = multer({ storage });

router.post("/", upload.single("foto"), async (req, res) => {
    if(req.body.title.length >= 3){
        try {
            const { title } = req.body;
            const { filename, size } = req.file;
            const publication = await Publication.create({
                title: title,
                img: '/public/upload/' + filename,
            });
            return res.redirect('/publications');
        } catch (err) {
            return res.status(400).send({ error: "Erro ao adicionar nova publicação" + err });
        }
    } else {
        res.render("publications", { title: "O nome do arquivo deve conter pelo menos 3 caracteres!" });
    }
});


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