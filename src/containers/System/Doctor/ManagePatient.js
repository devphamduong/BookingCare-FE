import DatePicker from '../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import { useState } from 'react';

function ManagePatient(props) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0]);
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
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagePatient;