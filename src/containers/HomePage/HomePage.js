import Header from "../HomePage/Header";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from './Section/HandBook';

function HomePage(props) {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div>
            <Header />
            <Specialty settings={settings} />
            <MedicalFacility settings={settings} />
            <OutStandingDoctor settings={settings} />
            <HandBook settings={settings} />
        </div>
    );
}

export default HomePage;