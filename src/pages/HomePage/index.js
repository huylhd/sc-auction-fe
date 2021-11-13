import React from 'react';
import Auth from '../../hoc/Auth';
import Filters from './components/Filters';
import ItemList from './components/ItemList';

const HomePage = (props) => {
  
  return (
    <div class="row m-0">
      <div class="col-12 col-md-3">
        <Filters />
      </div>
      <div class="col-12 col-md-9">
        <ItemList />
      </div>
    </div>
  )
}

export default Auth(HomePage);
