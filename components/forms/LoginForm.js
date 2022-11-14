import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('password')}
        />
      </div>
      <LoadingButton loading={isLoading} variant="contained" type="submit">
        Submit
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
