import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';

const schema = yup
  .object({
    title: yup.string().required(),
    company: yup.string().required(),
    companyWebsite: yup.string().required(),
    location: yup.string().required(),
    jobTitle: yup.string().required(),
    description: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string()
  })
  .required();

const PortfolioForm = ({
  onSubmit,
  initialData = {},
  buttonText = 'Create'
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    register('startDate');
    register('endDate');
  }, [register]);

  useEffect(() => {
    const { startDate, endDate } = initialData;
    if (startDate) {
      setStartDate(+startDate);
    }

    if (endDate) {
      setEndDate(+endDate);
    }
  }, [initialData]);

  const handleDateChange = (dateType, setDate) => (date) => {
    setValue(
      dateType,
      date ? new Date(date.setHours(0, 0, 0)).toISOString() : date
    );
    setDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register('title')}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
        {errors.title?.message && (
          <p className="errorMessage"> {errors.title.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          {...register('company')}
          name="company"
          type="text"
          className="form-control"
          id="company"
        />
        {errors.company?.message && (
          <p className="errorMessage">{errors.company.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          {...register('companyWebsite')}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"
        />
        {errors.companyWebsite?.message && (
          <p className="errorMessage">{errors.companyWebsite.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          {...register('location')}
          name="location"
          type="text"
          className="form-control"
          id="location"
        />
        {errors.location?.message && (
          <p className="errorMessage">{errors.location.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          {...register('jobTitle')}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"
        />
        {errors.jobTitle?.message && (
          <p className="errorMessage">{errors.jobTitle.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          {...register('description')}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description"
        />
        {errors.description?.message && (
          <p className="errorMessage">{errors.description.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          showYearDropdown
          selected={startDate}
          onChange={handleDateChange('startDate', setStartDate)}
          id="startDate"
        />
        {errors.startDate?.message && (
          <p className="errorMessage">{errors.startDate.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <DatePicker
          showYearDropdown
          selected={endDate}
          disabled={!endDate}
          onChange={handleDateChange('endDate', setEndDate)}
          id="endDate"
        />
      </div>

      <div className="form-group">
        {endDate ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDateChange('endDate', setEndDate)(null)}
          >
            No End Date
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleDateChange('endDate', setEndDate)(new Date())}
          >
            Set End Date
          </button>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
};

export default PortfolioForm;
