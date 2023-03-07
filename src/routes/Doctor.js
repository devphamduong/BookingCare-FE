import { useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";

function Doctor(props) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const systemMenuPath = useSelector(state => state.app.systemMenuPath);

    return (
        <>
            {isLoggedIn && <Header />}
            < div className="system-container" >
                <div className="system-list">
                    <Switch>
                        <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                    </Switch>
                </div>
            </ div>
        </>
    );
}

export default Doctor;