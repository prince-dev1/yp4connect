import React, { useState } from 'react';

function PasswordInput({ value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-group mb-3">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <span
        className="input-group-text"
        style={{ cursor: 'pointer' }}
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
      </span>
    </div>
  );
}

export default PasswordInput;