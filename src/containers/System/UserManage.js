import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers, createUser, deleteUser, updateUser } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import './UserManage.scss';

function UserManage(props) {
    const [listUsers, setListUsers] = useState([]);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const handleCloseModalCreate = () => setShowModalCreate(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const handleCloseModalUpdate = () => setShowModalUpdate(false);
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            setListUsers(res.users);
        }
    };

    const createNewUser = async (data) => {
        try {
            let res = await createUser(data);
            if (res && res.errCode === 0) {
                await fetchAllUsers();
                setShowModalCreate(false);
                emitter.emit('EVENT_CLEAR_DATA_MODAL_CREATE_USER');
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditUser = (user) => {
        setShowModalUpdate(true);
        setDataUser(user);
    };

    const doUpdateUser = async (user) => {
        try {
            let res = await updateUser(user);
            if (res && res.errCode === 0) {
                await fetchAllUsers();
                handleCloseModalUpdate();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async (user) => {
        try {
            let res = await deleteUser(user.id);
            if (res && res.errCode === 0) {
                await fetchAllUsers();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="users-container container">
                <div className='title'>Manage users</div>
                <div className=''>
                    <button className='btn btn-primary' onClick={() => setShowModalCreate(true)}><i className="fas fa-plus"></i> Add new User</button>
                </div>
                <div className='users-table mt-4'>
                    <table id="users">
                        <thead>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {listUsers && listUsers.length > 0 &&
                                listUsers.map((item, index) => {
                                    return (
                                        <tr key={`user-${index}`}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn btn-warning mx-1' onClick={() => handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn btn-danger mx-1' onClick={() => handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalUser showModalCreate={showModalCreate} handleCloseModalCreate={handleCloseModalCreate} createNewUser={createNewUser} showModalUpdate={showModalUpdate} handleCloseModalUpdate={handleCloseModalUpdate} dataUser={dataUser} doUpdateUser={doUpdateUser} />
        </>
    );
}

export default UserManage;
