import { useState } from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { getAllCode } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

function UserRedux(props) {
    const language = useSelector(state => state.app.language);
    const [arrGender, setArrGender] = useState([]);

    useEffect(() => {
        fetchAllCode('gender');
    }, []);

    const fetchAllCode = async (type) => {
        let res = await getAllCode(type);
        if (res && res.errCode === 0) {
            setArrGender(res.data);
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
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.role' /></label>
                            <select class="form-select">
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="form-group col-3">
                            <label><FormattedMessage id='manage-user.image' /></label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className='col-12 mt-3'>
                            <button type="submit" className="btn btn-primary"><FormattedMessage id='manage-user.btn-add' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRedux;