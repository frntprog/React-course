import React from 'react';
import MyInput from './UI/input/MyInput.jsx';
import MySelect from './UI/select/MySelect.jsx';

const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <div>
        <MyInput
          value={filter.query}
          onChange={e => setFilter({ ...filter, query: e.target.value })}
          placeholder="Searching..."
        />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
          defaultValue="Sort"
          options={[
            { value: 'title', name: 'By title' },
            { value: 'body', name: 'By description' },
          ]}
        />
      </div>
    </div>
  );
};

export default PostFilter;