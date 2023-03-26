import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinics } from "../../../services/userService";
import './MedicalFacility.scss';

function MedicalFacility(props) {
    const { settings } = props;
    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await getAllClinics();
            if (res && res.errCode === 0) {
                setClinics(res.data ? res.data : []);
            }
        })();
    }, []);

    const viewDetailClinic = (clinic) => {
        if (clinic && clinic.id && props.history) {
            props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };

    return (
        <div className='section-share section-medical-facility'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id='homepage.medical-facility' /></span>
                    <button className="btn-section"><FormattedMessage id='homepage.btn-more' /></button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {clinics && clinics.length > 0 &&
                            clinics.map((item, index) => {
                                return (
                                    <div key={index} className="section-customize clinic-child">
                                        <div className="bg-image section-clinic" style={{ backgroundImage: `url(${item.image})` }} />
                                        <div className="clinic-name" onClick={() => viewDetailClinic(item)}>{item.name}</div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default MedicalFacility;