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
                        {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                            <span>{dataProfile.Markdown.description}</span>
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