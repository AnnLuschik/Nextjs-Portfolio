import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import AddImageIcon from '@mui/icons-material/AddAPhotoOutlined';

import { uploadImage } from 'helpers';
import styles from 'components/forms/RegisterForm.module.css';

const SIGNATURE_MUTATION = gql`
  mutation createSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

const schema = yup
  .object({
    avatar: yup.mixed(),
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
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [createSignature] = useMutation(SIGNATURE_MUTATION);

  const [previewImage, setPreviewImage] = useState(null);

  const handleUpload = (event, field) => {
    field.onChange(event.target.files);
    if (event?.target?.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async (data) => {
    const { data: signatureData } = await createSignature();

    if (signatureData) {
      const { timestamp, signature } = signatureData.createImageSignature;
      const imageData = await uploadImage(data.avatar[0], signature, timestamp);

      onSubmit({
        ...data,
        avatar: imageData.secure_url
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreate)}>
      <div className="form-group">
        <Controller
          name="avatar"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <div className={styles.avatarPreview}>
                <label
                  htmlFor="avatar"
                  className={styles.avatarLabel}
                  aria-label="Upload avatar"
                >
                  <AddImageIcon fontSize="large" titleAccess="Upload avatar" />
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleUpload(e, field)}
                />
                {previewImage && (
                  <img src={previewImage} alt="Uploaded avatar" />
                )}
                {fieldState.error?.message && (
                  <p className="errorMessage"> {fieldState.error.message}</p>
                )}
              </div>
            );
          }}
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
        {errors.username && (
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
        {errors.email && (
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
        {errors.password && (
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
        {errors.passwordConfirmation && (
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
