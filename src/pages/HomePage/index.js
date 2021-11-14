import React, { useEffect, useState } from 'react';
import Auth from '../../hoc/Auth';
import { RequestGet } from '../../services/RequestService';
import Filters from './components/Filters';
import ItemList from './components/ItemList';

const HomePage = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetItems(0, 'most-popular', '');
  }, [])

  const GetItems = async (minimumAmount, arrange, category) => {
    const res = await RequestGet(`/products?minimumAmount=${minimumAmount}&arrange=${arrange}&category=${category}`);
    if (res.success) {
      setItems(res.data);
    }
  }

  return (
    <div class="row m-0">
      <div class="col-12 col-md-3">
        <Filters handleChange={GetItems}/>
      </div>
      <div class="col-12 col-md-9">
        <ItemList items={items} />
      </div>
    </div>
  )
}

export default Auth(HomePage);
