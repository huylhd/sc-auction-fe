import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Countdown from 'react-countdown';
import { useParams } from 'react-router';
import { RequestGet, RequestPost } from '../../services/RequestService';
import { toast } from 'react-toastify';

const Detail = (props) => {
  const { productId } = useParams();
  const [item, setItem] = useState([]);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    GetItemDetail();
  }, [])

  const GetItemDetail = async () => {
    const res = await RequestGet(`/products/${productId}`);
    if (res.success) {
      return setItem(res.data);
    }
    toast.error('Product not found');
  }

  const handleBid = async () => {
    setShowBidModal(false);
    const res = await RequestPost(`/bidding`, { productId, amount: parseFloat(bidAmount) });
    if (res.success) {
      return toast.success(`Placed bid successfully`);
    }
    toast.error(res.message);
  }

  return (
    <div class="row m-0 detail-page px-md-5 px-3 align-items-center">
      <div class="col-12 col-md-8 text-center p-5 image-wrapper">
        {
          item && (
            <img src={ item.imageUrl ? process.env.REACT_APP_SERVER_BASE_URL + item.imageUrl : '/no-image.png' } alt="Product" />
          )
        }
      </div>
      <div class="col-12 col-md-4 ps-md-4 right-section">
        {
          item && (
            <>
              <h1>{ item.name }</h1>
              <h3 class="mb-5">Minimum bid: ${ item.minimumAmount }</h3>
              <h5>Details</h5>
              <p class="mb-5">{ item.details }</p>
              <div class="row mb-3 timer">
                <div class="col-6">
                  <h5>Latest bid</h5>
                  <span>${ item.highestBid }</span>
                </div>
                <div class="col-6 mb-4">
                  <h5>Available Until</h5>
                  <Countdown date={new Date(item.expiredAt)} />
                </div>
                <button class="btn btn-primary ms-2" onClick={() => setShowBidModal(true)}>Place a Bid</button>
              </div>
              <input class="form-check-input me-3" type="checkbox" value="" id="autoBidCbx" />
              <label class="form-check-label" for="autoBidCbx">
                Activate the <span class="text-decoration-underline">auto-bidding</span>
              </label>
            </>
          )
        }
      </div>

      <Modal
        show={showBidModal}
        onHide={() => setShowBidModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Place a Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} class="form-control" placeholder="Enter an amount" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBidModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleBid()}>Bid</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Detail;
