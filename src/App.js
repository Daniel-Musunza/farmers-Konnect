import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
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

const INFURA_ID = process.env.REACT_APP_INFURA_ID
const INFURA_SECRET_KEY = process.env.REACT_APP_INFURA_SECRET_KEY
const auth = 'Basic ' + Buff.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64')
const ipfs = create({
  host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: auth,
  },
})

const iface = new Interface(DecentragramAbi["abi"]);


function App() {


  const [account, setAccount] = useState()
  const [loading, setLoading] = useState()
  const [provider, setProvider] = useState()
  const [decentragram, setDecentragram] = useState()
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

      const networkId = await provider.getNetwork()
      const networkData = DecentragramAbi.networks["5777"]

      if (networkData) {
        const contract = new ethers.Contract(networkData.address, iface.format(FormatTypes.full), signer)
        setDecentragram(contract)

        const imagesCount = await contract.imagesCount()

        const imgs = []
        for (let imgId = 1; imgId <= imagesCount.toNumber(); imgId++) {
          const img = await contract.images(imgId)
          console.log(img)
          imgs.push(img)
        }

        setImages(imgs.sort((a, b) => b.grantAmount - a.grantAmount))

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

  async function uploadImage(imageDescription) {
    setLoading(true)
    try {
      const result = await ipfs.add(buffer)
      console.log("ipfs result", result)
      const transaction = await decentragram.uploadImage(result.path, imageDescription, {
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

  async function tipImageOwner(imageId, grantAmount) {
    setLoading(true)
    const transaction = await decentragram.tipImageOwner(imageId.toNumber(), {
      from: account,
      value: grantAmount
    })
    transaction.wait()
    window.location.reload(false);
  }


  return (
    <>
      <Router>
        <div className='container'>
          <Header account={account} />
          <Routes>
            <Route path='/' element={<Home
              account={account}
              captureFile={captureFile}
              uploadImage={uploadImage}
              images={images}
              tipImageOwner={tipImageOwner}
            />} />
            <Route path='/invest' element={<Invest
              account={account}
              captureFile={captureFile}
              uploadImage={uploadImage}
              images={images}
              tipImageOwner={tipImageOwner}
            />} />
            <Route path='/rent' element={<Rent
              account={account}
              captureFile={captureFile}
              uploadImage={uploadImage}
              images={images}
              tipImageOwner={tipImageOwner}
            />} />
            <Route path='/post-land'
              element={<PostLand
                account={account}
                captureFile={captureFile}
                uploadImage={uploadImage}
                images={images}
                tipImageOwner={tipImageOwner}
              />} />
            <Route path='/land-details/:id' element={<LandDetails
              account={account}
              captureFile={captureFile}
              uploadImage={uploadImage}
              images={images}
              tipImageOwner={tipImageOwner}
            />} />
            <Route path='/add-images/:id' element={<AddImages
              account={account}
              captureFile={captureFile}
              uploadImage={uploadImage}
              images={images}
              tipImageOwner={tipImageOwner}
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
