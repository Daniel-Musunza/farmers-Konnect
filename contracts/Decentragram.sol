// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Decentragram {
    string public name = "Decentragram";

    struct Land {
        uint id;
        string hash;
        string title;
        string landType;
        string country;
        string soilType;
        string landDetails;
        string price;
        string message;
        uint grantAmount;
        address user;
    }

    mapping(uint => Land) public lands;
    uint public landsCount = 0;

    event LandUploaded(
        uint id,
        string hash,
        string title,
        string landType,
        string country,
        string soilType,
        string landDetails,
        string price,
        string message,
        uint grantAmount,
        address user
    );

    event LandBooked(
        uint id,
        string hash,
        string title,
        string landType,
        string country,
        string soilType,
        string landDetails,
        string price,
        string message,
        uint grantAmount,
        address user
    );

    constructor() {}

    function uploadLand(
        string memory _hash,
        string memory _title,
        string memory _landType,
        string memory _country,
        string memory _soilType,
        string memory _landDetails,
        string memory _message,
        string memory _price
    ) public {
        require(bytes(_hash).length > 0 && bytes(_title).length > 0);

        landsCount++;
        lands[landsCount] = Land(
            landsCount,
            _hash,
            _title,
            _landType,
            _country,
            _soilType,
            _landDetails,
            _price,
            _message,
            0,
            msg.sender
        );

        emit LandUploaded(
            landsCount,
            _hash,
            _title,
            _landType,
            _country,
            _soilType,
            _landDetails,
            _price,
            _message,
            0,
            msg.sender
        );
    }

    function bookLand(uint _id) public payable {
        require(_id > 0 && _id <= landsCount);

        Land storage _land = lands[_id];

        _land.grantAmount += msg.value;

        lands[_id] = _land;

        emit LandBooked(
            _land.id,
            _land.hash,
            _land.title,
            _land.landType,
            _land.country,
            _land.soilType,
            _land.landDetails,
            _land.price,
            _land.message,
            _land.grantAmount,
            _land.user
        );
    }

    // Images

    struct Image {
        uint id;
        string hash;
        string landId;
        uint grantAmount;
        address user;
    }

    mapping(uint => Image) public images;
    uint public imagesCount = 0;

    event ImageUploaded(
        uint id,
        string hash,
        string landId,
        uint grantAmount,
        address user
    );

    function uploadImage(string memory _hash, string memory _landId) public {
        require(bytes(_hash).length > 0 && bytes(_landId).length > 0);

        imagesCount++;
        images[imagesCount] = Image(
            imagesCount,
            _hash,
            _landId,
            0,
            msg.sender
        );
   
        emit ImageUploaded(imagesCount, _hash, _landId, 0,  msg.sender);
    }
}
