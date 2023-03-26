import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialties } from '../../../services/userService';
import { withRouter } from 'react-router';
import './Specialty.scss';

function Specialty(props) {
    const { settings } = props;
    const [specialties, setSpecialties] = useState([]);

    useEffect(() => {
        (async () => {
            let res = await getAllSpecialties();
            if (res && res.errCode === 0) {
                setSpecialties(res.data ? res.data : []);
            }
        })();
    }, []);

    const viewDetailSpecialty = (specialty) => {
        if (specialty && specialty.id && props.history) {
            props.history.push(`/detail-specialty/${specialty.id}`);
        }
    };

    return (
        <div className='section-share section-specialty'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id='homepage.specialty' /></span>
                    <button className="btn-section"><FormattedMessage id='homepage.btn-more' /></button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {specialties && specialties.length > 0 &&
                            specialties.map((item, index) => {
                                return (
                                    <div key={index} className="section-customize specialty-child">
                                        <div className="bg-image section-specialty" style={{ backgroundImage: `url(${item.image})` }} />
                                        <div className="specialty-name" onClick={() => viewDetailSpecialty(item)}>{item.name}</div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Specialty);