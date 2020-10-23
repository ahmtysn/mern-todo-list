import React, { useEffect, useState } from 'react';

function HeaderSearch({ searchTodos }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchTodos(search);
  }, [search]);

  return (
    <div>
      <h1>What is your plan?</h1>
      <input
        placeholder='You can search here'
        value={search}
        onChange={handleChange}
        name='text'
        className='search'
      />
    </div>
  );
}

export default HeaderSearch;
