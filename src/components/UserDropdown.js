/* eslint-disable no-restricted-globals */
import { Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router';

function UserDropdown() {
  const history = useHistory();
  const DropdownCustom = (props) => <img {...props} class="nav-avatar" src="/user-avatar.png" alt="avatar" />

  const handleSignout = () => {
    localStorage.removeItem('token');
    location.href = '/login';
  };

  return (

    <Dropdown align={{ sm: 'end' }} drop='down'>
      <Dropdown.Toggle as={DropdownCustom}>
  
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="1" onClick={() => history.push('/setting')}>Setting</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={() => handleSignout()}>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
