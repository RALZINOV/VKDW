import React from 'react';

const Button = ({ children, onClick, title, className }) => {
  return (
    <button
      onClick={onClick}
      title={title || ''}
      className={`button ${className || ''}`}
    >
        {children}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.any,
  onClick: React.PropTypes.func,
  title: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Button;
