import React from "react";
import validator from 'validator'

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const { loading } = useSelector( state => state.ui );

  const [ formValues, handleInputChange ] = useForm({
    email: 'david@david.com',
    password: '123456'
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    if(isFormValid){
      dispatch( startLoginEmailPassword( email, password ) );
    }
  }

  const handleGoogleLogin = () => {
    dispatch( startGoogleLogin() );
  }

  const isFormValid = () => {
    if( !validator.isEmail( email ) ){
      dispatch( setError( 'Please write a correct email' ) );
      return false;
    }else if( password < 6 ){
      dispatch( setError( 'password must be at least 6 characters length' ) );
      return false;
    }
    dispatch( removeError );
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={ handleLogin }>
        <input 
            type="text" 
            placeholder="email" 
            name="email" 
            className="auth__input"
            autoComplete="off"
            value={ email }
            onChange={ handleInputChange }
        />

        <input 
            type="password" 
            placeholder="password" 
            name="password" 
            className="auth__input"
            value={ password }
            onChange={ handleInputChange }
        />

        <button 
            type="submit"
            className="btn btn-primary btn-block"
            disabled={ loading }
        >
            Login
        </button>

        <hr />

        <div className="auth__social-network">
          <p>Login with social networks</p>

          <div 
            className="google-btn"
            onClick={ handleGoogleLogin }
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link 
            to="/auth/register"
            className="link"
        >
            Create new account
        </Link>
      </form>
    </>
  );
};
