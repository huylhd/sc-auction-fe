import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Countdown from 'react-countdown';
import { useParams } from 'react-router';
import { RequestGet, RequestPost } from '../../services/RequestService';
import { toast } from 'react-toastify';
import io from "socket.io-client";
import Auth from '../../hoc/Auth';

const socket = io.connect(process.env.REACT_APP_SERVER_BASE_URL);

const Detail = (props) => {
  const { productId } = useParams();
  const [item, setItem] = useState(null);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [isAutomated, setIsAutomated] = useState(false);

  useEffect(() => {
    GetItemDetail();
    GetSocket();
  }, [])

  const GetSocket = () => {
    const newHighestBid = (amount) => {
      setHighestBid(amount);
    }
    socket.on("connect", () => {
      socket.emit('join', productId); // Join product room
      socket.emit('join', localStorage.getItem('token'));  // Join user room
      socket.on('bid', newHighestBid);
      socket.on('alert', perc => toast.warning(`You maximum bid amount has reached ${perc}%`))
    });
  }

  const GetItemDetail = async () => {
    const res = await RequestGet(`/products/${productId}`);
    if (res.success) {
      setHighestBid(res.data.highestBid || 0);
      setIsAutomated(res.data.myBid?.isAutomated | false);
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

  const handleAutobidCbx = async (e) => {
    const res = await RequestPost(`/bidding/autobid`, { productId });
    if (res.success) {
      setIsAutomated(!e.target.checked);
    }
    toast.error(res.message);
  }

  return (
    <div class="row m-0 detail-page px-md-5 px-3 align-items-center">
      {
        item && (
          <div class="col-12 col-md-8 text-center p-5 image-wrapper">
            <img src={ item.imageUrl ? process.env.REACT_APP_SERVER_BASE_URL + item.imageUrl : '/no-image.png' } alt="Product" />
          </div>
        )
      }
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
                  <span>${ highestBid }</span>
                </div>
                <div class="col-6 mb-4">
                  <h5>Available Until</h5>
                  {
                    item.timeLeft === 0 ?
                    <span>Auction ended</span> : 
                    <Countdown date={Date.now() + item.timeLeft} />
                  }
                </div>
                <button disabled={item.timeLeft === 0} class="btn btn-primary ms-2" onClick={() => setShowBidModal(true)}>Place a Bid</button>
              </div>
              <input class="form-check-input me-3" type="checkbox" id="autoBidCbx" checked={isAutomated} onChange={e => handleAutobidCbx(e)} />
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

export default Auth(Detail);
