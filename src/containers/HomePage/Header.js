import './Header.scss';

function Header(props) {
    return (
        <>
            <div className="home-header-container">
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='header-logo'></div>
                    </div>
                    <div className='middle-content'>
                        <div className='child-content'>
                            <div><b>Chuyên khoa</b></div>
                            <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Cơ sở y tế</b></div>
                            <div className='sub-title'>Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Bác sĩ</b></div>
                            <div className='sub-title'>Chọn bác sĩ giỏi</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Gói khám</b></div>
                            <div className='sub-title'>Khám sức khỏe tổng quát</div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'><i class="fas fa-question-circle"></i> Hỗ trợ</div>
                        <div className='language'>VN</div>
                    </div>
                </div>
            </div>
            <div className='home-header-banner'>
                <div className="home-header-banner-sub1">
                    <div className='title1'>NỀN TẢNG Y TẾ</div>
                    <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <input type={'text'} placeholder='Tìm chuyên khoa khám bệnh' />
                    </div>
                </div>
                <div className="home-header-banner-sub2">
                    <div className='options'>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon1'></div>
                            </div>
                            <div className="text-child">
                                Khám Chuyên khoa
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon2'></div>
                            </div>
                            <div className="text-child">
                                Khám từ xa
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon3'></div>
                            </div>
                            <div className="text-child">
                                Khám tổng quát
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon4'></div>
                            </div>
                            <div className="text-child">
                                Xét nghiệm y học
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon5'></div>
                            </div>
                            <div className="text-child">
                                Sức khỏe tinh thần
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon6'></div>
                            </div>
                            <div className="text-child">
                                Khám nha khoa
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon7'></div>
                            </div>
                            <div className="text-child">
                                Gói phẫu thuật
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon8'></div>
                            </div>
                            <div className="text-child">
                                Sản phẩm y tế
                            </div>
                        </div>
                        <div className="option-child">
                            <div className="icon-child">
                                <div className='icon9'></div>
                            </div>
                            <div className="text-child">
                                Sức khỏe doanh nghiệp
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;