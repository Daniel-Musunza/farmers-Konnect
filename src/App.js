import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import Invest from './pages/Invest'
import Rent from './pages/Rent'
import PostLand from './pages/PostLand'
import LandDetails from './pages/LandDetails'
import AddImages from './pages/AddImages'

import { ethers, providers } from 'ethers';
import DecentragramAbi from './abis/Decentragram.json'
import { Buffer as Buff } from 'buffer';
import { create } from 'ipfs-http-client'
import { FormatTypes, Interface } from 'ethers/lib/utils';

const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY
const auth = 'Basic ' + Buff.from(PINATA_API_KEY + ':' + PINATA_SECRET_KEY).toString('base64')

const ipfs = create({
  host: "api.pinata.cloud",
  protocol: "https",
  pathname: "/pinning/pinFileToIPFS",
  headers: {
    authorization: auth,
  },
});


const iface = new Interface(DecentragramAbi["abi"]);


function App() {


  const [account, setAccount] = useState()
  const [loading, setLoading] = useState()
  const [provider, setProvider] = useState()
  const [decentragram, setDecentragram] = useState()
  const [lands, setLands] = useState([])
  const [images, setImages] = useState([])
  const [buffer, setBuffer] = useState()


  useEffect(() => {
    loadWeb3()

    return () => { }
  }, [])

  useEffect(() => {
    if (provider) {
      loadBlockChainData()
    }

    return () => { }
  }, [provider])

  function loadWeb3() {
    if (window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else if (window.web3) {
      setProvider(new providers.Web3Provider(window.web3.currentProvider))
    }
  }

  async function loadBlockChainData() {
    try {
      const signer = provider.getSigner()
      const accounts = await provider?.send("eth_requestAccounts", []);
      setAccount(accounts[0])

      const networkId = (await provider.getNetwork()).chainId;
      const networkData = DecentragramAbi.networks[networkId.toString()];


      if (networkData) {
        const contract = new ethers.Contract(networkData.address, iface.format(FormatTypes.full), signer)
        setDecentragram(contract)

        const landsCount = await contract.landsCount()

        const lands = []
        for (let landId = 1; landId <= landsCount.toNumber(); landId++) {
          const land = await contract.lands(landId)
          console.log(land)
          lands.push(land)
        }

        setLands(lands.sort((a, b) => b.grantAmount - a.grantAmount))

        const imagesCount = await contract.imagesCount()

        const images = []
        for (let imageId = 1; imageId <= imagesCount.toNumber(); imageId++) {
          const image = await contract.images(imageId)
          console.log(image)
          images.push(image)
        }

        setImages(images.sort((a, b) => b.grantAmount - a.grantAmount))
      }
    } catch (error) {
      console.log(error)
    }
  }

  function captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new FileReader()
    // Preprocess the file to upload to the IPFS
    reader.readAsArrayBuffer(file)

    reader.onload = () => {
      const buff = Buff(reader.result)
      setBuffer(buff)
    }
  }

  async function uploadLand(title, landType, soilType, climate, price, landDetails) {
    setLoading(true)
    try {
      const result = await ipfs.add(buffer)
      console.log("ipfs result", result)
      const transaction = await decentragram.uploadLand(result.path, title, landType, soilType, climate, price, landDetails, {
        from: account
      })
      transaction.wait()
      window.location.reload(false);
    } catch (error) {
      console.log(error)
    } finally {

      setLoading(false)
    }
  }
  async function uploadImage(landId) {
    setLoading(true)
    try {
      const result = await ipfs.add(buffer)
      console.log("ipfs result", result)
      const transaction = await decentragram.uploadLand(result.path, landId, {
        from: account
      })
      transaction.wait()
      window.location.reload(false);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  async function tipLandOwner(landId, grantAmount) {
    setLoading(true)
    const transaction = await decentragram.tipLandOwner(landId.toNumber(), {
      from: account,
      value: grantAmount
    })
    transaction.wait()
    window.location.reload(false);
  }


  return (
    <>
      <Router>
        {loading &&
          <Spinner/> 
        }
          <div className='container'>
            <Header account={account} />
            <Routes>
              <Route path='/' element={<Home
                account={account}
              />} />
              <Route path='/invest' element={<Invest
                account={account}
                lands={lands}
                tipLandOwner={tipLandOwner}
              />} />
              <Route path='/rent' element={<Rent
                account={account}
                lands={lands}
                tipLandOwner={tipLandOwner}
              />} />
              <Route path='/post-land'
                element={<PostLand
                  account={account}
                  captureFile={captureFile}
                  uploadLand={uploadLand}
                />} />
              <Route path='/land-details/:id' element={<LandDetails
                account={account}
                lands={lands}
                images={images}
                tipLandOwner={tipLandOwner}
              />} />
              <Route path='/add-images/:id' element={<AddImages
                account={account}
                captureFile={captureFile}
                uploadLand={uploadImage}
                lands={lands}
                images={images}
                tipLandOwner={tipLandOwner}
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
