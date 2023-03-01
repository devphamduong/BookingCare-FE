import { useState } from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGender, fetchPosition, fetchRole } from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss';
import 'react-image-lightbox/style.css';

function UserRedux(props) {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const genders = useSelector(state => state.admin.genders);
    const positions = useSelector(state => state.admin.positions);
    const roles = useSelector(state => state.admin.roles);
    const [arrGender, setArrGender] = useState([]);
    const [arrPosition, setArrPosition] = useState([]);
    const [arrRole, setArrRole] = useState([]);
    const [prevImg, setPrevImg] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchGender());
        dispatch(fetchPosition());
        dispatch(fetchRole());
    }, []);

    useEffect(() => {
        setArrGender(genders);
    }, [genders]);

    useEffect(() => {
        setArrPosition(positions);
    }, [positions]);

    useEffect(() => {
        setArrRole(roles);
    }, [roles]);

    const handleOnChangeImg = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objURL = URL.createObjectURL(file);
            setPrevImg(objURL);
        }
    };

    const openPreviewImg = () => {
        if (prevImg) {
            setIsOpen(true);
        } else {
            return;
        }
    };

    return (
        <div className='user-redux-container'>
            <div className='title'>User Redux</div>
            <div className='user-redux-body'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 my-3'><FormattedMessage id='manage-user.add' /></div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.email' /></label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.password' /></label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.first-name' /></label>
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.last-name' /></label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.phone-number' /></label>
                            <input type="text" className="form-control" placeholder="Phone number" />
                        </div>
                        <div className="form-group col-9">
                            <label><FormattedMessage id='manage-user.address' /></label>
                            <input type="text" className="form-control" placeholder="Address" />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.gender' /></label>
                            <select class="form-select">
                                {arrGender && arrGender.length > 0 &&
                                    arrGender.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.position' /></label>
                            <select class="form-select">
                                {arrPosition && arrPosition.length > 0 &&
                                    arrPosition.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.role' /></label>
                            <select class="form-select">
                                {arrRole && arrRole.length > 0 &&
                                    arrRole.map((item, index) => {
                                        return (
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.image' /></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type="file" hidden onChange={(event) => handleOnChangeImg(event)} />
                                <label htmlFor='previewImg' className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
                                <div className='preview-image my-2' style={{ backgroundImage: `url(${prevImg})` }} onClick={() => openPreviewImg()}></div>
                            </div>
                        </div>
                        <div className='col-12 mt-3'>
                            <button type="submit" className="btn btn-primary"><FormattedMessage id='manage-user.btn-add' /></button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen &&
                <Lightbox mainSrc={prevImg} onCloseRequest={() => setIsOpen(false)} />
            }
        </div>
    );
}

export default UserRedux;