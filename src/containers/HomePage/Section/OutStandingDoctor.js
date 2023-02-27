import Slider from "react-slick";

function OutStandingDoctor(props) {
    const { settings } = props;

    return (
        <div className='section-share section-outstanding-doctor'>
            <div className='section-container'>
                <div className="section-header">
                    <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-image section-outstanding-doctor" />
                                </div>
                                <div className="position text-center">
                                    <div>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Phạm Chu Dương</div>
                                    <div>Cơ Xương khớp</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-image section-outstanding-doctor" />
                                </div>
                                <div className="position text-center">
                                    <div>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Phạm Chu Dương</div>
                                    <div>Cơ Xương khớp</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-image section-outstanding-doctor" />
                                </div>
                                <div className="position text-center">
                                    <div>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Phạm Chu Dương</div>
                                    <div>Cơ Xương khớp</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-image section-outstanding-doctor" />
                                </div>
                                <div className="position text-center">
                                    <div>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Phạm Chu Dương</div>
                                    <div>Cơ Xương khớp</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-image section-outstanding-doctor" />
                                </div>
                                <div className="position text-center">
                                    <div>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Phạm Chu Dương</div>
                                    <div>Cơ Xương khớp</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-customize">
                            <div className="customize-border">
                                <div className="outer-bg">
                                    <div className="bg-image section-outstanding-doctor" />
                                </div>
                                <div className="position text-center">
                                    <div>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Phạm Chu Dương</div>
                                    <div>Cơ Xương khớp</div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default OutStandingDoctor;