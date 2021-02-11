const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

  function tokens(n) {
    return web3.utils.toWei(n, 'ether')
  }

contract('TokenFarm', ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm

  before (async () => {

    //Loading the contracts
    daiToken = await DaiToken.new()
    dappToken = await DappToken.new()
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

    //Transfer all Dapp tokens to farm
    await dappToken.transfer(tokenFarm.address, tokens('1000000'))

       //Transfer all Dapp tokens to farm
    await daiToken.transfer(investor, tokens('100'), {from: owner })
  })

  describe('Mock Dai Deployment', async () => {
    it('has a name', async () => {
      let daiToken = await DaiToken.new()
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

})
