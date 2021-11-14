/* eslint-disable no-restricted-globals */
import { useState } from "react"

const Login = () => {
  const [username, setUsername] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', username.replace('user', ''));
    location.href = '/';
  }

  return (
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 login-page">
      <h1 class="mb-5">Login</h1>
      <form onSubmit={handleSubmit}>
        <div class="row m-0">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} class="form-control mb-3" placeholder="Username (user1/user2/user3)" />
          <button type="submit" class="btn btn-primary col-12">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login