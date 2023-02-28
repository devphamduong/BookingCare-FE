import { useDispatch, useSelector } from 'react-redux';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { changeLanguageApp, processLogout } from '../../store/actions';
import { LANGUAGES } from '../../utils';
import './Header.scss';
import { FormattedMessage } from 'react-intl';

function Header(props) {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const userInfo = useSelector(state => state.user.userInfo);

    const changeLanguage = (locale) => {
        dispatch(changeLanguageApp(locale));
    };

    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={adminMenu} />
            </div>
            <div className='languages'>
                <span className='welcome'><FormattedMessage id='home-header.welcome' />{userInfo && userInfo.firstName ? userInfo.firstName : ''}!</span>
                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span></div>
                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span></div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={() => dispatch(processLogout())} title="Logout">
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </div>
    );
}

export default Header;