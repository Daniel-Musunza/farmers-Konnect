// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Decentragram {
    string public name = "Decentragram";

    struct Land {
        uint id;
        string hash;
        string title;
        string landType;
        string climate;
        string soilType;
        string landDetails;
        string price;
        uint grantAmount;
        address payable user;
    }

    mapping(uint => Land) public lands;
    uint public landsCount = 0;

    event LandUploaded(
        uint id,
        string hash,
        string title,
        string landType,
        string climate,
        string soilType,
        string landDetails,
        string price,
        uint grantAmount,
        address payable user
    );

    event LandTipped(
        uint id,
        string hash,
        string title,
        string landType,
        string climate,
        string soilType,
        string landDetails,
        string price,
        uint grantAmount,
        address payable user
    );

    constructor() {}

    function uploadLand(
        string memory _hash,
        string memory _title,
        string memory _landType,
        string memory _climate,
        string memory _soilType,
        string memory _landDetails,
        string memory _price
    ) public {
        require(
            bytes(_hash).length > 0 &&
            bytes(_title).length > 0 &&
            msg.sender != address(0)
        );

        landsCount++;
        lands[landsCount] = Land(
            landsCount,
            _hash,
            _title,
            _landType,
            _climate,
            _soilType,
            _landDetails,
            _price,  // Fixed the order of parameters
            0,
            payable(msg.sender)
        );

        emit LandUploaded(
            landsCount,
            _hash,
            _title,
            _landType,
            _climate,
            _soilType,
            _landDetails,
            _price,  // Fixed the order of parameters
            0,
            payable(msg.sender)
        );
    }

    function tipLandOwner(uint _id) public payable {
        require(_id > 0 && _id <= landsCount);

        Land storage _land = lands[_id];  // Changed memory to storage

        require(msg.sender != _land.user);

        payable(address(_land.user)).transfer(msg.value);

        _land.grantAmount += msg.value;

        lands[_id] = _land;

        emit LandTipped(  // Changed event name to LandTipped
            _land.id,
            _land.hash,
            _land.title,
            _land.landType,
            _land.climate,
            _land.soilType,
            _land.landDetails,
            _land.price,
            _land.grantAmount,
            _land.user
        );
    }

    //images

     struct Image {
        uint id;
        string hash;
        string landId;
        uint grantAmount;
        address payable user;
    }

    mapping(uint => Image) public images;
    uint public imagesCount = 0;

    event ImageUploaded(
        uint id,
        string hash,
        string landId,
        uint grantAmount,
        address payable user
    );

    function uploadImage(
        string memory _hash,
        string memory _landId
    ) public {
        require(
            bytes(_hash).length > 0 &&
            bytes(_landId).length > 0 &&
            msg.sender != address(0)
        );

        imagesCount++;
       images[imagesCount] = Image(
            imagesCount,
            _hash,
            _landId,
            0,
            payable(msg.sender)
        );

        emit ImageUploaded(
            imagesCount,
            _hash,
            _landId,
            0,
            payable(msg.sender)
        );
     }

     //send money to escrow
     
}
