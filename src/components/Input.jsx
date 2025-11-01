import React from 'react';

const Input = React.forwardRef(({ ...props }, ref) => (
  <input ref={ref} {...props} className="form-control" />
));

export default Input;
