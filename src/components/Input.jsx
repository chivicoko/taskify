import React from 'react';

const Input = ({ ref, type, value, onChange, onKeyDown }) => (
  <input ref={ref} type={type} value={value} onChange={onChange} onKeyDown={onKeyDown} />
);

export default Input;