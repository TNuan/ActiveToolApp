import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css"

function Home() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEnterOTP, setIsEnterOTP] = useState(false);
    const [otp, setOtp] = useState("");


    const getSession = (e) => {
        e.preventDefault();
        setIsEnterOTP(true);
        api.post("/api/sessions/start_getsession/", { phoneNumber: phoneNumber })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Session", res);
                    setIsEnterOTP(false);
                } else alert("Failed to make session");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const submitOtp = (e) => {
        e.preventDefault();
        setIsEnterOTP(true);
        api.post("/api/sessions/receive_opt/", { otp: otp })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Otp", res);
                    alert("Nhập otp thành công");
                } else alert("Failed to make session");
                getNotes();
            })
            .catch((err) => alert(err));
    }

    return (
        <div>
            <h2>Get session</h2>
            <form onSubmit={getSession}>
                <label htmlFor="title">Nhập số điện thoại (VD:+84 359468511) :</label>
                <br />
                <input
                    type="text"
                    id="phonenum"
                    name="phonenum"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
                {!isEnterOTP ? (
                <input type="submit" value="Submit"></input>) : (<></>)}
            </form>

            {isEnterOTP ? (
                <>
                    <form onSubmit={submitOtp}>
                        <label htmlFor="title">Nhập OTP được gửi về tele {phoneNumber} :</label>
                        <br />
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            required
                            onChange={(e) => setOtp(e.target.value)}
                            value={otp}
                        />
                        <input type="submit" value="Submit"></input>
                    </form>
                </>
            ) : (<></>)}
        </div>
    );
}

export default Home;