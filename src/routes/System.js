import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/UserRedux';
import Header from '../containers/Header/Header';

function System(props) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const systemMenuPath = useSelector(state => state.app.systemMenuPath);

    return (
        <>
            {isLoggedIn && <Header />}
            < div className="system-container" >
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />); }} />
                    </Switch>
                </div>
            </ div>
        </>
    );
}
export default System;