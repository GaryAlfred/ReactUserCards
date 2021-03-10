import * as React from "react";
import "./app.component.scss";
import UserCardList from "./users/user-card-list.component";

export default function App() {
  return (
    <div className="App">
      <UserCardList />
    </div>
  );
}
