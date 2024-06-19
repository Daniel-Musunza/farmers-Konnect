import { Actor, HttpAgent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';

// Define the idlFactory function with explicit types
const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  return IDL.Service({
    postLand: IDL.Func(
      [
        IDL.Text, // downloadURL
        IDL.Text, // currentUser
        IDL.Text, // title
        IDL.Text, // landType
        IDL.Text, // soilType
        IDL.Text, // selectedCountry
        IDL.Float64, // price
        IDL.Text, // landDetails
        IDL.Int, // timestamp
      ],
      [],
      [],
    ),
    postImages: IDL.Func(
      [
        IDL.Text, // downloadURL
        IDL.Text, // currentUser
        IDL.Int, // id
        IDL.Int, // timestamp
      ],
      [],
      [],
    ),
    bookLand: IDL.Func(
      [
        IDL.Int, // timestamp
        IDL.Text, // currentUser
        IDL.Text, // owner
        IDL.Int, // landId
        IDL.Float64, // price
        IDL.Text, // message
      ],
      [],
      [],
    ),
    getLands: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    getImages: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    getBookings: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))], ['query']),
    subscribe: IDL.Func([IDL.Text], [], []),
  });
};

const canisterId = 'knrun-ifist-eri';

const agent = new HttpAgent();

const landManagement = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// Example usage:

// Post a land
async function postLand() {
  const downloadURL = 'exampleDownloadURL';
  const currentUser = 'exampleUser';
  const title = 'exampleTitle';
  const landType = 'exampleLandType';
  const soilType = 'exampleSoilType';
  const selectedCountry = 'exampleCountry';
  const price = 1.0;
  const landDetails = 'exampleLandDetails';
  const timestamp = Date.now();

  await landManagement.postLand(
    downloadURL,
    currentUser,
    title,
    landType,
    soilType,
    selectedCountry,
    price,
    landDetails,
    timestamp
  );
}

// Post images
async function postImages() {
  const downloadURL = 'exampleDownloadURL';
  const currentUser = 'exampleUser';
  const id = 1; // Land ID
  const timestamp = Date.now();

  await landManagement.postImages(downloadURL, currentUser, id, timestamp);
}

// Book a land
async function bookLand() {
  const timestamp = Date.now();
  const currentUser = 'exampleUser';
  const owner = 'exampleOwner';
  const landId = 1;
  const price = 1.0;
  const message = 'exampleMessage';

  await landManagement.bookLand(timestamp, currentUser, owner, landId, price, message);
}

// Get lands
async function getLands() {
  const lands = await landManagement.getLands();
  console.log(lands);
}

// Get images
async function getImages() {
  const images = await landManagement.getImages();
  console.log(images);
}

// Get bookings
async function getBookings() {
  const bookings = await landManagement.getBookings();
  console.log(bookings);
}

// Subscribe with email
async function subscribe(email: string) {
  await landManagement.subscribe(email);
}

export {
  postLand,
  postImages,
  bookLand,
  getLands,
  getImages,
  getBookings,
  subscribe,
};
