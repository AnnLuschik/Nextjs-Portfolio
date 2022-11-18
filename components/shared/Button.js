import Tooltip from '@mui/material/Tooltip';
import MuiButton from '@mui/material/Button';

const Button = ({
  text,
  disabled = false,
  tooltip = '',
  color = 'primary',
  onClick
}) => {
  const handleDisabledEvent = (event) => {
    event.preventDefault();
  };

  return (
    <Tooltip title={tooltip}>
      <MuiButton
        aria-disabled={disabled}
        onClick={disabled ? handleDisabledEvent : onClick}
        color={color}
        variant="contained"
      >
        {text}
      </MuiButton>
    </Tooltip>
  );
};

export default Button;
