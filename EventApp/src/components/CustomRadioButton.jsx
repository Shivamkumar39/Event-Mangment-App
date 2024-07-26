import React from 'react';

const CustomRadioGroup = ({ value, onChange, options }) => {
  const getTextColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'text-yellow-600'; // Yellow text for ongoing
      case 'upcoming':
        return 'text-green-600'; // Green text for upcoming
      case 'complete':
        return 'text-red-600'; // Red text for complete
      default:
        return 'text-gray-600'; // Default color
    }

  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-2 ${getTextColor(option.value)}`}
        >
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="form-radio"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CustomRadioGroup;
