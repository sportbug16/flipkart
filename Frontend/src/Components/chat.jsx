
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./chat.css";
const Chat = () => {
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [outfitImages, setOutfitImages] = useState({});
    const token = localStorage.getItem("token");


    const chat = async (e, message) => {
        e.preventDefault();

        if (!message) return;
        setIsGenerating(true);

        let msgs = chats;
        msgs.push({ role: "user", content: message });
        setChats(msgs);

        setMessage("");

        fetch("http://localhost:5000/kp/chats/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                chats,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                msgs.push(data.output);
                setChats(msgs);
                // setOutfitImages(data.images)
                setIsGenerating(false);
                scrollTo(0, 1e10);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <main>
            <h1> AI outfit generator</h1>

            <section>
                {chats && chats.length
                    ? chats.map((chat, index) => (
                //         <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                // <span>
                //   <b>{chat.role.toUpperCase()}</b>
                // </span>
                //             <span>:</span>
                //             <span><ReactMarkdown>{chat.content}</ReactMarkdown></span>
                //         </p>
                        <div key={index} className={chat.role}>
                            <p className={chat.role === "user" ? "user_msg" : ""}>
                                <span><b>{chat.role.toUpperCase()}</b></span>
                                <span>: </span>
                                <span><ReactMarkdown>{chat.content}</ReactMarkdown></span>
                            </p>
                            {/* Display outfit images for bot messages */}
                            {/*{chat.role === "assistant" && (*/}
                                {/* <div className="outfit-images">
                                    {Object.entries(outfitImages).map(([component, imageUrl], imgIndex) => (
                                        <div key={imgIndex} className="outfit-image">
                                            <h5>{component}</h5>
                                            {typeof imageUrl === 'string' && <img src={imageUrl} alt={`${component} outfit`} />}
                                        </div>
                                    ))}
                                </div> */}
                            {/*)}*/}
                        </div>
                            ))
                    : ""}
            </section>

            <div className={isGenerating ? "" : "hide"}>
                <p>
                    <i>{isGenerating ? "Generating" : ""}</i>
                </p>
            </div>

            <form action="" onSubmit={(e) => chat(e, message)}>
                <input
                    type="text"
                    name="message"
                    value={message}
                    placeholder="Type what type of an outfit you need..."
                    onChange={(e) => setMessage(e.target.value)}
                />
            </form>
        </main>
    );
}
export default Chat;