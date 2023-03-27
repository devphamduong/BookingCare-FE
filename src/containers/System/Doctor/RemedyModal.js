import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { CommonUtils, LANGUAGES } from '../../../utils';
import './RemedyModal.scss';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

function RemedyModal(props) {
    let { show, handleClose, dataModal, sendRemedy } = props;
    const [email, setEmail] = useState('');
    const [imgBase64, setImgBase64] = useState('');

    useEffect(() => {
        if (dataModal) {
            setEmail(dataModal.email);
        }
    }, [dataModal]);

    const handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.toBase64(file);
            setImgBase64(base64);
        }
    };

    const handleSendRemedy = async () => {
        sendRemedy(email, imgBase64);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered size='lg' backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Gửi hóa đơn khám bệnh
                        {/* <FormattedMessage id='patient.booking-modal.title' /> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='booking-modal-body'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control' value={email} disabled />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input type='file' className='form-control' onChange={(event) => handleOnChangeImg(event)} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                        {/* <FormattedMessage id='patient.booking-modal.btn-cancel' /> */}
                    </Button>
                    <Button variant="primary" onClick={() => handleSendRemedy()}>
                        Gửi
                        {/* <FormattedMessage id='patient.booking-modal.btn-confirm' /> */}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemedyModal;