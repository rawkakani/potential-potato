import { logger } from "./helpers/index.js";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./controllers/todos.js";
import { headers, response, sendBody } from "./helpers/http.js";
import http from "node:http";


/**
 * Handles the incoming requests
 * @constructor
 * @param {object} res - This is node Response object.
 * @param {object} req - This is node Request object
 */
const middleware = async (res, req) => {
  const {
    method,
    path,
    searchParams,
    auth,
  } = headers(req);

  try {
    if (!auth) {
      throw new Error("No authorization header", { cause: { code: "401" } });
    }

    const page = searchParams.get("page");
    const search = searchParams.get("search");
    const id = searchParams.get("id");

    if (path === "/") {
      if (method === "GET") {
        const todos = await getTodos();

        if (todos) {
          let todoResults;

          if (search) {
            // this filter is only by text, it could be better by using something like 
            // orama search https://docs.oramasearch.com/
            todoResults = todos.filter((todo) => todo.title.includes(search));
          } else {
            // rudimentary paging
            const pageIndex = 10 * page;
            todoResults = todos.slice(pageIndex, pageIndex + 10);
          }
          return response(res, 200, todoResults);
        } else {
          return response(res, 404, "todos can not be found", "text/plain");
        }
      }

      if (method === "POST") {
        return sendBody(req, async (data) => {
          const createTodoRes = await createTodo(data);
          if (createTodoRes) {
            return response(res, 200, createTodoRes);
          } else {
            return response(
              res,
              400,
              "unable to create todo item",
              "text/plain",
            );
          }
        });
      }

      if (method === "PATCH") {
        return sendBody(req, async (data) => {
          const updateTodoRes = await updateTodo(id, data);
          if (updateTodoRes) {
            return response(res, 200, updateTodoRes);
          } else {
            return response(res, 400, "no such todo item", "text/plain");
          }
        });
      }

      if (method === "DELETE") {
        const deletedTodoStatus = deleteTodo(id);
        if (deletedTodoStatus) {
          return response(res, 202);
        } else {
          return response(res, 400, "no such todo to delete", "text/plain");
        }
      }

      throw new Error("method not implemented", { cause: { code: "501" } });
    } else {
      return response(res, 404, "endpoint unavailible", "text/plain");
    }
  } catch (err) {
    logger(err.message);
    return response(res, err.cause.code, err.message, "text/plain");
  }
};

const server = http.createServer((req, res) => {
  return middleware(res, req);
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(8000);
console.log("server started on http://localhost:8000");
