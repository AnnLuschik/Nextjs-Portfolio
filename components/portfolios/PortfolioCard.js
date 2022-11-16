import { formatDate } from 'helpers';

const PortfolioCard = ({ data }) => {
  return (
    <div className="card subtle-shadow no-border">
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{data.jobTitle}</h6>
        <p className="card-text fs-6">{data.description}</p>
      </div>
      <div className="card-footer no-border">
        <small className="text-muted">
          {`${formatDate(+data.startDate)} — ${formatDate(+data.endDate)}`}
        </small>
      </div>
    </div>
  );
};

export default PortfolioCard;
