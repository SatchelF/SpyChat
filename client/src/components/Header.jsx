import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
const Header = () => {
    return (
        <div className="header-container">
            <h2 className="header-text font-link">Spy Chat</h2>
            <div className="icon">
            <FontAwesomeIcon icon={faUserSecret} />
            </div>
        </div>
        
    );
}


export default Header