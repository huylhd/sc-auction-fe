import React, { useEffect, useState } from 'react';

const Filters = (props) => {
  const [minBid, setMinBid] = useState(0);

  useEffect(() => {
  }, [])


  return (
    <>
      <div>
        <h4 class="mb-2 mb-md-5">Filters</h4>
        <label for="minBidRange" class="form-label">Arrange</label>
        
        <select class="form-select mb-2 mb-md-5">
          <option selected>Most popular</option>
        </select>

        <label for="minBidRange" class="form-label">Minimum bid: ${ minBid }</label>
        <input type="range" class="form-range" min="0" max="100" value={minBid} onChange={(e) => setMinBid(e.target.value)} id="minBidRange"></input>
      </div>
    </>
  )
}

export default Filters;
