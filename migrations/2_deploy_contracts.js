const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')



module.exports = async function(deployer, network, accounts) {

  // This sections deploys our DaiToken
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // This sections deploys our DappToken
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()


  deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  //Transfers all dappTokens to the TokenFarm. 
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  //Transfers 100 daiTokens to investor (In this case investor will be the second account at index 1)
  await daiToken.transfer(accounts[1], '100000000000000000000')
}