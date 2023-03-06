import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAUser, fetchAllUsers } from '../../../store/actions/adminActions';

function TableManageUser(props) {
    const dispatch = useDispatch();
    const users = useSelector(state => state.admin.users);
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        setListUsers(users);
    }, [users]);

    const handleEditUser = (user) => {
        props.handleUpdateUser(user);
    };

    const handleDeleteUser = async (user) => {
        if (user && user.id) {
            dispatch(deleteAUser(user.id));
        } else {
            return;
        }
    };

    return (
        <>
            <div className="users-container">
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
        </>
    );
}

export default TableManageUser;