import "./nav.css";

const NavConstructor = ({ children, state, onSubmit }) => {
  
  return (
      <form className={`${state? "open" : "close"} nav-constructor` }  onSubmit={onSubmit}>
        {children}
      </form>
  );
};

export default NavConstructor;