import { useState } from "react";
import { useEffect } from "react";
import { verifyAnAppointment } from "../../services/userService";
import Header from "../HomePage/Header";
import './VerifyEmail.scss';

function VerifyEmail(props) {
    const [statusVerify, setStatusVerify] = useState(false);
    const [errCode, setErrCode] = useState(0);

    useEffect(() => {
        (async () => {
            if (props.location && props.location.search) {
                const urlParams = new URLSearchParams(props.location.search);
                const token = urlParams.get('token');
                const doctorId = urlParams.get('doctorId');
                let res = await verifyAnAppointment({
                    token, doctorId
                });
                if (res && res.errCode === 0) {
                    setStatusVerify(true);
                    setErrCode(res.errCode);
                } else {
                    setStatusVerify(true);
                    setErrCode(res && res.errCode ? res.errCode : -1);
                }
            }
        })();
    }, []);

    return (
        <>
            <Header />
            <div className="verify-email-container">
                {statusVerify
                    ? <div>
                        {+errCode === 0
                            ? <div className="infor-booking">Xác nhận lịch hẹn thành công!</div>
                            : <div className="infor-booking">Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                        }
                    </div>
                    : <div>Loading data...</div>}
            </div>
        </>
    );
}

export default VerifyEmail;