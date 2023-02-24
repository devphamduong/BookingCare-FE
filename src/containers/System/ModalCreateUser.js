import { useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useImmer } from 'use-immer';
import { emitter } from '../../utils/emitter';

function ModalCreateUser(props) {
    const { showModalCreate, handleCloseModalCreate, createNewUser } = props;
    const [inputs, setInputs] = useImmer({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: ''
    });

    useEffect(() => {
        listenToEmitter();
    }, []);

    const listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_DATA_MODAL_CREATE_USER', () => {
            setInputs({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            });
        });
    };

    const handleOnChangeInput = (event, id) => {
        setInputs(draft => {
            draft[id] = event.target.value;
        });
    };

    const checkValidInput = () => {
        let isValid = true;
        let arrInputs = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInputs.length; i++) {
            if (!inputs[arrInputs[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInputs[i]);
                break;
            }
        }
        return isValid;
    };

    const handleCreateUser = () => {
        let isValid = checkValidInput();
        if (isValid) {
            createNewUser(inputs);
        }
    };

    return (
        <Modal isOpen={showModalCreate} toggle={handleCloseModalCreate} className="modal-create-user-container"
            size="lg" centered>
            <ModalHeader toggle={handleCloseModalCreate}>Create new user</ModalHeader>
            <ModalBody>
                <div className='modal-create-user-body'>
                    <div className="form-group input-container">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" value={inputs.email} onChange={(event) => handleOnChangeInput(event, 'email')} />
                    </div>
                    <div className="form-group input-container">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" value={inputs.password} onChange={(event) => handleOnChangeInput(event, 'password')} />
                    </div>
                    <div className="form-group input-container">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" value={inputs.firstName} onChange={(event) => handleOnChangeInput(event, 'firstName')} />
                    </div>
                    <div className="form-group input-container">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" value={inputs.lastName} onChange={(event) => handleOnChangeInput(event, 'lastName')} />
                    </div>
                    <div className="form-group input-container max-width-input">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Apartment, studio, or floor" value={inputs.address} onChange={(event) => handleOnChangeInput(event, 'address')} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => handleCreateUser()}>Create</Button>
                <Button color="secondary" onClick={handleCloseModalCreate}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalCreateUser;