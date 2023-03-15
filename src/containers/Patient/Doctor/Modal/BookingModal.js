import { Button, Modal } from 'react-bootstrap';
import './BookingModal.scss';

function BookingModal(props) {
    let { show, handleClose, dataSchedule } = props;

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size='lg' backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin đặt lịch khám bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='booing-modal-body'>
                        <div className='doctor-infor'>

                        </div>
                        <div className='price'>
                            Giá khám: 500,000 VND
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input type='text' className='form-control' />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Make an appointment
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BookingModal;