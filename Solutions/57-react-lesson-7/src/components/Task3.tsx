import { SocketAddress } from "net";
import React, { useEffect, useState } from "react";
import { arrayBuffer } from "stream/consumers";

async function getSocks() {
  try {
    return await fetch(
      "https://socks4s-api.herokuapp.com/api/get/socks?limit=1000",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const response = await res.json();
      const socks = response.socks;
      console.log(socks);

      return socks;
    });
  } catch (error) {
    console.error(error);
  }
}

function Task3() {
  const [socks, setSocks] = useState<any[]>([]);

  useEffect(() => {
    getSocks().then((data: any[]) => {
      setSocks(data);
    });
  }, []);

  return (
    <select>
      {socks
        ? socks.map((element: any) => (
            <option key={element.id} value={element.model}>
              {element.model}
            </option>
          ))
        : ""}
    </select>
  );
}

export default Task3;
