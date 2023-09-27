import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const Filter = ({ onFilterChange, onSortChange }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <Input 
        placeholder="Filter Pokémon by name" 
        value={filterValue}
        onChange={handleFilterChange}
        style={{ width: '50%' }}
      />
      <div style={{ width: '40%' }}>
        <span style={{ margin: '0 4% 0 0'}}>SORT BY</span>
        <Select 
          defaultValue="id" 
          onChange={onSortChange}
          style={{ width: '50%' }}
        > 
          <Option value="id">Pokédex ID (lowest)</Option>
          <Option value="-id">Pokédex ID (highest)</Option>
          <Option value="name">Name (A-Z)</Option>
          <Option value="-name">Name (Z-A)</Option>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
