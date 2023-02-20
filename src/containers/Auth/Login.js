import * as actions from "../../store/actions";
import { FormattedMessage } from 'react-intl';
import './Login.scss';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function Login(props) {
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleLogin = () => {

    };

    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Enter your username" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input type={!isShowPassword ? "password" : "text"} className="form-control" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                <i className={!isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => setIsShowPassword(!isShowPassword)}></i>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => handleLogin()}>Login</button>
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
