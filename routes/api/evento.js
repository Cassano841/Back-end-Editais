const express = require('express');
const router = express.Router();
const Eventos = require('../../models/Evento');

//======== GET =============
router.get('/', async (req, res) => {
    try {
        const eventos = await Eventos.find();
        if(!eventos) throw Error('Algo deu errado ao procurar o evento!');
        res.status(200).json(eventos);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== GET BY ID =============
router.get('/:id', async (req, res) => {
    try {
        const evento = await Eventos.findById(req.params.id);
        if(!evento) throw Error('Algo deu errado ao procurar o evento!');
        res.status(200).json(evento);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== POST =============
router.post('/', async (req, res) => {
    const newEvent = new Eventos(req.body)
    try {
        const evento = await newEvent.save();
        console.log('Adicionado post novo!');
        if(!evento) throw Error('Algo deu errado ao salvar o evento!');
        res.status(200).json(evento);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== DELETE =============
router.delete('/:id', async (req, res) => {
    try {
        const evento = await Eventos.findByIdAndDelete(req.params.id);
        console.log('Evento deletado com sucesso!');
        if(!evento) throw Error('Algo deu errado ao deletar o evento!');
        res.status(200).json({ success: true });
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});
//======== PUT =============
router.patch('/:id', async (req, res) => {
    try {
        const evento = await Eventos.findByIdAndUpdate(req.params.id, req.body);
        if(!evento) throw Error('Algo deu errado ao atualizar o evento!');
        res.status(200).json(evento);
    } catch(err) {
        res.status(400).json({
            msg: err
        })
    }
});

module.exports = router;