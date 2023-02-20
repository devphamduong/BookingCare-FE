import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import './Login.scss';
import { useDispatch, useSelector } from "react-redux";

function Login(props) {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);

    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter your username" />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" />
                        </div>
                        <div className="col-12">
                            <button className="btn-login">Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Or Login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-twitter twitter"></i>
                            <i className="fab fa-google-plus-g google"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
