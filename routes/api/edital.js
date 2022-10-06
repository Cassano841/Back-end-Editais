const express = require("express");
const router = express.Router();
const Editais = require("../../models/Edital");
const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'petra91@ethereal.email',
    pass: 'dMJV7KBHffZupPWGPE'
  }
})

//======== GET =============
router.get("/", async (req, res) => {
  try {
    const editais = await Editais.find();
    if (!editais) throw Error("Algo deu errado ao procurar o post!");
    res.status(200).json(editais);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET DESTAQUES =============
router.get("/destaques", async (req, res) => {
  try {
    const destaques = await Editais.find({ checked: true }).limit(3);
    if (!destaques) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(destaques);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});


//======== GET 5 LAST CREATED =============
router.get("/lastFivePostsCreated", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find().sort("-date").limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET 5 LAST UPDATED =============
router.get("/lastFivePostsUpdated", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find().sort("-date").limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET =============
router.get("/lastfiveEnsino", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find({ label: "Ensino" })
      .sort("-date")
      .limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== GET =============
router.get("/lastfiveExtensao", async (req, res) => {
  try {
    const lastFivePosts = await Editais.find({ label: "Extensão" })
      .sort("-date")
      .limit(5);
    if (!lastFivePosts) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(lastFivePosts);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});
//======== GET BY ID =============
router.get("/:id", async (req, res) => {
  try {
    const edital = await Editais.findById(req.params.id);
    if (!edital) throw Error("Algo deu errado ao procurar o edital!");
    res.status(200).json(edital);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== POST =============
router.post("/", async (req, res) => {
  const newEdital = new Editais(req.body);
  try {
    const edital = await newEdital.save();
    /*============== ENVIO DE EMAIL ===============*/
    const enviarEmail = {
      from: process.env.EMAIL,
      to: 'ninocb@gmail.com',
      subject: 'Teste de Envio de Email',
      text: `Teste de envio de email contendo ${edital.title} `
    }

    transportador.sendMail(enviarEmail, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log("Email enviado");
    })
    /*============== FINAL ENVIO DE EMAIL ===============*/

    console.log("Adicionado edital novo!");
    if (!edital) throw Error("Algo deu errado ao salvar o edital!");
    res.status(200).json(edital);
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== DELETE =============
router.delete("/:id", async (req, res) => {
  try {
    const edital = await Editais.findByIdAndDelete(req.params.id);
    console.log("Edital deletado com sucesso!");
    if (!edital) throw Error("Algo deu errado ao deletar o edital!");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({
      msg: err,
    });
  }
});

//======== FAVORITAR =============
router.patch("/:id", async (req, res) => {
  const edital = await Editais.findById(req.params.id);
  if (!edital) throw Error("Algo deu errado ao procurar o edital!");
  /*============== ENVIO DE EMAIL ===============*/
  const enviarEmail = {
    from: process.env.EMAIL,
    to: 'ninocb@gmail.com',
    subject: 'Teste de Envio de Email',
    text: `Teste de envio de email contendo ${edital.title} `
  }
  transportador.sendMail(enviarEmail, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`Email enviado referente ao edital ${edital.title}`);
  })
  /*============== FINAL ENVIO DE EMAIL ===============*/
  res.status(200).json(edital);
});



//======== PUT =============
router.put("/:id", async (req, res) => {
  const atualizar = (req.body);
  try {
    const action = await Editais.findOneAndUpdate(req.params.id, atualizar, {
      new: true
    });
    //console.log(action);
    if (!action) throw Error("Algo deu errado ao atualizar o edital!");
    res.status(200).json(action);
  } catch (err) {
    res.status(400).json({
      msg: err
    });
  }
});


module.exports = router;
