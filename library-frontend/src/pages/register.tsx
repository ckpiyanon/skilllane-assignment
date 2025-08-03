import { authService } from '../services/auth.service';
import { useForm } from '@tanstack/react-form';
import type React from 'react';

export const RegisterPage: React.FC = () => {
  const { handleSubmit, Field } = useForm({
    defaultValues: { username: '', password: '' },
    onSubmit: async ({ value }) => {
      await authService
        .register(value.username, value.password)
        .then(() => (window.location.href = '/login'))
        .catch(() => window.alert('Cannot register'));
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field name='username'>
          {(field) => (
            <>
              <label htmlFor={field.name}>Username: </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <Field name='password'>
          {(field) => (
            <>
              <label htmlFor={field.name}>Password: </label>
              <input
                type='password'
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <button type='submit'>Register</button>
        <br />
        <a href='/login'>Login</a>
      </form>
    </div>
  );
};
