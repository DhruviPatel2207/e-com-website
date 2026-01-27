import React, { useState } from 'react';
import Login from '../Login';
import SignUp from '../SignUp/SignUp';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default LoginPage;
