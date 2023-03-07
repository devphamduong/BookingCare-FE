import { useDispatch, useSelector } from 'react-redux';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { changeLanguageApp, processLogout } from '../../store/actions';
import { LANGUAGES, USER_ROLE } from '../../utils';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function Header(props) {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const userInfo = useSelector(state => state.user.userInfo);
    const [menuApp, setMenuApp] = useState([]);

    const changeLanguage = (locale) => {
        dispatch(changeLanguageApp(locale));
    };

    useEffect(() => {
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            let menu = [];
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            } else if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
            setMenuApp(menu);
        }
    }, []);

    return (
        <div className="header-container">
            {/* thanh navigator */}
            <div className="header-tabs-container">
                <Navigator menus={menuApp} />
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