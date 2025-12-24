import { NavLink } from "react-router-dom";
import { routes } from "../../configs/routes";
import "./sidepanel.css";

const Sidepanel = () => {
  return (
    <div className="side-panel">
      {routes.map((route) => {
        return (
          <NavLink
            key={route.key}
            to={route.path}
            className="menu-item"
            
          >
            {route.name}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidepanel;
