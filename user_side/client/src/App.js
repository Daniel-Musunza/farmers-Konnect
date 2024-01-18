import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Invest from './pages/Invest';
import Rent from './pages/Rent';
import PostLand from './pages/PostLand';
import LandDetails from './pages/LandDetails';
import AddImages from './pages/AddImages';

import { ethers } from 'ethers';
import DecentragramAbi from './artifacts/contracts/Decentragram.sol/Decentragram.json';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);

          const contractAddress = '0xBD90db46f1EE284928dC127A1143a37189D0bc70';
          const contract = new ethers.Contract(
            contractAddress,
            DecentragramAbi.abi,
            signer
          );

          console.log(contract);
          setContract(contract);
          setProvider(provider);
        } else {
          console.log("MetaMask is not installed");
          setProvider(null);
        }
      } catch (error) {
        console.error("Error initializing provider:", error);
        setProvider(null);
      }
    };

    loadProvider();
  }, []);

  return (
    <>
      <Router>
          <div className='container'>
            <Header account={account} />
            <Routes>
              <Route path='/' element={<Home
                account={account}
              />} />
              <Route path='/invest' element={<Invest
                account={account}
                contract={contract}
                provider={provider}
              />} />
              <Route path='/rent' element={<Rent
                account={account}
                contract={contract}
                provider={provider}
              />} />
              <Route path='/post-land'
                element={<PostLand
                  account={account}
                  contract={contract}
                  provider={provider}
                />} />
              <Route path='/land-details/:id' element={<LandDetails
                account={account}
                contract={contract}
                provider={provider}
              />} />
              <Route path='/add-images/:id' element={<AddImages
                account={account}
                contract={contract}
                provider={provider}
              />} />
            </Routes>

            <Footer />

          </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
