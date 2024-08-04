import React from 'react';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await signIn('credentials', { email, password });
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login with Credentials</button>
      </form>
      <hr />
      <button onClick={() => signIn('github')}>Login with GitHub</button>
      <button onClick={() => signIn('google')}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
