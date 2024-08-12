import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isEnterOTP, setIsEnterOTP] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

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
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>

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