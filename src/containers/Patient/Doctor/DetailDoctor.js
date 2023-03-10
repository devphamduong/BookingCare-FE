import { useState } from 'react';
import { useEffect } from 'react';
import { getDetailDoctorById } from '../../../services/userService';
import Header from '../../HomePage/Header';
import { LANGUAGES } from '../../../utils/constant';
import './DetailDoctor.scss';
import { useSelector } from 'react-redux';
import DoctorSchedule from './DoctorSchedule';

function DetailDoctor(props) {
    const [detailDoctor, setDetailDoctor] = useState({});
    const language = useSelector(state => state.app.language);

    useEffect(async () => {
        if (props.match && props.match.params && props.match.params.id) {
            let id = props.match.params.id;
            let res = await getDetailDoctorById(id);
            if (res && res.errCode === 0) {
                setDetailDoctor(res.data);
            }
        }
    }, []);

    let nameVi = '', nameEn = '';
    if (detailDoctor && detailDoctor.positionData) {
        nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
        <>
            <Header isShowBanner={false} />
            <div className='detail-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}></div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                <span>{detailDoctor.Markdown.description}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='schedule-doctor'>
                    <div className='content-left'>
                        <DoctorSchedule doctorId={detailDoctor && detailDoctor.id ? detailDoctor.id : -1} />
                    </div>
                    <div className='content-right'>

                    </div>
                </div>
                <div className='detail-infor-doctor'>
                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                    }
                </div>
                <div className='comment-doctor'>

                </div>
            </div>
        </>
    );
}

export default DetailDoctor;