pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
  string public name = "DApp Token Farm";
  DappToken public dappToken;
  DaiToken public daiToken;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(DappToken _dappToken, DaiToken _daiToken ) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
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

}
