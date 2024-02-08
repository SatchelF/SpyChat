import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    return (
        <div className="header-container">
            <h2 className="header-text">Spy Chat</h2>
            <FontAwesomeIcon icon={faUserSecret} />
        </div>
        
    );
}


export default Header