import { useState } from "react";
import Select from "react-select";

interface ControlsProps {
  setUsersList: React.Dispatch<React.SetStateAction<any>>;
  usersList: any[];
}

const Controls: React.FC<ControlsProps> = ({ usersList, setUsersList }) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];
  
  const [fieldValue, setFieldValue] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('');

  const handleFieldChange = (selectedOption: any) => {
    if (selectedOption) {
      setFieldValue(selectedOption.value);
      sortUsersList(selectedOption.value, sortValue);
    }
  };

  const handleSortChange = (selectedOption: any) => {
    if (selectedOption) {
      setSortValue(selectedOption.value);
      sortUsersList(fieldValue, selectedOption.value);
    }
  };

  const sortUsersList = (field: string, direction: string) => {
    let sortedList = [...usersList];
    
    if (field === 'name' || field === 'email') {
      sortedList.sort((a, b) => a[field].localeCompare(b[field]));
    } else if (field === 'company') {
      sortedList.sort((a, b) => a.company.name.localeCompare(b.company.name));
    }

    if (direction === 'descending') {
      sortedList.reverse();
    }
    setUsersList(sortedList);
  };

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select 
          options={fieldOptions} 
          inputId="sort-field" 
          className="input" 
          onChange={handleFieldChange}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={handleSortChange}
          defaultValue={directionOptions[0]}
        />
      </div>
    </div>
  );
};

export default Controls;
