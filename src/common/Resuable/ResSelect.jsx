/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Select from "react-select";

const ResSelect = ({ options, onChange, placeholder, isMulti, id, value }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Select
      value={value}
      id={id}
      placeholder={placeholder}
      isMulti={isMulti}
      onChange={onChange}
      options={options}
    />
  );
};

export default ResSelect;

// HOW TO USE : -
{
  /* <ResSelect
  options={options2}
  value={selectedProduct.Teleseas}
  onChange={(selectedOption) =>
    handleSelectChange(selectedOption, "Teleseas", setSelectedProduct)
  }
  id="select21"
  isMulti={true}
  placeholder="Teleseas"
/>; */
}

// const handleSelectChange = (
//   selectedOption,
//   selectName,
//   setSelectedProduct
// ) => {
//   console.log("Name", selectName);
//   console.log("Shreydd", selectedOption);
//   setSelectedProduct((prevSelectedValues) => ({
//     ...prevSelectedValues,
//     [selectName]: selectedOption,
//   }));
// };

// const [selectedProduct, setSelectedProduct] = React.useState({
//   Teleseas: null,
// Gender: null,
// BloodGroup: null,
// Country: null,
// Department: null,
// Designation: null,
// Nationality: null,
// Types: null,
// });
