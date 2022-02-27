
import './App.css';
import mintExampleAbi from "./mintExampleAbi.json";
import {ethers, BigNumber} from "ethers";
import {useEffect, useState} from "react";
import logo from './tips.gif';

const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  //CONNECTING
  const [accounts, setAccounts] = useState([]);

  async function connectAccounts(){
    if(window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }
  }

  useEffect(() => {
    connectAccounts();
  },[]);

  //MINTING
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint(){
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response: ", response);
      } catch(err){
        console.log("error: ", err);
      }
    }
  }

  
  return (
    <div className="App">
      <h1>Mint NFT</h1><br/>
      <div className='brd'>
      <img src= {logo} alt = 'logo' className='img'/>
      
      {accounts.length &&(
        <div>
        <button className='btn' onClick={() => setMintAmount(mintAmount -1)}>-</button>
        {mintAmount}
        <button className = 'btn' onClick = {() => setMintAmount(mintAmount + 1)}>+</button>
        <button className = 'btn1' onClick = {handleMint}>Mint</button>
        </div>
      )}
      </div>
      <a href='#' className='App-link'>return back</a>
    </div>
  );
}

export default App;
