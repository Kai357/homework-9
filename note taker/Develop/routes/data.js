const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();
const fs = require("fs");
const notes = require("../db/db.json");

router.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
  res.status(200).json(notes);
});

router.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a tip`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    notes.push(newNote);
    const final = JSON.stringify(notes);

    fs.writeFile(`./db/db.json`, final, (err) =>
      err
        ? console.error(err)
        : console.log(`Note has been written to JSON file`)
    );

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in adding note");
  }
});

module.exports = router;
