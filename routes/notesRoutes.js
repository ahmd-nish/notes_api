const router = require('express').Router();
const Notes = require('../models/notesModal');
const {validateToken} = require('../middlewear/authentication');

//API to get all the notes
router.get('/',validateToken, async(req, res) => {
    const notes = await Notes.find();
    res.send(notes);
});

//API to create a note
router.post('/',validateToken, async(req, res) => {

    if (!req.body.Title || !req.body.Content) {
        return res.status(400).send('Please provide title and content.');
    }

    const note = await Notes.create(req.body);

    res.status(200).send(note);
   
});

//API to update a note
router.put('/:id',validateToken, async(req, res) => {
    const id = req.params.id;

    const note = await Notes.findById(id);

    if (!note){
        return res.status(404).send('Note is not found.');
    }

    const updatedNote = await Notes.findByIdAndUpdate(id, req.body, {new: true});

    res.send("Note updated successfully." );
});


//API to get notes related to a specific user
router.post('/:id',validateToken, async(req, res) => {
    const id = req.params.id;

    const note = await Notes.find({SubId: id});

    if (!note){
        return res.status(404).send('Note is not found.');
    }

    res.send(note );
});

//API to get single note related to a specific id
router.post('/single/:id',validateToken, async(req, res) => {
    const id = req.params.id;

    const note = await Notes.findById(id);

    if (!note){
        return res.status(404).send('Note is not found.');
    }

    res.send(note );
});


//API to delete a note
router.post('/delete/:id',validateToken, async(req, res) => {
   const id = req.params.id;

   const note = await Notes.findByIdAndDelete(id);


    return res.status(200).send('successfully deleted.');

});

module.exports = router;