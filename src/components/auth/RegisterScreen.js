import React from 'react'
import validator from 'validator'

import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeError } from '../../actions/ui'
import { startRegisterWithEmailPaswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    //const state = useSelector( state => state.ui ); //Trae el state completo, con el .ui se selecciona solo eso (ui)
    const { msgError } = useSelector( state => state.ui ); //Trae el state completo, con el .ui se selecciona solo eso (ui)

    //console.log(  msgError );

    const [ formValues, handleInputChange ] = useForm({
        name: 'David',
        email: 'david@david.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid() ){
            dispatch( startRegisterWithEmailPaswordName(email, password, name) );
        }
    }

    const isFormValid = () => {

        if( name.trim().length === 0 ) {
            dispatch(setError('Name is required'));
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch(setError(' Password should be at least 6 characters and match each other'));
            return false;
        }
        dispatch(removeError());
        return true;
    }


    return (
        <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={ handleRegister }>

          {
              msgError && 
                (<div className="auth__alert-error">
                    { msgError }
                </div>)
          }

        <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={ name }
            className="auth__input"
            autoComplete="off"
            onChange={ handleInputChange }
        />

        <input 
            type="text" 
            placeholder="email" 
            name="email" 
            value={ email }
            className="auth__input"
            autoComplete="off"
            onChange={ handleInputChange }
        />

        <input 
            type="password" 
            placeholder="password" 
            name="password" 
            value={ password }
            className="auth__input"
            onChange={ handleInputChange }
        />

        <input 
            type="password" 
            placeholder="Confirm password" 
            name="password2" 
            value={ password2 }
            className="auth__input"
            onChange={ handleInputChange }
        />

        <button 
            type="submit"
            className="btn btn-primary btn-block mb-5"
        >
            Login
        </button>

        <Link 
            to="/auth/login"
            className="link"
        >
            Already Registered?
        </Link>
      </form>
    </>
    )
}
