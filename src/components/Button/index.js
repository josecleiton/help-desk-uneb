import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = (props) => {
  const {
    type, children, color, width, height, background, onClick, fontSize,
  } = props;
  return (
    <button
      className="Generic-Button"
      type={type || 'button'}
      color={color}
      width={width}
      height={height}
      background={background}
      fontSize={fontSize}
      onClick={onClick}
      style={{
        width,
        height,
        background,
        color,
        fontSize,
      }}
    >
      {children}
    </button>
  );
};
Button.defaultProps = {
  children: 'default',
  width: '150px',
  height: '46px',
  background: 'rgb(7, 5, 136)',
  color: 'white',
  fontSize: '15px',
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
