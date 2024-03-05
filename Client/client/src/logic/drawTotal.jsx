export const drawTotal = (carritoObjeto) => {
    const total = carritoObjeto.reduce((acc, item) => {
      return acc + item.price * item.cantidad;
    }, 0);
  
    return (
      <div>
        <p style={{fontSize: "30px", fontFamily: "Nova Square, cursive"}}>Total: ₪ {total}</p>
      </div>
    );
  };

  export const drawCantidadTotal = (carritoObjeto) => {
    const cantidadTotal = carritoObjeto.reduce((acc, item) => {
      return acc + item.cantidad;
    }, 0);
  
    return cantidadTotal;
  };