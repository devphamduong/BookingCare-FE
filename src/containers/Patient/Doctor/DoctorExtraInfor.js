import { useState } from 'react';
import { useSelector } from 'react-redux';
import './DoctorExtraInfor.scss';

function DoctorExtraInfor(props) {
    const language = useSelector(state => state.app.language);
    const { doctorId } = props;
    const [isshowDetail, setIsShowDetail] = useState(false);

    return (
        <div className='doctor-extra-infor-container'>
            <div className='content-up'>
                <div className='text-upper'>ĐỊA CHỈ KHÁM</div>
                <div className='name-clinic'>Phòng khám chuyên khoa Da Liễu</div>
                <div className='name-address'>Tiểu khu 1 - thị trấn Phù Yên - tỉnh Sơn La</div>
            </div>
            <div className='content-down'>
                {!isshowDetail
                    ? <div className='short-infor'>GIÁ KHÁM: 250.000đ. <span className='show-price' onClick={() => setIsShowDetail(true)}>Xem chi tiết</span></div>
                    : <>
                        <div className='text-upper title-price'>GIÁ KHÁM: .</div>
                        <div className='detail-infor'>
                            <div className='price'>
                                <span className='left'>Giá khám</span>
                                <span className='right'>250.000đ</span>
                            </div>
                            <div className='note'>Được ưu tiên khám trước khi đặt khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</div>
                        </div>
                        <div className='payment'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                        <div className='hide-price'>
                            <span onClick={() => setIsShowDetail(false)}>Ẩn bảng giá</span>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default DoctorExtraInfor;