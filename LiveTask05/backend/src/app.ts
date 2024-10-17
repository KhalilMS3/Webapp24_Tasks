import { error } from "console";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { isNameValid } from "./lib/validators";
const app = new Hono();

type Student = {
  id: string,
  name: string
}

let students = [
  { id: "1", name: "Ola Normann" },
  { id: "2", name: "Kari Normann" },
  { id: "3", name: "Khalil Sfouk" },
  { id: "4", name: "Marius Wallin" },
];
app.use("/*", cors());

// CRUD-logic 

// ? -- GET all students --
/* fetch("http://localhost:3999/api/students", {method: 'GET'}) */
app.get("/api/students", (c) => {
  return c.json(students)
});

// ? -- GET single student --
/* fetch("http://localhost:3999/api/students/$id", {method: 'GET'}) */
app.get("/api/students/:id", (c) => {
  const id = c.req.param("id")
  const student = students.filter((student) => student.id === id)
  return c.json(student)
});

// ? -- ADD a student --
/* when using fetch() we have to stringifiy the data to be able to add items, here students */
/* fetch("http://localhost:3999/api/students/$id", {method: 'POST', body: JSON.stringify(data)}) */
app.post("/api/students", async (c) => {
  // ? We use await here to wait for the body to render with data to be able to access to data we want
  const data = await c.req.json()
  const { name } = data

  // Validate if name has at least 5 character, contains a space and ends with "!" using isNameValid() function
  if (!isNameValid(name)) {
    // consistent structure for handling error responses
    return c.json({success: false, error: "Invalid name"}, {status: 400})
  }
  
    // consistent structure for handling success responses
  students.push({ id: crypto.randomUUID(), name })
  return c.json({success: true, data: students},{status: 201})
});

// ? -- DELETE a student --
/* fetch("http://localhost:3999/api/students/$id", {method: 'DELETE'}) */
app.delete("/api/students/:id", (c) => {
  const id = c.req.param("Id")
  students = students.filter(
    (student) => student.id !== id
  )
  return c.json(students)
});

// ? -- EDIT/UPDATE a student --
/* fetch("http://localhost:3999/api/students/$id", {method: 'PATCH',body: JSON.stringigfy(data)}) */
app.patch("/api/students/:id", async (c) => {
  const id = c.req.param("Id")
  // ? We use await here to wait for the body to render with data to be able to access to data we want
  const { name } = await c.req.json()
  students = students.map(
    (student) => student.id === id ? {...student, name} : student
  )
  return c.json(students)
});


// Use this in "Exam" to handle errors
app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});


export default app;
