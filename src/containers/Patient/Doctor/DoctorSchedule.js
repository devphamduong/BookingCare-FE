import { useEffect, useState } from 'react';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

function DoctorSchedule(props) {
    const language = useSelector(state => state.app.language);
    const [allDays, setAllDays] = useState([]);
    const [allAvailableTime, setAllAvailableTime] = useState([]);
    const [dataSchedule, setDataSchedule] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        let arrDate = getAllDate();
        setAllDays(arrDate);
    }, []);

    useEffect(() => {
        let arrDate = getAllDate();
        if (props.doctorId !== -1) {
            (async () => {
                let res = await getScheduleByDate(props.doctorId, arrDate[0].value);
                setAllAvailableTime(res.data ? res.data : []);
            })();
        }
    }, [props.doctorId]);

    useEffect(() => {
        let arrDate = getAllDate();
        setAllDays(arrDate);
    }, [language]);

    const getAllDate = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).add(i, 'days').format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    obj.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    obj.label = today;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }
        return arrDate;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleOnChangeSelect = async (event) => {
        if (props.doctorId && props.doctorId !== -1) {
            let doctorId = props.doctorId;
            let date = event.target.value;
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                setAllAvailableTime(res.data ? res.data : []);
            }
        }
    };

    const handleBooking = (time) => {
        setDataSchedule(time);
        setShow(true);
    };

    return (
        <>
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                );
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className="fas fa-calendar-alt"><span> <FormattedMessage id='patient.detail-doctor.schedule' /></span></i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvailableTime.map((item, index) => {
                                        let time = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button key={index} onClick={() => handleBooking(item)} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>{time}</button>
                                        );
                                    })}
                                </div>
                                <div className='book-free'>
                                    <span><FormattedMessage id='patient.detail-doctor.choose' /> <i className="far fa-hand-point-up"></i> <FormattedMessage id='patient.detail-doctor.book-free' /></span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>}
                    </div>
                </div>
            </div>
            <BookingModal show={show} handleClose={handleClose} dataSchedule={dataSchedule} />
        </>
    );
}

export default DoctorSchedule;