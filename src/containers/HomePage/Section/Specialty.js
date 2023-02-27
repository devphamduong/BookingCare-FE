import Slider from "react-slick";
import './Specialty.scss';

function Specialty(props) {
    const { settings } = props;

    return (
        <div className='section-share section-specialty'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section">Chuyên khoa phổ biến</span>
                    <button className="btn-section">Xem thêm</button>
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