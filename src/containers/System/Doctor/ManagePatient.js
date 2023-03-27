import DatePicker from '../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getListPatientForDoctor } from '../../../services/userService';
import moment from 'moment';

function ManagePatient(props) {
    const user = useSelector(state => state.user.userInfo);
    const language = useSelector(state => state.app.language);
    const [currentDate, setCurrentDate] = useState(moment(new Date()).startOf('day').valueOf());
    const [dataPatient, setDataPatient] = useState([]);

    useEffect(() => {
        let formattedDate = new Date(currentDate).getTime();
        getDataPatient(user, formattedDate);
    }, []);

    useEffect(() => {
        let formattedDate = new Date(currentDate).getTime();
        getDataPatient(user, formattedDate);
    }, [currentDate]);

    const getDataPatient = async (user, formattedDate) => {
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

    const handleConfirm = () => {

    };

    const handleSendRemedy = () => {

    };

    return (
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
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className='btn btn-info' onClick={() => handleConfirm()}>Xác nhận</button>
                                                    <button className='btn btn-danger' onClick={() => handleSendRemedy()}>Gửi hóa đơn</button>
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
    );
}

export default ManagePatient;