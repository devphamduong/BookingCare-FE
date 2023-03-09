import { useEffect } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors, fetchSchedule } from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import './ManageSchedule.scss';

function ManageSchedule() {
    const dispatch = useDispatch();
    const allDoctors = useSelector(state => state.admin.allDoctors);
    const times = useSelector(state => state.admin.times);
    const language = useSelector(state => state.app.language);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listDoctors, setListDoctors] = useState([]);
    const [rangeTime, setRangeTime] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        dispatch(fetchAllDoctors());
        dispatch(fetchSchedule());
    }, []);

    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [allDoctors]);

    useEffect(() => {
        setRangeTime(times);
    }, [times]);

    useEffect(() => {
        let dataSelect = buildDataSelect(allDoctors);
        setListDoctors(dataSelect);
    }, [language]);

    const buildDataSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let obj = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                obj.value = item.id;
                result.push(obj);
            });
        }
        return result;
    };

    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date);
    };

    return (
        <div className='manage-schedule-container'>
            <div className='title'>
                <FormattedMessage id='menu.doctor.title' />
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <label><FormattedMessage id='menu.doctor.title-doctor' /></label>
                        <Select
                            defaultValue={selectedDoctor}
                            onChange={handleChangeSelect}
                            options={listDoctors}
                            placeholder={<FormattedMessage id='menu.doctor.choose-doctor' />}
                        />
                    </div>
                    <div className='col-6'>
                        <label><FormattedMessage id='menu.doctor.title-date' /></label>
                        <DatePicker className='form-control' value={currentDate} minDate={new Date()} onChange={() => handleOnChangeDatePicker()} />
                    </div>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button className='btn btn-schedule' key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                                );
                            })
                        }
                    </div>
                    <div className='col-12 mt-3'>
                        <button className='btn btn-primary'><FormattedMessage id='menu.doctor.btn-save' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSchedule;