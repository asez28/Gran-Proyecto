export const addCarrito = (product, carritoObjeto, setCarritoObjeto) => {
  const existingProductIndex = carritoObjeto.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    const updatedCarrito = carritoObjeto.map((item, index) => {
      if (index === existingProductIndex) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCarritoObjeto(updatedCarrito);
  } else {
    setCarritoObjeto([...carritoObjeto, { ...product, cantidad: 1 }]);
  }

};

export const drawShop = (carritoObjeto, btnIncreas, btnDecrease) => {
    return carritoObjeto.map((item) => (
      <div key={item.id} className="list-group-item">
        <h5>{item.title}</h5>
        <p>Cantidad: {item.cantidad}</p>
        <p>Precio: {item.price * item.cantidad}</p>
        <img src={item.thumbnailUrl} alt="producto" />
        <button onClick={() => btnIncreas(item.id)}>Incrementar</button>
        <button onClick={() => btnDecrease(item.id)}>Decrementar</button>
      </div>
    ));
  };

export const drawTotal = (carritoObjeto) => {
    const total = carritoObjeto.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    return <p>Total: {total}</p>;
  };

export const btnIncreas = (id, carritoObjeto, setCarritoObjeto) => {
    const updatedCarrito = carritoObjeto.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarritoObjeto(updatedCarrito);
  };

export const btnDecrease = (id, carritoObjeto, setCarritoObjeto) => {
    const updatedCarrito = carritoObjeto.map((item) =>
      item.id === id && item.cantidad > 0 ? { ...item, cantidad: item.cantidad - 1 } : item
    );
    setCarritoObjeto(updatedCarrito);
  };

export const btnClean = (setCarritoObjeto) => {
    setCarritoObjeto([]);
  };
