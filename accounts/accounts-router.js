const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "err retrieving accounts", err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const account = await db.select("*").from("accounts").where({ id }).first();
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error" });
  }
});

router.post("/", async (req, res) => {
  postAcct = req.body;

  try {
    const newAcct = await db.insert(postAcct).into("accounts");
    res.status(201).json(newAcct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "db prob", error: error });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ updated: count });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "db problem", error: error });
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db.del().from("accounts").where({ id });
    count
      ? res.status(200).json({ deleted: count })
      : res.status(404).json({ message: "invalid id" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "database error", error: error });
  }
});

module.exports = router;