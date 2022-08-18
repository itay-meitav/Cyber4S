import React from "react";
import { Outlet, useParams } from "react-router-dom";

function getSock(id: number) {
  if (id == 1) {
    return (
      <img src="https://i.pinimg.com/originals/52/08/6c/52086c7aa1a904e6e67425707afbead5.jpg" />
    );
  } else if (id == 2) {
    return (
      <img src="https://ih1.redbubble.net/image.925128444.1540/ur,socks_flatlay_medium,square,1000x1000-bg,f8f8f8.1.jpg" />
    );
  } else if (id == 3) {
    return (
      <img src="https://ih1.redbubble.net/image.977888762.5097/ur,socks_flatlay_medium,square,600x600-bg,f8f8f8.1.jpg" />
    );
  } else if (id == 4) {
    return (
      <img src="https://cdn.shopify.com/s/files/1/0803/1725/products/Physics_socks2_300x.jpg" />
    );
  } else if (id == 5) {
    return (
      <img src="https://cdn.shopify.com/s/files/1/0803/1725/products/nuclear-physics-socks-12786-p_510x.jpeg" />
    );
  } else if (id == 6) {
    return (
      <img src="https://cdn.shopify.com/s/files/1/1210/2908/products/1114_2048x.jpg" />
    );
  } else {
    return false;
  }
}

function Socks() {
  let params = useParams();
  return (
    <>
      {getSock(Number(params.sockId)) ? (
        <>
          <h2>Sock: {params.sockId}</h2>
          {getSock(Number(params.sockId))}
        </>
      ) : (
        <h2>Sock not found!</h2>
      )}
      <Outlet />
    </>
  );
}

export default Socks;
