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
    <Sider width={300} style={{ background: "#00aaff", padding: '20px', position: 'fixed', left: 10, borderRadius: "10px"}}>
    <h2 style={{ color: '#fff' }} >Advance Search</h2>
    <Input 
      placeholder="Filter Pokémon by ID" 
      value={filterValue}
      onChange={handleFilterChange}
      style={{ marginBottom: '20px' }}
    />
    <div>
      <span style={{ margin: '0 4% 0 0', color: '#fff'}}>SORT BY</span>
      <Select 
        defaultValue="Type" 
        onChange={onSortChange}
        style={{ width: '50%' }}
      > 
        <Option value=""> All </Option>
        <Option value="bug"> Bug </Option>
        <Option value="dragon">Dragon </Option>
        <Option value="fairy">Fairy </Option>
        <Option value="fire">Fire </Option>
        <Option value="ghost">Ghost </Option>
        <Option value="ground">Ground </Option>
        <Option value="normal">Normal </Option>
        <Option value="psychic">Psychic </Option>
        <Option value="steel">Steel </Option>
        <Option value="dark">Dark </Option>
        <Option value="electric"></Option>
        <Option value="fighting">Fighting </Option>
        <Option value="flying">Flying </Option>
        <Option value="grass">Grass </Option>
        <Option value="ice">Ice </Option>
        <Option value="poison">Poison </Option>
        <Option value="rock">Rock </Option>
        <Option value="water">Water </Option>    
        </Select>
      </div>
      <div style={{ display: 'flex' , alignItems: 'center', marginTop: '4%' }}>
        <span style={{ margin: '0 4% 0 0', color: '#fff'}}>ID RANGE</span>
        <Input 
          placeholder="ID" 
          value={filterValue}
          onChange={handleFilterChange}
          style={{ width: '20%' }}
        />
        <span style={{ margin: '0 4% 4% 4%', color: '#fff', fontSize: "40px"}}>-</span>
        <Input 
          placeholder= "ID" 
          value={filterValue}
          onChange={handleFilterChange}
          style={{ width: '20%' }}
        />
      </div>
    </Sider>
  </Layout>

  );
};

export default SidebarComponent;
