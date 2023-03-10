import { useEffect, useState } from 'react';
import localization from 'moment/locale/vi';
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';

function DoctorSchedule(props) {
    const language = useSelector(state => state.app.language);
    const [allDays, setAllDays] = useState([]);

    useEffect(() => {
        getAllDate();
    }, []);

    useEffect(() => {
        getAllDate();
    }, [language]);

    const getAllDate = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (language === LANGUAGES.VI) {
                obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
            } else {
                obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }
        setAllDays(arrDate);
    };

    const handleOnChangeSelect = async (event) => {
        if (props.doctorId && props.doctorId !== -1) {
            let doctorId = props.doctorId;
            let date = event.target.value;
            let res = await getScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                console.log(res);
            }
        }
    };

    return (
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

            </div>
        </div>
    );
}

export default DoctorSchedule;