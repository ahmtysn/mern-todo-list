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
        placeholder='Search is easy now...'
        value={search}
        onChange={handleChange}
        name='text'
        className='search'
      />
    </div>
  );
}

export default SearchBar;
