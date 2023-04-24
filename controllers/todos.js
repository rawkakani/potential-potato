import { logger } from "../helpers/index.js";
const uri = "https://jsonplaceholder.typicode.com/todos";




/**
 * Gets the todos from jsonplaceholder
 */
export const getTodos = async () => {
  let res;
  try {
    res = await fetch(uri);
    return res.json();
  } catch (err) {
    logger(`unable to get todos : ${err.message} `);
    return false;
  }
};

/**
 * Create a mock todo item agains jsonplaceholder
 * @constructor
 * @param {object} data - This is the data of the todo that needs to be created
 * @param {string} data.title - This is the title of the todo
 * @param {boolean} data.completed - This indicates wheather or not the todo is completed
 */
export const createTodo = async (data) => {
  try {
    
    // I generally would use a schema validator like zod, or joi to prevent 
    // having to make checks like this
    if(typeof data !== 'object'){
      throw new Error('data is not an object')
    }

    const createRes = await fetch(uri, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return createRes.json();
  } catch (err) {
    logger(`unable to create todo item : ${err.message} `);
    return false;
  }
};


/**
 * mocks an update of a todo item agains jsonplaceholder
 * @constructor
 * @param {string} id - This is id of the todo to be updated
 * @param {object} data - This is the data of the todo that needs to be updated
 */
export const updateTodo = async (id, data) => {
  try {
    const updateRes = await fetch(`${uri}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    return updateRes.json();
  } catch (err) {
    logger(`unable to update todo item: ${err.message} `);
    return false;
  }
};


/**
 * mocks deletes a todo item agains jsonplaceholder
 * @constructor
 * @param {string} id - This is id of the todo to be deleted
 */
export const deleteTodo = async (id) => {
  try {
    const deleteRes = await fetch(`${uri}/${id}`, {
      method: "DELETE",
    });
    if (deleteRes.status === "200") {
      return true;
    }
    return false;
  } catch (err) {
    logger(`unable to delete todo item: ${err.message} `);
    return false;
  }
};
