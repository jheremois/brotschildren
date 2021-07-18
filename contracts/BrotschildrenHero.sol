pragma solidity ^0.8.0;

import "./brotschildren.sol";

contract BrotschildrenHero {
Brotschildren[] private _brotschildrens;
uint256 constant maxLimit = 20;

event BrotschildrenCreated(Brotschildren indexed Brotschildren, address indexed owner);

function createBrotschildren(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory bio,
    address payable beneficiary
    )
        public
    {
          Brotschildren brotschildren = new Brotschildren(
          name,
          url,
          imageURL,
          description,
          beneficiary,
          msg.sender
          );
          _brotschildrens.push(brotschildren);
          emit BrotschildrenCreated(brotschildren);
    }
 
    function BrotschildrenCount() public view returns(uint256) {
    return _brotschildrens.lenght;

    }

   function BrotschildrenCount() public view returns (uint256) {
   return _brotschildrens.lenght;
   }
}
require(offset <= fundraisersCount(), "offset out of bounds");

function fundraisers(uint256 limit, uint256 offset)
    public
    view
    returns(Fundraiser[] memory coll)
{
    require(offset <= fundraisersCount(), "offset out of bounds");

    uint256 size = fundraisersCount() - offset;
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;
    coll = new Fundraiser[](size);

    for(uint256 i = 0; i < size; i++) {
        coll[i] = _fundraisers[offset + i];
    }

    return coll;
}