import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RequestGet } from '../../../services/RequestService';

const ItemList = (props) => {
  const [items, setItems] = useState([]);
  let history = useHistory();

  useEffect(() => {
    GetItems()
  }, [])

  const GetItems = async () => {
    const res = await RequestGet('/products');
    if (res.success) {
      setItems(res.data);
    }
  }

  return (
    <>
      <div class="row m-0">
        {
          items.map(item => (
            <div class="col-12 col-md-4 p-2">
              <div class="item-box p-3">
                <div class="text-center">
                  <img class="mb-2" src={ item.imageUrl ? process.env.REACT_APP_SERVER_BASE_URL + item.imageUrl : '/no-image.png' } alt="Auction item" />
                </div>
                <div class="row align-items-center">
                  <div class="col-7">
                    <p class="fw-bold mb-1">{ item.name }</p>
                    <p class="description mb-0">{ item.description }</p>
                  </div>
                  <div class="col text-end">
                    <button class="btn btn-primary" onClick={() => history.push(`/detail/${item.id}`)}>Bid Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ItemList;
