import { FC } from "react";

import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import UserForm from "./components/Form/form";

const Task3: FC = () => {
  const store = setupStore();
  return (
    <Provider store={store}>
      <UserForm />
    </Provider>
  );
};

export default Task3;
