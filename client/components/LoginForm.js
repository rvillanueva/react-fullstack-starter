import React from 'react';
import {func} from 'prop-types';

const LoginForm = ({onSubmit, onChange, email, password}) => {
  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} name="email" value={email}/>
      <input onChange={onChange} type="password" name="password" value={password}/>
      <input type="submit" value="Login" />
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: func.isRequired,
  onChange: func.isRequired
};

export default LoginForm;
