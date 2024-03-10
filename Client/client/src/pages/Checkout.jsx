import React, { useState, useEffect } from "react";
import axios from "../api/axios";

function Checkout() {
  const [userData, setUserData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const fetchConfirmedOrders = async () => {
    try {
      const response = await axios.get("/confirmed-orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching confirmed orders:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/checkout");
        const { user, cartItems, totalAmount } = response.data;
        setUserData(user);
        setCartItems(cartItems);
        setTotalAmount(totalAmount);

        if (totalAmount === 0 && cartItems.length === 0) {
          setIsCartEmpty(true);
        } else {
          setIsCartEmpty(false);
        }
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    }

    fetchData();
    fetchConfirmedOrders();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      if (cartItems.length === 0) {
        console.error("No hay elementos en el carrito para realizar el pedido");
        return;
      }

      const response = await axios.post("/place-order", {
        userData,
        cartItems,
        totalAmount,
      });

      fetchConfirmedOrders();

      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`/orders/${orderId}`);
      console.log(response.data);
      fetchConfirmedOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  

  return (
    <div style={{
      backgroundImage: "url('/IMG/cod12.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh"
    }} >
      <div className="container"  style={{ paddingTop: "120px"}}>
        <div className="card text-white" style={{backgroundColor: "rgba(147, 0, 10, 0.400)", backdropFilter: "blur(5px)"}}>
        <div className="m-3">
          <h2>Ordering and delivery Details</h2>
          <p>
            Nombre: {userData.name} {userData.lastName}
          </p>
          <p>Address: {userData.address}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          <h3>Your Cart:</h3>
          {isCartEmpty && (
            <div>
              <h5>The Car is Empty</h5>
            </div>
          )}
          <ul>
            {cartItems.map((item) => (
              <li className="m-2" key={item._id}>
                <img src={item.thumbnailUrl} width={80} />
                {item.title} - Items:  {item.cantidad} - Price: ₪{item.price}
              </li>
            ))}
          </ul>
        <div>
          <h3>Total: ₪{totalAmount}</h3>
        </div>
        <button onClick={handlePlaceOrder} data-mdb-ripple-init className="button1">Make the Order</button>
        </div>
        <div className="d-flex border-top"style={{backgroundColor: "rgba(118, 41, 47, 0.400)", backdropFilter: "blur(5px)"}}>
          <h5 className="m-2">Confirmed Orders</h5>
          <div className="d-flex">
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="rounded-5 m-2" style={{backgroundColor: "rgba(0, 0, 0, 0.400)", backdropFilter: "blur(5px)"}}>
                <p className="bg-success">{order.status}</p>
                <p className="m-2">Order ID: {order._id}</p>
                <p className="m-2">{order.createdAt}</p>
                <p className="m-2">Total Amount: ₪{order.totalAmount}</p>
                <button onClick={() => handleDeleteOrder(order._id)} className="btn btn-danger m-2">Delete Order</button>
              </li>
            ))}
          </ul>
          </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Checkout;
