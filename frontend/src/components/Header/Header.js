import headerLogo from '../../images/mesto-russia.svg';
import Dashboard from '../Dashboard/Dashboard';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип сайта Место Россия" />
      <Dashboard
        onSignOut={props.onSignOut}
        userEmail={props.userEmail} />
    </header>
  );
}

export default Header;