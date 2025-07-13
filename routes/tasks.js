import express from "express";

export default (connection) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.sendFile("../" + __dirname, "public", "index.html");
  });

  router.get("/tasks", async function (req, res) {
    const [tasks, fields] = await connection.query(
      "SELECT * FROM tasks ORDER BY task_index asc"
    );

    res.send({ tasks });
  });

  router.post("/tasks", async function (req, res) {
    const task = req.body.task;
    const is_finished = 0;

    if (!task || task == "") {
      return res.status(500).json({ error: "Tarefa vazia ou nula" });
    }

    try {
      const [rows] = await connection.query(
        "SELECT MAX(task_index) as maxIndex FROM tasks"
      );
      const task_index = (rows[0].maxIndex || 0) + 1;

      const [result] = await connection.query(
        "INSERT INTO tasks (title, is_finished, task_index) VALUES (?, ?, ?)",
        [task, is_finished, task_index]
      );
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  });

  router.post("/changeStatus", async function (req, res) {
    const id = req.body.taskId;

    connection.query(
      "UPDATE tasks SET is_finished = NOT is_finished WHERE id = ?",
      [id],
      (err) => {
        if (err) throw err;
        res.sendStatus(200);
      }
    );

    res.sendStatus(200);
  });

  router.delete("/deleteTask", async function (req, res) {
    const id = req.body.taskId;

    connection.query('DELETE FROM tasks WHERE id = ?', [id], err => {
        if(err) throw err
        res.sendStatus(200)
    });

    res.sendStatus(200);
  });

  return router;
};
