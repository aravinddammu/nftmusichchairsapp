import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  name: String;
}

interface nft {
  id: number;
  name: string;
}

export default function TestComponent<T extends nft>(props: Props) {
  const [nfts, setNfts] = useState<nft[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/nfts")
    .then((res) => {
      console.log("res", res);
      setNfts(res.data);
    })
    .catch(error=>{
      console.log(error);
    })
    ;
  }, []);
  return (
    <div>
      <h2>{props.name}</h2>
      {nfts.map(nft=>{
        return (<div style={{backgroundColor: "whitesmoke", width: "30%", marginLeft: "30px"}}>
          <h4 key={nft?.id}>
            {nft?.name}
          </h4>
          <button>Forward NFT</button>
          </div>);
      })}
    </div>
  );
}
