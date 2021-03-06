import React, {useRef} from 'react';
import dai from '../../dai.png';

const Main = (props) => {
  const numInput = useRef(null);

  const stakeEvent = (e) => {
    e.preventDefault();

    let amount;
    amount = numInput.current.value.toString();
    amount = window.web3.utils.toWei(amount, 'Ether');
    props.stakeTokens(amount)
  }

  const unstakeEvent = (e) => {
    e.preventDefault();
    props.unstakeTokens();
  }


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
        <form className="mb-3" onSubmit={e => stakeEvent(e)}>
            <div>
              <label className='float-left'><b>Stake Tokens</b></label>
              <span className='float-right text-muted'>
                Balance: {window.web3.utils.fromWei(props.daiTokenBalance, 'Ether')}
              </span>
            </div>
            <div className='input-group mb-4'>
              <input
                    type="text"
                    className="form-control form-control-lg"
                    ref={numInput}
                    placeholder="0"
                    required />
              <div className='input-group-append'>
                <div className='input-group-text'>
                  <img src={dai} height='32' alt=""/>
                  &nbsp;&nbsp;&nbsp; mDAI
                </div>
              </div>
            </div>
            <button type='submit' className='btn btn-primary btn-block btn-lg'>Stake</button>              
          </form>
          <button 
            type='submit'
            className='btn btn-danger btn-block btn-lg'
            onClick={(e) => unstakeEvent(e)}
          >
            Unstake
          </button>
              
        </div>
          
      </div>
      
    </div>
  )
}

export default Main;
