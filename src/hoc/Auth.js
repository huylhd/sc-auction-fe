/* eslint-disable no-restricted-globals */
import { useEffect } from "react"
import { Link } from "react-router-dom";
import UserDropdown from "../components/UserDropdown";

const Wrapper = Component =>
  function Auth(props) {
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        location.href = '/login';
      }
    }, []);
    return (
      <>
        <nav class="navbar justify-content-between px-md-5 px-3 mb-5">
          <Link to="/"><img class="nav-logo" src="/logo.png" alt="logo" /></Link>
          <span class="justify-content-center align-items-center">
            <span class="me-2">user{ localStorage.getItem('token') }</span>
            <UserDropdown />
          </span>
        </nav>
        <Component {...props} />
      </>
    )
  };

export default Wrapper