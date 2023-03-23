import _ from 'lodash';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useImmer } from 'use-immer';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGender } from '../../../../store/actions/adminActions';
import { LANGUAGES } from '../../../../utils';
import './BookingModal.scss';
import { makeAnAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

function BookingModal(props) {
    let { show, handleClose, dataSchedule } = props;

    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const genders = useSelector(state => state.admin.genders);
    const [inputs, setInputs] = useImmer({
        fullname: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: ''
    });
    const [doctorId, setDoctorId] = useState('');
    const [timeType, setTimeType] = useState();
    const [listGenders, setListGenders] = useState([]);
    const [selectedGender, setSelectedGender] = useState({});

    useEffect(() => {
        dispatch(fetchGender());
    }, []);

    const buildDataSelect = (data, type) => {
        let result = [];
        if (data && data.length > 0) {
            if (type === 'GENDER') {
                data.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    obj.value = item.keyMap;
                    result.push(obj);
                });
            }
        }
        return result;
    };

    useEffect(() => {
        let data = buildDataSelect(genders, 'GENDER');
        setListGenders(data);
    }, [genders]);

    useEffect(() => {
        let data = buildDataSelect(genders, 'GENDER');
        setListGenders(data);
    }, [language]);

    useEffect(() => {
        setDoctorId(dataSchedule.doctorId);
        setTimeType(dataSchedule.timeType);
    }, [dataSchedule]);

    const handleOnChangeInputs = (event, id) => {
        setInputs(draft => {
            draft[id] = event.target.value;
        });
    };

    const handleOnChangeDatePicker = (date) => {
        setInputs(draft => {
            draft['birthday'] = date[0];
        });
    };

    const handleChangeSelect = async (selectedOption) => {
        setSelectedGender(selectedOption);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const buildTimeBooking = (dataSchedule) => {
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let time = language === LANGUAGES.VI ? dataSchedule.timeTypeData.valueVi : dataSchedule.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? moment.unix(+dataSchedule.date / 1000).format('dddd - DD/MM/yyyy') : moment.unix(+dataSchedule.date / 1000).locale('en').format('ddd - MM/DD/yyyy');
            return `${time} - ${capitalizeFirstLetter(date)}`;
        }
        return '';
    };

    const buildDoctorName = (dataSchedule) => {
        if (dataSchedule && !_.isEmpty(dataSchedule)) {
            let name = language === LANGUAGES.VI ? `${dataSchedule.doctorData.lastName} ${dataSchedule.doctorData.firstName}` : `${dataSchedule.doctorData.firstName} ${dataSchedule.doctorData.lastName}`;
            return name;
        }
        return '';
    };

    const handleConfirmBooking = async () => {
        let date = new Date(inputs.birthday).getTime();
        let time = buildTimeBooking(dataSchedule);
        let doctorName = buildDoctorName(dataSchedule);
        let res = await makeAnAppointment({
            doctorId,
            fullname: inputs.fullname,
            email: inputs.email,
            address: inputs.address,
            reason: inputs.reason,
            date,
            timeType,
            selectedGender: selectedGender.value,
            language,
            time,
            doctorName
        });
        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            handleClose();
        } else {
            toast.error(res.errMessage);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size='lg' backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id='patient.booking-modal.title' /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='booing-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor doctorId={dataSchedule && !_.isEmpty(dataSchedule) ? dataSchedule.doctorId : ''} dataSchedule={dataSchedule} isShowDescription={false} isShowPrice={true} isShowLinkDetail={false} />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.full-name' /></label>
                                <input type='text' className='form-control' value={inputs.fullname} onChange={(event) => handleOnChangeInputs(event, 'fullname')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phone-number' /></label>
                                <input type='text' className='form-control' value={inputs.phoneNumber} onChange={(event) => handleOnChangeInputs(event, 'phoneNumber')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control' value={inputs.email} onChange={(event) => handleOnChangeInputs(event, 'email')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input type='text' className='form-control' value={inputs.address} onChange={(event) => handleOnChangeInputs(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input type='text' className='form-control' value={inputs.reason} onChange={(event) => handleOnChangeInputs(event, 'reason')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker className='form-control' value={inputs.birthday} onChange={handleOnChangeDatePicker} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                <Select
                                    value={selectedGender}
                                    onChange={handleChangeSelect}
                                    options={listGenders}
                                    placeholder={<FormattedMessage id='patient.booking-modal.choose-gender' />}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <FormattedMessage id='patient.booking-modal.btn-cancel' />
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmBooking()}>
                        <FormattedMessage id='patient.booking-modal.btn-confirm' />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookingModal;