import { useAuth } from '../hooks/use-auth.hook';
import { authService } from '../services/auth.service';
import { useForm } from '@tanstack/react-form';
import type React from 'react';

export const LoginPage: React.FC = () => {
  useAuth('bookList');
  const { handleSubmit, Field } = useForm({
    defaultValues: { username: '', password: '' },
    onSubmit: async ({ value }) => {
      await authService
        .login(value.username, value.password)
        .then(() => {
          window.location.href = '/books';
        })
        .catch(() => window.alert('Wrong username or password'));
    },
  });

  return (
    <div>
      <h1>Login</h1>
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
                onBlur={field.handleBlur}
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
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        </Field>
        <p />
        <button type='submit'>Login</button>
        <br />
        <a href='/register'>Register</a>
      </form>
    </div>
  );
};
