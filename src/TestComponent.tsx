import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";
import dummy from './dummy.png';

interface Props {
  name: String;
}

interface nft {
  id: number;
  name: string;
}

interface accounts {
  id: number;
  name: string;
  address: string;
}

export default function TestComponent<T extends nft>(props: Props) {
  const [nfts, setNfts] = useState<nft[]>([]);
  const [accounts, setAccounts] = useState<accounts[]>([]);
  const { connect, getAccounts, metaState } = useMetamask();
  const [web3interface, setWeb3interface] = useState("ethers");
  const [nftselected, setNftselected] = useState<nft>();
  useEffect(() => {
    if (metaState.isAvailable && !metaState.isConnected) {
      (async () => {
        try {
          if (web3interface === "ethers")
            await connect(ethers.providers.Web3Provider, "any");
          else throw Error(`Unknown web3 interface: ${web3interface}`);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [metaState.isAvailable, web3interface, metaState.isConnected]);

  const getAccountsList = async () => {
    let ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts: ", accounts);
  };

  useEffect(() => {
    if (metaState.isConnected) {
      getAccountsList();
    }
  }, [metaState.isConnected]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/nfts")
      .then((res) => {
        console.log("res", res);
        setNfts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/accounts")
      .then((res) => {
        console.log("res", res);
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleForward = (): void => {
    console.log("test");
  };

  const handlePayment = (): void => {
    console.log("test");
  };
  return (
    <div>
      <h2>{props.name}</h2>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "40vw" }}>
          {nfts.map((nft) => {
            return (
              <div
                style={{
                  backgroundColor: "whitesmoke",
                  marginLeft: "30px",
                  marginBottom: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <h4 key={nft.id}>{nft?.name}</h4>
                <img src={dummy} alt="nft" height="200px" width="200px" />
                <button onClick={handleForward} style={{backgroundColor: "#383832", color: "white", marginTop: "4px"}}>Select NFT</button>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "80%"  }}>
          {accounts.map((account) => {
            return (
              <div
                style={{
                  backgroundColor: "whitesmoke",
                  marginLeft: "30px",
                  marginBottom: "8px"
                }}
              >
                <h4 key={account.id}>{account?.name}</h4>
                <h4>{account.address}</h4>
                <button onClick={handlePayment} style={{backgroundColor: "#383832", color: "white"}}>Pay from this account.</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
