/* eslint-disable react/prop-types */

import { Passengers } from "../Components/Passengers";
import { Search } from "../Components/Search";
import { Tickets } from "../Components/Tickets";
import { Welcome } from "../Components/Welcome";
import "./StepsLayout.css";

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches("initial")) return <Welcome send={send} />;
    if (state.matches("search")) return <Search state={state} send={send} />;
    if (state.matches("tickets")) return <Tickets state={state} send={send} />;
    if (state.matches("passengers")) return <Passengers state={state} send={send} />;
    return null;
  };

  return <div className="StepsLayout">{renderContent()}</div>;
};
