import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';

const CreatePortfolioForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    register('startDate');
    register('endDate');
  }, [register]);

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
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          showYearDropdown
          selected={startDate}
          onChange={handleDateChange('startDate', setStartDate)}
          id="startDate"
        />
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
        Create
      </button>
    </form>
  );
};

export default CreatePortfolioForm;
