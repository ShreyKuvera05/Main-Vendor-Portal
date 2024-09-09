/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

function ResCheckBox({
  id,
  onchange,
  labelName,
  initialValue,
  headName,
  onValueChange,
  showLabel,
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const toggleValue = () => {
    const newValue = value === 1 ? 0 : 1;
    setValue(newValue);
    onValueChange(id, newValue);
    console.log(labelName + ": " + newValue);
  };

  return (
    <div className="status-toggle modal-status d-flex justify-content-between align-items-center">
      <span className="status-label">{headName}</span>
      <div className="d-flex align-items-center">
        <input
          type="checkbox"
          id={id}
          className="check"
          checked={value === 1}
          onChange={toggleValue}
        />
        <label htmlFor={id} className="checktoggle mb-0 me-1" />

        {showLabel.includes("yes") && (
          <span className="customer-toggle">{labelName}</span>
        )}
      </div>
    </div>
  );
}

export default ResCheckBox;
