import SendMessageBtn from "../SendMessageBtn/SendMessageBtn";
import { useChatContext } from "../../context/ChatContext";
import { useState } from "react";

function MessageInput() {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, username, currentRoom, typingUsers, socket } =
    useChatContext();
  const uniqueTypingUsers = Array.from(new Set(typingUsers[currentRoom] || []));

  const fetchGif = async (keyword) => {
    try {
      const response = await fetch("http://localhost:3000/gif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      sendMessage(data.gifUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value !== "") {
      socket.emit("typing_start", { room: currentRoom, username });
    } else {
      socket.emit("typing_end", { room: currentRoom, username });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.startsWith("/gif")) {
      const commandParts = newMessage.split(" ");
    let keyword = "random";
    if (commandParts.length >= 2) {
      keyword = commandParts.slice(1).join(" ");
    }
    fetchGif(keyword);
    setNewMessage("");
    socket.emit("typing_end", { room: currentRoom, username });
    } else if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
      socket.emit("typing_end", { room: currentRoom, username });
    }
  };

  // a function that listens to an event and sends the message evrytime it is called wich is when the client presses enter.
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
      socket.emit("typing_end", { room: currentRoom, username })
    }
  };

  return (
    <div className="flex flex-col border-2 border-solid sticky bottom-0 right-0 left-0 z-100 mt-2">
      <div>
        {uniqueTypingUsers.length > 0 && (
          <div className="text-gray-400 text-sm">
            {uniqueTypingUsers.join(", ")}{" "}
            {uniqueTypingUsers.length === 1 ? "is" : "are"} typing...
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <input
          className="p-2 text-sm flex-1"
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={handleSendMessage}
          className="bg-blue-400 text-white p-2 text-sm "
        >
          {" "}
          Send{" "}
        </button>
        {/* <SendMessageBtn /> */}
      </div>
    </div>
  );
}

export default MessageInput;
