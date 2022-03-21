import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMetamask } from 'use-metamask';
import { ethers } from 'ethers';

interface Props {
  name: String;
}

interface nft {
  id: number;
  name: string;
}

export default function TestComponent<T extends nft>(props: Props) {
  const [nfts, setNfts] = useState<nft[]>([]);
  const {connect, getAccounts, metaState} = useMetamask();
  const [web3interface, setWeb3interface] = useState("ethers");

  useEffect(() => {
    if (metaState.isAvailable && !metaState.isConnected) {
      (async () => {
        try {
          if (web3interface === "ethers")
            await connect(ethers.providers.Web3Provider, "any");
          else 
            throw Error(`Unknown web3 interface: ${web3interface}`);
        } catch (error) {
          console.log(error);
        }
      })
      
      ();
    }
  }, [metaState.isAvailable, web3interface]);

  useEffect(()=>{
    const account = getAccounts();
    console.log("account: ", account);
  },[metaState.isConnected])

  useEffect(() => {
    axios.get("http://localhost:3000/nfts")
    .then((res) => {
      console.log("res", res);
      setNfts(res.data);
    })
    .catch(error=>{
      console.log(error);
    });

  }, []);

  const handleForward = () : void => {
    console.log("test");
  }
  return (
    <div>
      <h2>{props.name}</h2>
      {nfts.map(nft=>{
        return (<div style={{backgroundColor: "whitesmoke", width: "30%", marginLeft: "30px"}}>
          <h4 key={nft.id}>
            {nft?.name}
          </h4>
          <button onClick={handleForward}>Forward NFT</button>
          </div>);
      })}
    </div>
  );
}
