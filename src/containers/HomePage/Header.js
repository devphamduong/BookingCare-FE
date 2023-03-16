import { FormattedMessage } from 'react-intl';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';
import './Header.scss';
import { Link } from 'react-router-dom';

function Header(props) {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);

    const changeLanguage = (locale) => {
        dispatch(changeLanguageApp(locale));
    };

    return (
        <>
            <Navbar style={{ backgroundColor: 'white' }} sticky='top' expand="lg" className='home-header-container'>
                <Container>
                    <Navbar.Brand className='header-brand'>
                        <Link to={'/home'}>
                            <div className='header-logo'></div>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='home-header-content'>
                        <Nav className='middle-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.specialty' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.search-doctor-specialty' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.medical-facility' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.choose-clinic' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.doctor' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.choose-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='home-header.checkup' /></b></div>
                                <div className='sub-title'><FormattedMessage id='home-header.general-health-check' /></div>
                            </div>
                        </Nav>
                        <Nav className='right-content'>
                            <div className='support'><i class="fas fa-question-circle"></i> <span><FormattedMessage id='home-header.support' /></span></div>
                            <div className='languages'>
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span></div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {props.isShowBanner &&
                <div className='home-header-banner'>
                    <div className="home-header-banner-sub1">
                        <div className='title1'><FormattedMessage id='banner.title1' /></div>
                        <div className='title2'><FormattedMessage id='banner.title2' /></div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type={'text'} placeholder={<FormattedMessage id='banner.search-medical-specialty' />} />
                        </div>
                    </div>
                    <div className="home-header-banner-sub2">
                        <div className='options'>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon1'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.specialist-examination' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon2'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.remote-examination' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon3'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.general-examination' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon4'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.medical-test' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon5'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.mental-health' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon6'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.dental-examination' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon7'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.surgery-package' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon8'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.medical-product' />
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon9'></div>
                                </div>
                                <div className="text-child">
                                    <FormattedMessage id='banner.corporate-health' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Header;