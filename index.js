import express from "express";
import cors from "cors";
import { createCrud, deleteCrud, getCrud, getCruds, updateCrud } from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/crud", async (req, res) => {
  try {
    const success = await getCruds();
    res.send(success);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving success");
  }
});

app.get("/crud/:id", async (req, res) => {
    const id = req.params.id;
  
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
  
    try {
      const success = await getCrud(id);
      if (!success.length) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.status(200).json(success[0]);
    } catch (err) {
      console.error("Error retrieving the note:", err);
  
      res.status(500).json({ error: "An error occurred while retrieving the note" });
    }
  });
  


app.put("/crud/:id", async (req, res) => {
    const id = req.params.id; 
  const { title, contents } = req.body; 

  try {
    const success = await updateCrud(id, title, contents);
    if (success) {
      res.status(200).send({ message: "Record updated successfully" });
    } else {
      res.status(404).send({ message: "Record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred" });
  }
  });

  app.post("/crud", async (req, res) => {
    const { title, contents } = req.body;
  
   
    if (!title || !contents) {
      return res.status(400).json({ error: "Title and contents are required" });
    }
  
    try {
      const success = await createCrud(title, contents);
  
     
      res.status(201).json({
        message: "Record updated successfully",
        success,
      });
    } catch (err) {
      console.error("Record not found", err);
  
     
      res.status(500).json({ error: "An error occurred"  });
    }
  });
  

app.delete("/crud/:id", async (req, res) => {
    const id = req.params.id; 
    try {
      const success = await deleteCrud(id);
      if (success) {
        res.status(200).send({ message: "Record deleted successfully" });
      } else {
        res.status(404).send({ message: "Record not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred" });
    }
  });




app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.code === 'ER_BAD_DB_ERROR') {
    res.status(500).send("Database connection error");
  } else if (err.code === 'ER_DUP_ENTRY') {
    res.status(400).send("Duplicate entry error");
  } else {
    res.status(500).send("An unexpected error occurred");
  }
});

app.listen(8080, () => {
  console.log("Server running on https://localhost:8080");
});
