import React, { useState, useEffect, useRef } from "react";
import { addCircleOutline, trashSharp } from "ionicons/icons";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonText,
  IonToggle,
} from "@ionic/react";

import firebase, { db } from "../utils/db";
import { useAuth } from "../utils/context";
import { addTodo, updateTodo, deleteTodo } from "../utils/FirebaseFunctions";

function HomePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoProp[]>([]);
  const todoTitleRef = useRef<HTMLIonInputElement | null>(null);
  const todoDateRef = useRef<HTMLIonInputElement | null>(null);
  const todoDescriptionRef = useRef<HTMLIonInputElement | null>(null);
  const [user, setUser] = useState<firebase.User | null>(null);

  function getTodos(uid: string) {
    db.collection("users")
      .doc(uid)
      .collection("todos")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const todo: TodoProp = { id: doc.id, ...(doc.data() as ITodo) };
          setTodos((prevState) => [...prevState, todo]);
        });
      })
      .catch((e) => console.error(e));
  }

  const auth = useAuth();

  function handleUpdate(todo: TodoProp) {
    updateTodo(todo, user!.uid);
    const tempTodos = todos;

    tempTodos.map((td) => {
      if (td.id === todo.id) {
        td.status = !todo.status;
      }

      return td;
    });

    setTodos(tempTodos);
  }

  function handleAdd() {
    setShowModal(false);

    console.log({
      title: todoTitleRef.current?.value,
      date: todoDateRef.current?.value,
    });

    const ToDo = {
      title: todoTitleRef.current?.value as string,
      date: todoDateRef.current?.value as string,
      description: todoDescriptionRef.current?.value as string,
      status: false,
    };

    todoTitleRef.current!.value = null;

    addTodo(ToDo, user!.uid);
    getTodos(user!.uid);
  }

  function handleDelete(todo: TodoProp) {
    deleteTodo(todo, user!.uid);

    const tempTodos = [];

    // eslint-disable-next-line array-callback-return
    for (const td of todos) {
      if (td.id !== todo.id) {
        tempTodos.push(td);
      }
    }

    setTodos(tempTodos);
  }

  useEffect(() => {
    const usr = auth?.currentUser;
    if (usr) {
      setUser(usr);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.uid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <IonGrid className="ion-grid-padding ion-grid-width">
      <IonRow>
        <IonButton onClick={() => setShowModal(true)}>
          <IonIcon icon={addCircleOutline} style={{ marginRight: "3px" }} />
          <IonText color="light">Create ToDo</IonText>
        </IonButton>
        <IonModal isOpen={showModal}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">ToDoTitle</IonLabel>
              <IonInput type="text" ref={todoTitleRef}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Time to Remind</IonLabel>
              <IonInput type="date" ref={todoDateRef}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Brief Description</IonLabel>
              <IonInput type="text" ref={todoDescriptionRef}></IonInput>
            </IonItem>
          </IonList>
          <IonButton onClick={() => handleAdd()}>Add ToDo</IonButton>
        </IonModal>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonList>
            {todos?.map((todo, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle color="danger">
                    <h2>{todo.title}</h2>
                    <IonToggle
                      checked={todo.status}
                      onIonChange={() => handleUpdate(todo)}
                    />
                  </IonCardTitle>
                  <IonCardSubtitle color="primary">{todo.date}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonContent>
                    <IonText color="secondary">{todo.description}</IonText>
                  </IonContent>
                  <IonButton color="danger" onClick={() => handleDelete(todo)}>
                    <IonIcon icon={trashSharp}></IonIcon>
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default HomePage;
