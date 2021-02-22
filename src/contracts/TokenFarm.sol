pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
  string public name = "DApp Token Farm";
  DappToken public dappToken;
  DaiToken public daiToken;
  address public owner;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(DappToken _dappToken, DaiToken _daiToken ) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
    owner = msg.sender;
  }

  function stakeTokens(uint _amount) public {
    daiToken.transferFrom(msg.sender, address(this), _amount); //This is the address of the smart contract/bank

    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    //add user to staking array only if they havent already staked.
    if(!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }


    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }



  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];

    require(balance > 0, 'staking balance cannot be 0');

    daiToken.transfer(msg.sender, balance);

    stakingBalance[msg.sender] = 0;

    isStaking[msg.sender] = false;



  }







  function issueTokens() public {
    //Only owner can call function
    require(msg.sender == owner, 'Caller must be the owner');


    //Issue token to all stakers
    for (uint i=0; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if(balance > 0) {
        dappToken.transfer(recipient, balance);
      }
    }
  }

  

}
