import Slider from "react-slick";
import './Specialty.scss';

function Specialty(props) {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div className='section-specialty'>
            <div className='specialty-container'>
                <div className="specialty-header">
                    <span className="title-section">Chuyên khoa phổ biến</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="specialty-body">
                    <Slider {...settings}>
                        <div className="specialty-customize">
                            <div className="bg-image" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image" />
                            <div>Cơ xương khớp</div>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image" />
                            <div>Cơ xương khớp</div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Specialty;