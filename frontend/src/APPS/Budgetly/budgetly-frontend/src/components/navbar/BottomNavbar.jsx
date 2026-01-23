import './styles/bottomNavbar.css';
import wallet from '../../assets/wallet.png';
import homeIcon from '../../assets/home.png';
import transactionIcon from '../../assets/transaction.png';
import { Link } from 'react-router-dom';

function BottomNavbar() {
    return(
        <nav className='bottom-nav'>

          <Link className='bottom-nav-link' to="/financeApp/dashboard">
              <img src={homeIcon} alt="home" className='nav-icon-normal' />
              <p>Home</p>              
          </Link>

          <Link className='bottom-nav-link' to="/financeApp/addTransactionPage">
              <img src={transactionIcon} alt="transaction" className='transaction-icon' />
              <p>New transaction</p>              
          </Link>

          <Link className='bottom-nav-link' to="/financeApp/wallet" >
              <img src={wallet} alt="wallet" className='nav-icon-normal' />
              <p>Wallet</p>              
          </Link>

        </nav>
    )
}

export default BottomNavbar;