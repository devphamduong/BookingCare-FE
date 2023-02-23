import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers, createUser } from '../../services/userService';
import ModalCreateUser from './ModalCreateUser';
import './UserManage.scss';

function UserManage(props) {
    const [listUsers, setListUsers] = useState([]);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const handleCloseModalCreate = () => setShowModalCreate(false);

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
                                                <button className='btn btn-warning mx-1'><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn btn-danger mx-1'><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalCreateUser showModalCreate={showModalCreate} handleCloseModalCreate={handleCloseModalCreate} createNewUser={createNewUser} />
        </>
    );
}

export default UserManage;
