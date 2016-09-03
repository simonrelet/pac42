'use strict';

import React from 'react';
import { Link } from 'react-router';

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to='/game'>Play</Link>
    </div>
  );
}

Login.displayName = 'Login';
