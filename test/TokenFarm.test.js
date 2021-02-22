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
    await daiToken.transfer(investor, tokens('100'), {from: owner})
  })

  describe('Mock Dai Deployment', async () => {
    it('has a name', async () => {
      const name = await daiToken.name()
      assert.equal(name, 'Mock DAI Token')
    })
  })

  describe('DApp Token Deployment', async () => {
    it('has a name', async () => {
      const name = await dappToken.name()
      assert.equal(name, 'DApp Token')
    })
  })

  describe('Token Farm Deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'DApp Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming Tokens', async() => {
    it('rewards investors for staking mDai Tokens', async () => {
      let result

      //Check investor balance for staking
      result = await daiToken.balanceOf(investor)
      assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')
    })
  })


})


