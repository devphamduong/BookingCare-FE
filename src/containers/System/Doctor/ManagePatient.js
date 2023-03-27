import DatePicker from '../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getListPatientForDoctor, sendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

function ManagePatient(props) {
    const user = useSelector(state => state.user.userInfo);
    const language = useSelector(state => state.app.language);
    const [currentDate, setCurrentDate] = useState(moment(new Date()).startOf('day').valueOf());
    const [dataPatient, setDataPatient] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataModal, setDataModal] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        getDataPatient();
    }, []);

    useEffect(() => {
        getDataPatient();
    }, [currentDate]);

    const getDataPatient = async () => {
        let formattedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        });
        if (res && res.errCode === 0) {
            setDataPatient(res.data);
        }
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        };
        setShow(true);
        setDataModal(data);
    };

    const handleSendRemedy = async (email, imgBase64) => {
        setIsLoading(true);
        let res = await sendRemedy({
            email,
            imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language,
            patientName: dataModal.patientName
        });
        if (res && res.errCode === 0) {
            toast.success(res.message);
            handleClose();
            getDataPatient();
        } else {
            toast.error('Something wrong...');
        }
        setIsLoading(false);
    };

    return (
        <>
            <LoadingOverlay active={isLoading} spinner text='Loading...'>
                <div className='manage-patient-container'>
                    <div className='title'>
                        <FormattedMessage id='manage-patient.title' />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4'>
                                <label><FormattedMessage id='manage-schedule.title-date' /></label>
                                <DatePicker className='form-control' value={currentDate} minDate={new Date().setHours(0, 0, 0, 0)} onChange={handleOnChangeDatePicker} />
                            </div>
                            <div className='col-12'>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Thời gian</th>
                                            <th scope="col">Họ và tên</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col">Giới tính</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPatient && dataPatient.length > 0
                                            ? dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button className='btn btn-info' onClick={() => handleConfirm(item)}>Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            : <td>No data</td>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <RemedyModal show={show} handleClose={handleClose} dataModal={dataModal} sendRemedy={handleSendRemedy} />
            </LoadingOverlay>
        </>
    );
}

export default ManagePatient;