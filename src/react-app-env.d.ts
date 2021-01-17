/// <reference types="react-scripts" />

interface ITodo {
  title: string;
  date: string;
  description: string;
  status: boolean;
}

interface TodoProp extends ITodo {
  id: string;
}

interface RouteProps {
  isExact: boolean;
  path: string;
  Component: React.FC;
}

interface AuthContextInterface {
  currentUser: firebase.User;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  resetPassword: (email: string) => void;
  updateEmail: (email: string) => void;
  updatePassword: (password: string) => void;
}
