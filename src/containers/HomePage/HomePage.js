import Header from "../HomePage/Header";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from './Section/HandBook';
import About from "./Section/About";
import Footer from "./Footer";

function HomePage(props) {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div>
            <Header isShowBanner={true} />
            <Specialty settings={settings} />
            <MedicalFacility settings={settings} />
            <OutStandingDoctor settings={settings} />
            <HandBook settings={settings} />
            <About />
            <Footer />
        </div>
    );
}

export default HomePage;