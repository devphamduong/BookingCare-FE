import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

function MedicalFacility(props) {
    const { settings } = props;

    return (
        <div className='section-share section-medical-facility'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id='homepage.medical-facility' /></span>
                    <button className="btn-section"><FormattedMessage id='homepage.btn-more' /></button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility" />
                            <div>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility" />
                            <div>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility" />
                            <div>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility" />
                            <div>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility" />
                            <div>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-medical-facility" />
                            <div>Bệnh viện Hữu nghị Việt Đức</div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default MedicalFacility;