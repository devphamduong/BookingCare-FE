import { useEffect, useState } from 'react';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import './DetailSpecialty.scss';
import { getAllCode, getDetailSpecialtyById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import { useSelector } from 'react-redux';

function DetailSpecialty(props) {
    const language = useSelector(state => state.app.language);
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailSpecialty, setDataDetailSpecialty] = useState({});
    const [listProvinces, setListProvinces] = useState([]);

    useEffect(() => {
        (async () => {
            if (props.match && props.match.params && props.match.params.id) {
                let id = props.match.params.id;
                let res = await getDetailSpecialtyById({ id, location: 'ALL' });
                let resProvince = await getAllCode('PROVINCE');
                if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                    let data = res.data;
                    let arrDoctorId = [];
                    if (data && !_.isEmpty(res.data)) {
                        let arr = data.doctorSpecialty;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId);
                            });
                        }
                    }
                    setDataDetailSpecialty(res.data);
                    setArrDoctorId(arrDoctorId);
                    setListProvinces(resProvince.data);
                }
            }
        })();
    }, []);

    const handleOnChangeSelect = (event) => {

    };

    return (
        <div className='detail-specialty-container'>
            <Header />
            <div className='detail-specialty-body'>
                <div className='detail-specialty-description'>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                    }
                </div>
                <div className='search-specialty-doctor'>
                    <select onChange={(event) => handleOnChangeSelect(event)}>
                        {listProvinces && listProvinces.length > 0 &&
                            listProvinces.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                );
                            })}
                    </select>
                </div>
                {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <div className='each-doctor' key={index}>
                                <div className='detail-content-left'>
                                    <div className='profile-doctor'>
                                        <ProfileDoctor isShowDescription={true} doctorId={item} />
                                    </div>
                                </div>
                                <div className='detail-content-right'>
                                    <div className='doctor-schedule'>
                                        <DoctorSchedule doctorId={item} />
                                    </div>
                                    <div className='doctor-extra-infor'>
                                        <DoctorExtraInfor doctorId={item} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default DetailSpecialty;