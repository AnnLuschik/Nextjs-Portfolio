import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="avater">Avatar</label>
        <input
          type="text"
          className="form-control"
          id="avatar"
          {...register('avatar')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          {...register('username')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          {...register('email')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          autoComplete="new-password"
          {...register('password')}
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          type="password"
          className="form-control"
          id="passwordConfirmation"
          {...register('passwordConfirmation')}
        />
      </div>
      <LoadingButton loading={isLoading} variant="contained" type="submit">
        Submit
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;