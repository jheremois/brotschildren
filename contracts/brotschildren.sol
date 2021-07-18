pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/SafeMath.sol";

contract Brotschildren is Ownable {

    event Withdraw(uint256 amount);

    struct Donation {
        uint256 value;
        uint256 conversionFactor;
        uint256 date;
    }
    mapping(address => Donation[]) private _donations;

    event DonationReceived(address indexed donor, uint256 value);

   string public name;
   string public url;
   string public imageURL;
   string public description;

   address payable public beneficiary;

    constructor(
    string memory _name,
    string memory _url,
    string memory _imageURL,
    string memory _description,
    address payable _beneficiary,
    address _custodian
)
  
  public
{
  name = _name;
  url = _url;
  imageURL = _imageURL;
  description = _description;
  beneficiary = _beneficiary;
  _transferOwnership(_custodian);

    }

function setBeneficiary(address payable _beneficiary) public onlyOwner {
    beneficiary = _beneficiary;
}

function myDonationsCount() public view returns(uint256) {
        return _donations[msg.sender].length;
}

function donate() public payable {
    Donation memory donation = Donation({
        value: msg.value,
        date: block.timestamp
    });
   _donations[msg.sender].push(donation);
   totalDonations = totalDonations.add(msg.value);
   donationsCount++;

   emit DonationReceived(msg.sender, msg.value);
  
  }

function myDonations() public view returns(
        uint256[] memory values,
        uint256[] memory dates
    )
    {
        uint256 count = myDonationsCount();
        values = new uint256[](count);
        dates = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
        }

        return (values, dates);
    }

function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    beneficiary.transfer(balance);
    emit Withdraw(balance);
  }

function () external payable {
    totalDonations = totalDonations.add(msg.value);
    donationsCount++;
}
}