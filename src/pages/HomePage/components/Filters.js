import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const Filters = ({ handleChange }) => {
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [changeTimeout, setChangeTimeout] = useState(null);
  const [arrange, setArrange] = useState('most-popular');
  const [category, setCategory] = useState('');

  const handleChangeMinimumAmount = (val) => {
    clearTimeout(changeTimeout);
    setMinimumAmount(val)
    setChangeTimeout(setTimeout(() => {
      handleChange(val, arrange, category);
    }, 1500))
  }

  const handleChangeArrange = (e) => {
    setArrange(e.target.value);
    handleChange(minimumAmount, e.target.value, category);
  }

  const handleChangeCategory = (options) => {
    setCategory(options.map(op => op.value).join(','));
    handleChange(minimumAmount, arrange, options.map(op => op.value).join(','));
  }

  const categoryList = [
    { value: 'Category 1', label: 'Category 1' },
    { value: 'Category 2', label: 'Category 2' },
    { value: 'Category 3', label: 'Category 3' },
    { value: 'Category 4', label: 'Category 4' },
    { value: 'Category 5', label: 'Category 5' },
  ]

  return (
    <>
      <div>
        <h4 class="mb-2 mb-md-5">Filters</h4>

        <div class="mb-2 mb-md-5">
          <label for="minBidRange" class="form-label">Arrange</label>
          
          <select value={arrange} onChange={handleChangeArrange} class="form-select">
            <option selected value="most-popular">Most popular</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div class="mb-2 mb-md-5">
          <label for="minBidRange" class="form-label">Minimum bid: ${ minimumAmount }</label>
          <input type="range" class="form-range" min="0" max="100" value={ minimumAmount } onChange={(e) => handleChangeMinimumAmount(e.target.value)} id="minBidRange"></input>
        </div>

        <div class="mb-2 mb-md-5">
          <label class="form-label">Category</label>
          <Select
            closeMenuOnSelect={false}
            options={categoryList}
            isMulti
            onChange={handleChangeCategory}
          />
        </div>
      </div>
    </>
  )
}

export default Filters;
