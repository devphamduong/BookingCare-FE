import _ from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { useSelector } from 'react-redux';
import { getDoctorProfileById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './ProfileDoctor.scss';

function ProfileDoctor(props) {
    const language = useSelector(state => state.app.language);
    const { isShowDescription, dataSchedule } = props;
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        (async () => {
            let data = await getDoctorInfor(props.doctorId);
            setDataProfile(data);
        })();
    }, [props.doctorId]);

    const getDoctorInfor = async (id) => {
        let result = {};
        if (id) {
            let res = await getDoctorProfileById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderTimeBooking = (dataSchedule) => {
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let time = language === LANGUAGES.VI ? dataSchedule.timeTypeData.valueVi : dataSchedule.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/yyyy') : moment.unix(+dataSchedule.date / 1000).locale('en').format('ddd - MM/DD/yyyy');
            return (
                <>
                    <div>{time} - {capitalizeFirstLetter(date)}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            );
        }
        return <></>;
    };

    let nameVi = '', nameEn = '';
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
        <div className='profile-doctor-container'>
            <div className='intro-doctor'>
                <div className='content-left' style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}></div>
                <div className='content-right'>
                    <div className='up'>
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div>
                    <div className='down'>
                        {isShowDescription
                            ?
                            <>
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                    <span>{dataProfile.Markdown.description}</span>}
                            </>
                            :
                            <>
                                {renderTimeBooking(dataSchedule)}
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className='price'>
                <FormattedMessage id='patient.extra-infor.price-title' /> <NumericFormat value={dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor?.priceTypeData && language === LANGUAGES.VI ? dataProfile.Doctor_Infor?.priceTypeData?.valueVi : dataProfile.Doctor_Infor?.priceTypeData?.valueEn} displayType={'text'} thousandSeparator={true} suffix={language === LANGUAGES.VI ? ' VND' : ' USD'} />
            </div>
        </div>
    );
};

export default ProfileDoctor;