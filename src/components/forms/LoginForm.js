import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required()
  })
  .required();

const LoginForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

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
        {errors.email?.message && (
          <p className="errorMessage">{errors.email.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="errorMessage"> {errors.password.message}</p>
        )}
      </div>
      <LoadingButton loading={isLoading} variant="contained" type="submit">
        Submit
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
