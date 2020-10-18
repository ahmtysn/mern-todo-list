import React, { useEffect, useState } from 'react';

function SearchBar({ searchTodos }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchTodos(search);
  }, [search]);

  return (
    <div>
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

export default SearchBar;
