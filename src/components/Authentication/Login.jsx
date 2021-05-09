import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Login.css';

export default function Login({ setToken }) {
  const [petKey, setPetKey] = useState();
  const [petSecret, setPetSecret] = useState();

  async function fetchToken(auth) {
    const petFinderKey = auth.petKey.toString();
    const petFinderSecret = auth.petSecret.toString();
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', petFinderKey);
    params.append('client_secret', petFinderSecret);
    const petfinderRes = await fetch(
      'https://api.petfinder.com/v2/oauth2/token',
      {
        method: 'POST',
        body: params,
      }
    );
    const data = await petfinderRes.json();
    setToken(data.access_token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchToken({
      petKey,
      petSecret,
    });
  };

  return (
    <div className='login-wrap'>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type='text' onChange={(e) => setPetKey(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type='password'
            onChange={(e) => setPetSecret(e.target.value)}
          />
        </label>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
