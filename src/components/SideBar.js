import React, { useState } from 'react';
import { Input, Select, Layout } from 'antd';

const { Option } = Select;
const { Sider } = Layout;

const SidebarComponent = ({ onFilterChange, onSortChange }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} style={{ background: '#fff', padding: '20px', position: 'fixed', left: 0 }}>
        <h2>Advance Search</h2>
        <Input 
          placeholder="Filter Pokémon by name" 
          value={filterValue}
          onChange={handleFilterChange}
          style={{ marginBottom: '20px' }}
        />
        <div>
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
      </Sider>
    </Layout>
  );
};

export default SidebarComponent;
