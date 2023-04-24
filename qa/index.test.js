import test from "node:test";
import assert from "assert";
import { getTodos, createTodo } from "../controllers/todos.js";

test("todos controller", async (t) => {
  await t.test("return a list of 200 todos ", async () => {
    const todos =  await getTodos()
    assert.strictEqual(todos.length, 200);
  });

  await t.test("create a todo item ", async () => {
    const newTodo = {
      title: 'test todo',
      completed: false,
      userId: 1,
      id: 201
    }

    const createdTodo =  await createTodo(newTodo)    
    assert.deepEqual(createdTodo, newTodo);
  });


  await t.test("return false if unable to create todo item ", async () => {
    const newTodo =  'this is not an object'

    const createdTodo =  await createTodo(newTodo)
    assert.strictEqual(createdTodo, false);
  });

  // I normally would mock the api request
  // I normally write tests to cover every return in a method or function
});
