import { useState } from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, fetchGender, fetchPosition, fetchRole } from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import './UserRedux.scss';
import 'react-image-lightbox/style.css';
import { useImmer } from 'use-immer';

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
    const [inputs, setInputs] = useImmer({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: '',
        positionId: '',
        roleId: '',
        image: ''
    });

    useEffect(() => {
        dispatch(fetchGender());
        dispatch(fetchPosition());
        dispatch(fetchRole());
    }, []);

    useEffect(() => {
        setArrGender(genders);
        setInputs(draft => {
            draft['gender'] = genders && genders.length > 0 ? genders[0].key : '';
        });
    }, [genders]);

    useEffect(() => {
        setArrPosition(positions);
        setInputs(draft => {
            draft['positionId'] = positions && positions.length > 0 ? positions[0].key : '';
        });
    }, [positions]);

    useEffect(() => {
        setArrRole(roles);
        setInputs(draft => {
            draft['roleId'] = roles && roles.length > 0 ? roles[0].key : '';
        });
    }, [roles]);

    const handleOnChangeImg = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objURL = URL.createObjectURL(file);
            setPrevImg(objURL);
            setInputs(draft => {
                draft['image'] = file;
            });
        }
    };

    const openPreviewImg = () => {
        if (prevImg) {
            setIsOpen(true);
        } else {
            return;
        }
    };

    const onChangeInput = (event, id) => {
        if (event && event.target && event.target.value) {
            setInputs(draft => {
                draft[id] = event.target.value;
            });
        }
    };

    const checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;
        for (let i = 0; i < arrCheck.length; i++) {
            if (!inputs[arrCheck[i]]) {
                isValid = false;
                alert('Required "' + arrCheck[i] + '" parameter!');
                break;
            }
        }
        return isValid;
    };

    const createUser = () => {
        let isValid = checkValidateInput();
        if (isValid) {
            dispatch(createNewUser(inputs));
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
                            <input type="email" className="form-control" placeholder="Email" value={inputs.email} onChange={(event) => onChangeInput(event, 'email')} />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.password' /></label>
                            <input type="password" className="form-control" placeholder="Password" value={inputs.password} onChange={(event) => onChangeInput(event, 'password')} />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.first-name' /></label>
                            <input type="text" className="form-control" placeholder="First name" value={inputs.firstName} onChange={(event) => onChangeInput(event, 'firstName')} />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.last-name' /></label>
                            <input type="text" className="form-control" placeholder="Last name" value={inputs.lastName} onChange={(event) => onChangeInput(event, 'lastName')} />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.phone-number' /></label>
                            <input type="text" className="form-control" placeholder="Phone number" value={inputs.phoneNumber} onChange={(event) => onChangeInput(event, 'phoneNumber')} />
                        </div>
                        <div className="form-group col-9">
                            <label><FormattedMessage id='manage-user.address' /></label>
                            <input type="text" className="form-control" placeholder="Address" value={inputs.address} onChange={(event) => onChangeInput(event, 'address')} />
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.gender' /></label>
                            <select class="form-select" onChange={(event) => onChangeInput(event, 'gender')}>
                                {arrGender && arrGender.length > 0 &&
                                    arrGender.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.position' /></label>
                            <select class="form-select" onChange={(event) => onChangeInput(event, 'positionId')}>
                                {arrPosition && arrPosition.length > 0 &&
                                    arrPosition.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.role' /></label>
                            <select class="form-select" onChange={(event) => onChangeInput(event, 'roleId')}>
                                {arrRole && arrRole.length > 0 &&
                                    arrRole.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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
                            <button type="submit" className="btn btn-primary" onClick={() => createUser()}><FormattedMessage id='manage-user.btn-add' /></button>
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