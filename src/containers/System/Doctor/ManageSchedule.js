import { useEffect } from 'react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors, fetchSchedule } from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import './ManageSchedule.scss';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { dateFormat } from '../../../utils';

function ManageSchedule() {
    const dispatch = useDispatch();
    const allDoctors = useSelector(state => state.admin.allDoctors);
    const times = useSelector(state => state.admin.times);
    const language = useSelector(state => state.app.language);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [listDoctors, setListDoctors] = useState([]);
    const [rangeTime, setRangeTime] = useImmer([]);
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
        let data = times;
        if (data && data.length > 0) {
            // data.map(item => {
            //     item.isSelected = false;
            //     return item;
            // });
            data = data.map(item => ({ ...item, isSelected: false }));
        }
        setRangeTime(data);
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
        setCurrentDate(date[0]);
    };

    const handleSelectTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            if (time) {
                setRangeTime(draft => {
                    let index = draft.findIndex(item => item.id === time.id);
                    draft[index].isSelected = !draft[index].isSelected;
                });
            }
        }
    };

    const handleSaveSchedule = () => {
        let result = [];
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('The doctor has not been chosen!');
            return;
        } else if (!currentDate) {
            toast.error('The date has not been chosen!');
            return;
        }
        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        if (rangeTime && rangeTime.length > 0) {
            let selectedTimes = rangeTime.filter(item => item.isSelected === true);
            if (selectedTimes && selectedTimes.length > 0) {
                selectedTimes.map(item => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = formatedDate;
                    obj.time = item.keyMap;
                    result.push(obj);
                });
            } else {
                toast.error('The time has not been chosen!');
                return;
            }
        }
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
                        <DatePicker className='form-control' value={currentDate} minDate={new Date()} onChange={handleOnChangeDatePicker} />
                    </div>
                    <div className='col-12 pick-hour-container'>
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button className={item.isSelected ? 'active btn btn-schedule' : 'btn btn-schedule'} key={index} onClick={() => handleSelectTime(item)}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
                                );
                            })
                        }
                    </div>
                    <div className='col-12 mt-3'>
                        <button className='btn btn-primary' onClick={() => handleSaveSchedule()}><FormattedMessage id='menu.doctor.btn-save' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSchedule;