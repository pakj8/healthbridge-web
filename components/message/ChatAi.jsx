import React, { useState } from "react";
import { FiSend } from "react-icons/fi"; // Send button icon
import { BiExpand, BiCollapse } from "react-icons/bi"; // Expand/collapse icons
import insert from "../../public/assets/insert.png";
import Doctor from "../../public/assets/doctor (1).png";
import Image from "next/image";

function Chatai() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      className={`fixed bottom-5 w-[350px]  ${
        isFullScreen ? "h-[90vh]" : " h-16"
      } bg-white shadow-xl rounded-2xl transition-all duration-300 overflow-hidden`}
    >
      {/* Header */}
      <div className="h-full">
        <div
          className={`flex items-center justify-between px-4 py-3 ${
            isFullScreen ? "bg-blue-600" : "bg-blue-500"
          } text-white cursor-pointer`}
          onClick={toggleFullScreen}
        >
          <div className="flex  items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src={Doctor}
                alt="Consultation"
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <h2 className="text-base font-semibold">Consultation</h2>
          </div>
          <button
            className="text-white text-lg"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullScreen(false);
            }}
          >
            {isFullScreen ? <BiCollapse /> : <BiExpand />}
          </button>
        </div>

        {isFullScreen && (
          <div className="flex flex-col h-full">
            <div className="p-4 bg-gray-50">
              {messages?.length > 0 ? (
                messages?.map((msg, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-xl max-w-sm ${
                        index % 2 === 0
                          ? "bg-blue-100 self-start"
                          : "bg-green-100 self-end"
                      } shadow-md`}
                    >
                      <p>{msg}</p>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center">
                  No messages yet. Start the consultation!
                </p>
              )}
            </div>
            <div className="absolute bottom-5 w-full">
              {" "}
              <div className="flex items-center border-t mb-auto ">
                <button className="text-gray-400 hover:text-gray-600">
                  <Image src={insert} alt="Insert" width={24} height={24} />
                </button>

                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  className="flex-1 resize-none border rounded-lg mx-3 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Type a message..."
                  rows={1}
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Content */}
        {/* {isFullScreen && (
          <div className="flex flex-col">
            <div className="p-4 bg-gray-50">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl max-w-sm ${
                      index % 2 === 0
                        ? "bg-blue-100 self-start"
                        : "bg-green-100 self-end"
                    } shadow-md`}
                  >
                    <p>{msg}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No messages yet. Start the consultation!
                </p>
              )}
            </div>

            <div className=" flex  flex-col bg-white px-4 py-3 h-full">
              <div className="flex items-center border-t mb-auto ">
                <button className="text-gray-400 hover:text-gray-600">
                  <Image src={insert} alt="Insert" width={24} height={24} />
                </button>

                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  className="flex-1 resize-none border rounded-lg mx-3 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Type a message..."
                  rows={1}
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Chatai;
