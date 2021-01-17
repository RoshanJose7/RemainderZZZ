import { db } from "./db";

export async function addTodo(todo: ITodo, uid: string) {
  await db
    .collection("users")
    .doc(uid)
    .collection("todos")
    .add({
      ...todo,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

export async function updateTodo(todo: TodoProp, uid: string) {
  await db
    .collection("users")
    .doc(uid)
    .collection("todos")
    .doc(todo.id)
    .update({
      status: !todo.status,
    })
    .then(function () {
      console.log("Status updated!!!");
    })
    .catch((e) => console.error(e));
}

export async function deleteTodo(todo: TodoProp, uid: string) {
  await db
    .collection("users")
    .doc(uid)
    .collection("todos")
    .doc(todo.id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}
