import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

function App() {
  type form = {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  };

  const schema: ZodType<form> = z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email: z.string().email(),
    age: z.number().min(18).max(100),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20)
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

  const { register, handleSubmit, formState: { errors } } = useForm<form>({
    resolver: zodResolver(schema)
  });

  const SubmitData = (data: form) => {
    console.log(data);
  };

  return (
    <>
      <form action="" id="Form" onSubmit={handleSubmit(SubmitData)}>
        <div className="header">Register</div>
        <div className="inputs">
          <label htmlFor="firstName">FirstName</label>
          <input type="text" {...register('firstName')} />
          {errors.firstName && <label>{errors.firstName.message}</label>}
          <label htmlFor="lastName">LastName</label>
          <input type="text" {...register('lastName')} />
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} />
          <label htmlFor="age">Age</label>
          <input type="number" {...register('age')} />
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password')} />
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" {...register('confirmPassword')} />
        </div>
        <button type="submit" onClick={() => handleSubmit(SubmitData)}>Submit</button>
      </form>
    </>
  );
}

export default App;
