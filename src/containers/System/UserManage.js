import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getAllUsers } from '../../services/userService';
import './UserManage.scss';

function UserManage(props) {
    const [listUsers, setListUsers] = useState([]);

    useEffect(async () => {
        let res = await getAllUsers('ALL');
        if (res && res.errCode === 0) {
            setListUsers(res.users);
        }
    }, []);

    return (
        <div className="users-container container">
            <div className='title'>Manage users</div>
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
    );
}

export default UserManage;
