import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import './Specialty.scss';

function Specialty(props) {
    const { settings } = props;

    return (
        <div className='section-share section-specialty'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id='homepage.specialty' /></span>
                    <button className="btn-section"><FormattedMessage id='homepage.btn-more' /></button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        <div className="section-customize">
                            <div className="bg-image section-specialty" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-specialty" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-specialty" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-specialty" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-specialty" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-specialty" />
                            <div>Cơ xương khớp</div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Specialty;