const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const { format, isMatch } = require("date-fns");

var isValid = require("date-fns/isValid");
const app = express();

app.use(express.json());

const initializeDBandServer = async () => {
  try {
    database = await open({
      filename: path.join(__dirname, "todoApplication.db"),
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch (error) {
    console.log(`Database error is ${error.Message}`);
    process.exit(1);
  }
};

initializeDBandServer();

const outPutResult = (dbObject) => {
  return {
    id: dbObject.id,
    todo: dbObject.todo,
    priority: dbObject.priority,
    category: dbObject.category,
    status: dbObject.status,
    dueDate: dbObject.due_date,
  };
};

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const secondQuery = `SELECT * FROM todo WHERE id = ${todoId};`;

  const responseResult = await database.get(secondQuery);
  response.send(outPutResult(responseResult));
});

app.get("/agenda/", async (request, response) => {
  const { date } = request.query;
  console.log(isMatch(date, "yyyy-MM-dd"));
  if (isMatch(date, "yyyy-MM-dd")) {
    const newDate = format(new Date(date), "yyyy-MM-dd");
    console.log(newDate);
    const thirdQuery = `select * from todo where due_date='${newDate}';`;
    const responseResult = await database.all(thirdQuery);
    response.send(responseResult.map((eachItem) => outPutResult(eachItem)));
  } else {
    response.status(400);
    response.send("Invalid Due Date");
  }
});

//API4

const priorityList = ["HIGH", "LOW", "MEDIUM"];
const statusList = ["TO DO", "IN PROGRESS", "DONE"];
const categoryList = ["WORK", "HOME", "LEARNING"];

app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status, category, dueDate } = request.body;

  if (!priorityList.includes(priority)) {
    return response.status(400).send("Invalid Todo Priority");
  }
  if (!statusList.includes(status)) {
    return response.status(400).send("Invalid Todo Status");
  }
  if (!categoryList.includes(category)) {
    return response.status(400).send("Invalid Todo Category");
  }
  if (!isMatch(dueDate, "yyyy-MM-dd")) {
    return response.status(400).send("Invalid Due Date");
  }

  const newDate = format(new Date(dueDate), "yyyy-MM-dd");

  const insertQuery = `
    INSERT INTO todo (id, todo, category, priority, status, due_date)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  await database.run(insertQuery, [
    id,
    todo,
    category,
    priority,
    status,
    newDate,
  ]);

  response.send("Todo Successfully Added");
});

// API5

app.put("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params; // fixed this
  const { todo, priority, status, category, dueDate } = request.body;

  const previousTodoQuery = `SELECT * FROM todo WHERE id = ?;`;
  const previousTodo = await database.get(previousTodoQuery, [todoId]);

  if (!previousTodo) {
    return response.status(404).send("Todo Not Found");
  }

  const updatedTodo = {
    todo: todo ?? previousTodo.todo,
    priority: priority ?? previousTodo.priority,
    status: status ?? previousTodo.status,
    category: category ?? previousTodo.category,
    dueDate: dueDate ?? previousTodo.due_date,
  };

  if (!priorityList.includes(updatedTodo.priority)) {
    return response.status(400).send("Invalid Todo Priority");
  }
  if (!statusList.includes(updatedTodo.status)) {
    return response.status(400).send("Invalid Todo Status");
  }
  if (!categoryList.includes(updatedTodo.category)) {
    return response.status(400).send("Invalid Todo Category");
  }

  const formattedDueDate = format(new Date(updatedTodo.dueDate), "yyyy-MM-dd");

  const updateQuery = `
    UPDATE todo
    SET todo = ?, priority = ?, status = ?, category = ?, due_date = ?
    WHERE id = ?;
  `;

  await database.run(updateQuery, [
    updatedTodo.todo,
    updatedTodo.priority,
    updatedTodo.status,
    updatedTodo.category,
    formattedDueDate,
    todoId,
  ]);

  if (status !== undefined) response.send("Status Updated");
  else if (priority !== undefined) response.send("Priority Updated");
  else if (todo !== undefined) response.send("Todo Updated");
  else if (category !== undefined) response.send("Category Updated");
  else if (dueDate !== undefined) response.send("Due Date Updated");
  else response.send("Todo Updated");
});

//API6
app.delete("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const deleteQuery = `DELETE FROM todo WHERE id =${todoId};`;

  await database.run(deleteQuery);
  response.send("Todo Deleted");
});

//API1

app.get("/todos/", async (request, response) => {
  try {
    const { search_q = "", priority, status, category } = request.query;
    const conditions = [];
    const values = [];

    if (priority) {
      if (!priorityList.includes(priority)) {
        return response.status(400).send("Invalid Priority");
      }
      conditions.push("priority = ?");
      values.push(priority);
    }

    if (status) {
      if (!statusList.includes(status)) {
        response.status(400).send("Invalid Status");
      }
      conditions.push("status = ?");
      values.push(status);
    }

    if (category) {
      if (!categoryList.includes(category)) {
        response.status(400).send("Invalid Category");
      }
      conditions.push("category = ?");
      values.push(category);
    }

    if (search_q) {
      conditions.push("todo LIKE ?");
      values.push(`%${search_q}%`);
    }

    let query = `SELECT * FROM todo`;
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const data = await database.all(query, values);
    response.send(data.map((item) => outPutResult(item)));
  } catch (error) {
    response.status(400).send("Server Error");
  }
});

module.exports = app;
