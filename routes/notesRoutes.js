const router = require('express').Router();
const Notes = require('../models/notesModal');


router.get('/', async(req, res) => {
    const notes = await Notes.find();
    res.send(notes);
});


router.post('/', async(req, res) => {

    if (!req.body.Title || !req.body.Content) {
        return res.status(400).send('Please provide title and content.');
    }

    const note = await Notes.create(req.body);

    res.status(200).send(note);
   
});


router.put('/:id', async(req, res) => {
    const id = req.params.id;

    const note = await Notes.findById(id);

    if (!note){
        return res.status(404).send('Note is not found.');
    }

    const updatedNote = await Notes.findByIdAndUpdate(id, req.body, {new: true});

    res.send("Note updated successfully." );
});


router.get('/:id', async(req, res) => {
    const id = req.params.id;

    const note = await Notes.find({SubId: id});

    if (!note){
        return res.status(404).send('Note is not found.');
    }

    res.send(note );
});

router.get('/single/:id', async(req, res) => {
    const id = req.params.id;

    const note = await Notes.findById(id);

    if (!note){
        return res.status(404).send('Note is not found.');
    }

    res.send(note );
});



router.delete('/:id', async(req, res) => {
   const id = req.params.id;

   const note = await Notes.findByIdAndDelete(id);


    return res.status(200).send('successfully deleted.');

});

module.exports = router;