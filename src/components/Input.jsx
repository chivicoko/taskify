

import React from 'react';

const Input = ({ ref, type, value, onChange, onKeyDown, className, placeholder }) => (
  <input ref={ref} type={type} value={value} onChange={onChange} onKeyDown={onKeyDown} className={className} placeholder={placeholder} />
);

export default Input;

