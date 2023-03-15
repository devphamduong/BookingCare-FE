import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDoctorExtraInforById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { NumericFormat } from 'react-number-format';
import './DoctorExtraInfor.scss';
import { FormattedMessage } from 'react-intl';

function DoctorExtraInfor(props) {
    const language = useSelector(state => state.app.language);
    const { doctorId } = props;
    const [isshowDetail, setIsShowDetail] = useState(false);
    const [extraInfor, setExtraInfor] = useState({});

    useEffect(() => {
        if (props.doctorId !== -1) {
            (async () => {
                let res = await getDoctorExtraInforById(doctorId);
                if (res && res.errCode === 0) {
                    setExtraInfor(res.data);
                }
            })();
        }
    }, [doctorId]);

    return (
        <div className='doctor-extra-infor-container'>
            <div className='content-up'>
                <div className='text-upper'><FormattedMessage id='patient.extra-infor.address-title' /></div>
                <div className='name-clinic'>
                    {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                </div>
                <div className='name-address'>
                    {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                </div>
            </div>
            <div className='content-down'>
                {!isshowDetail
                    ? <div className='short-infor'><FormattedMessage id='patient.extra-infor.price-title' /><NumericFormat className='currency' value={extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI ? extraInfor.priceTypeData?.valueVi : extraInfor.priceTypeData?.valueEn} displayType={'text'} thousandSeparator={true} suffix={language === LANGUAGES.VI ? ' VND' : ' USD'} /><span className='show-price' onClick={() => setIsShowDetail(true)}><FormattedMessage id='patient.extra-infor.show' /></span></div>
                    : <>
                        <div className='text-upper title-price'><FormattedMessage id='patient.extra-infor.price-title' /> .</div>
                        <div className='detail-infor'>
                            <div className='price'>
                                <span className='left'><FormattedMessage id='patient.extra-infor.price-title' /></span>
                                <span className='right'><NumericFormat className='currency' value={extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI ? extraInfor.priceTypeData?.valueVi : extraInfor.priceTypeData?.valueEn} displayType={'text'} thousandSeparator={true} suffix={language === LANGUAGES.VI ? ' VND' : ' USD'} /></span>
                            </div>
                            <div className='note'>{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                        </div>
                        <div className='payment'><FormattedMessage id='patient.extra-infor.payment-title' />{extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? extraInfor.paymentTypeData?.valueVi : extraInfor.paymentTypeData?.valueEn}</div>
                        <div className='hide-price'>
                            <span onClick={() => setIsShowDetail(false)}><FormattedMessage id='patient.extra-infor.hide' /></span>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default DoctorExtraInfor;