import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopDoctor } from '../../../store/actions';
import Slider from "react-slick";
import { useState } from "react";
import { LANGUAGES } from '../../../utils/constant';

function OutStandingDoctor(props) {
    const dispatch = useDispatch();
    const topDoctors = useSelector(state => state.admin.topDoctors);
    const language = useSelector(state => state.app.language);
    const { settings } = props;
    const [arrDoctors, setArrDoctors] = useState([]);

    useEffect(() => {
        dispatch(fetchTopDoctor());
    }, []);

    useEffect(() => {
        setArrDoctors(topDoctors);
    }, [topDoctors]);

    return (
        <div className='section-share section-outstanding-doctor'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {arrDoctors && arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                let imageBase64 = '';
                                if (item.image) {
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                }
                                return (
                                    <div className="section-customize" key={`doctor-${index}`}>
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div className="bg-image section-outstanding-doctor" style={{ backgroundImage: `url(${imageBase64})` }} />
                                            </div>
                                            <div className="position text-center">
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Cơ Xương khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default OutStandingDoctor;