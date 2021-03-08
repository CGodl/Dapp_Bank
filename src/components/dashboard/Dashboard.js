import React from 'react'

const Main = (props) => {
  return (
    <div id='content' className="mt-3">

      <table className='table table-borderless text-muted text-center'>
        <thead>
            <tr>
                <th scope="col">Staking Balance</th>
                <th scope="col">Reward Balance</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{window.web3.utils.fromWei(props.stakingBalance, 'Ether')} mDai</td>
                <td>{window.web3.utils.fromWei(props.dappTokenBalance, 'Ether')} DAPP</td>
            </tr>
        </tbody>
      </table>

      <div className='card mb-4'>
        <div className='card-body'>
          Hello World
        </div>

      </div>
      
    </div>
  )
}

export default Main;
