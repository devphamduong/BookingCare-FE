import { useEffect, useState } from 'react';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllCode, getDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import { useSelector } from 'react-redux';
import './DetailClinic.scss';

function DetailClinic(props) {
    const language = useSelector(state => state.app.language);
    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailClinic, setDataDetailClinic] = useState({});

    useEffect(() => {
        (async () => {
            if (props.match && props.match.params && props.match.params.id) {
                let id = props.match.params.id;
                let res = await getDetailClinicById({ id });
                if (res && res.errCode === 0) {
                    let data = res.data;
                    let arrDoctorId = [];
                    if (data && !_.isEmpty(res.data)) {
                        let arr = data.doctorClinic;
                        if (arr && arr.length > 0) {
                            arr.map(item => {
                                arrDoctorId.push(item.doctorId);
                            });
                        }
                    }
                    setDataDetailClinic(res.data);
                    setArrDoctorId(arrDoctorId);
                }
            }
        })();
    }, []);

    return (
        <div className='detail-clinic-container'>
            <Header />
            <div className='detail-clinic-body'>
                <div className='detail-clinic-description'>
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <>
                            <div>{dataDetailClinic.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                        </>
                    }
                </div>
                {arrDoctorId && arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, index) => {
                        return (
                            <div className='each-doctor' key={index}>
                                <div className='detail-content-left'>
                                    <div className='profile-doctor'>
                                        <ProfileDoctor isShowDescription={true} doctorId={item} isShowPrice={false} isShowLinkDetail={true} />
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

export default DetailClinic;