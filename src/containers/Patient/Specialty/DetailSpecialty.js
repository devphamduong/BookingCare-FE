import { useState } from 'react';
import Header from '../../HomePage/Header';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import './DetailSpecialty.scss';

function DetailSpecialty(props) {
    const [arrDoctorId, setArrDoctorId] = useState([13, 14]);

    return (
        <div className='detail-specialty-container'>
            <Header />
            <div className='detail-specialty-body'>
                <div className='detail-specialty-description'>

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