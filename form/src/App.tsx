import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

function App() {
  const {
    register,
    handleSubmit,
    formState : {isSubmitting, errors},
    reset,
    getValues
  } = useForm()

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} action="" id="Form" >
        <div className="header">Register</div>
        <div className="inputs"
        >
          <label htmlFor="firstName">FirstName</label>
          <input type="text" 
            {
              ...register('firstName', {
                required : "firstname is required",
                minLength : {
                  value : 2,
                  message : "firstName should me at least 2 characters"
                }
              })
            }
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <label htmlFor="lastName">LastName</label>
          <input type="text" 
          {
            ...register('lastName', {
              required : "LastName is required",
              minLength : {
                value : 2,
                message : "lastName should me at least 2 characters"
              }
            })
          }
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <label htmlFor="email">Email</label>
          <input type="email" 
            {
              ...register('email', {
                required : "email is required",

              })
            }
          />
          <label htmlFor="age">Age</label>
          <input type="number"
            {
              ...register('age', {
                min : {
                  value : 18,
                  message : "You should me 18 or higher"
                }
              })
            }
          />
           {errors.age && <p>{errors.age.message}</p>}
          <label htmlFor="password">Password</label>
          <input type="password"  
            {
              ...register('password', {
                minLength : {
                  value : 8,
                  message : "Password must be at least 8 characters"
                }
              })
            }
          />
          {errors.password && <p>{errors.age.password}</p>}
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" 
            {
              ...register('confirmPassword', {
                minLength : {
                  value : 8,
                  message : "must be at least 8 characters"
                },
                validate : (value) => 
                  value === getValues('password') || "Passwords do not much"
                
              })
            }
          />
          {errors.confirmPassword && <p>{errors.age.confirmPassword}</p>}
        </div>
        <button 
        disabled={isSubmitting}
        type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
