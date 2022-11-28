import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';

const schema = yup
  .object({
    avatar: yup.string(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().required()
  })
  .required();

const RegisterForm = ({ onSubmit, isLoading }) => {
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
        <label htmlFor="avatar">Avatar</label>
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
        {errors.username?.message && (
          <p className="errorMessage"> {errors.username.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="errorMessage"> {errors.email.message}</p>
        )}
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
        {errors.password?.message && (
          <p className="errorMessage"> {errors.password.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          type="password"
          className="form-control"
          id="passwordConfirmation"
          {...register('passwordConfirmation')}
        />
        {errors.passwordConfirmation?.message && (
          <p className="errorMessage"> {errors.passwordConfirmation.message}</p>
        )}
      </div>
      <LoadingButton loading={isLoading} variant="contained" type="submit">
        Submit
      </LoadingButton>
    </form>
  );
};

export default RegisterForm;
