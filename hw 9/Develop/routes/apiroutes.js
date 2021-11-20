const util = require("util");
const router = require("express").Router();
const fs = require("fs");
const notes = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving notes
router.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for tips`);
  res.status(200).json(notes);
});

// POST Route for adding notes
router.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a tip`);

  const { title, text, id } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    notes.push(newNote);
    const final = JSON.stringify(notes);

    // Write the string to a file
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
