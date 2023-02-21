import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalCreateUser(props) {
    const { showModalCreate, handleCloseModalCreate } = props;

    return (
        <Modal isOpen={showModalCreate} toggle={handleCloseModalCreate} className="modal-create-user-container"
            size="lg" centered>
            <ModalHeader toggle={handleCloseModalCreate}>Create new user</ModalHeader>
            <ModalBody>
                <div className='modal-create-user-body'>
                    <div className="form-group input-container">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group input-container">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-group input-container">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                    </div>
                    <div className="form-group input-container">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                    </div>
                    <div className="form-group input-container max-width-input">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Apartment, studio, or floor" />
                    </div>
                    {/* <div className="form-group input-container">
                        <label>Phone number</label>
                        <input type="text" className="form-control" placeholder='Phone number' />
                    </div> */}
                    {/* <div className="form-group input-container">
                        <label>Gender</label>
                        <select className="form-control">
                            <option selected value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
                    </div>
                    <div className="form-group input-container">
                        <label>Role</label>
                        <select className="form-control">
                            <option selected value="1">Admin</option>
                            <option value="2">Doctor</option>
                            <option value="3">Patient</option>
                        </select>
                    </div> */}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleCloseModalCreate}>Create</Button>
                <Button color="secondary" onClick={handleCloseModalCreate}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalCreateUser;