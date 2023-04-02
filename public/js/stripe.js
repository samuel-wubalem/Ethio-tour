
/* eslint-disable*/
import axios from 'axios'
const stripe = Stripe(
  'pk_test_51Mk4sRBFd9Mb1hZkR2t1Pz19Bv6pQD00KfxfZ1ntKVwNTWtIoOy0IN4qGufIC7hZpB1LVW96dUL3XRCt1XbAw4L400efjT9qzq'
);

export const bookTour = async tourId => {
   
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/booking/checkout-session/${tourId}`
    );
  
    await stripe.redirectToCheckout({
        sessionId:session.data.session.id
    })
}