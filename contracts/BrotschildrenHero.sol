pragma solidity ^0.8.0;

import "./brotschildren.sol";

contract BrotschildrenHero {
Brotschildren[] private _brotschildrens;

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