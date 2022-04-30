import PrivateRouter from "Pages/private";
import PublicRouter from "Pages/public";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/reducer";

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => {
    return state.user.accessToken !== "";
  });
  if (!isLoggedIn && false) return <PublicRouter />;
  return <PrivateRouter />;
};

export default App;
