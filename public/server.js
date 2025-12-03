import express from 'express';
const app = express();
app.use("/private", express.static("private"));
app.use(express.static("public")); 
app.use(express.json());

import {getNotes, getNote, createNote, updateNote, deleteNote, updateCheck} from '../private/database.js' 


app.get("/all", async (req, res) => {
    const notes = await getNotes();
    res.json(notes);
});

app.get("/get/:id", async (req, res) => {
    const { id } = req.params;
    const note = await getNote(id);
    res.json(note);
})

app.post("/create", async (req, res) => {
 const { title, episodes, viewing_status, release_status, isCheck, date_created, time_created } = req.body;
 const note = await createNote(title, episodes, viewing_status, release_status, isCheck, date_created, time_created);
 res.send(note);
})

app.post("/rename/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const note = await updateNote(id, title);

  res.send(note);
});

app.put("/checked/:id", async (req, res) => {
  const { id } = req.params;
  const { isCheck } = req.body;
  console.log(isCheck)
  
  const note = await updateCheck(id, isCheck);
  res.send(note);
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const note = await deleteNote(id);
  res.send(note);
});





app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});


