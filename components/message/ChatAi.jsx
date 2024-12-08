import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BiExpand, BiCollapse } from "react-icons/bi";
import Image from "next/image";
import insert from "../../public/assets/insert.png";
import Doctor from "../../public/assets/doctor (1).png";
import {
  useFollowUpQuestions,
  useGetAdvise,
} from "../../graphql/chatgpt/datasource";

function Chatai({ setIsOpen }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [followUpQuestions, setFollowUpQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState("initial");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [vitals, setVitals] = useState("");
  const [history, setHistory] = useState("");

  const {
    data: followUpData,
    fetchFollowUpQuestions,
    loading: questionLoading,
    error: followUpError,
  } = useFollowUpQuestions();

  const [getAdviseHandler, { data, loading, error, refetch }] = useGetAdvise();

  const handleFollowUpQuestions = () => {
    if (step === "initial") {
      setMessages([...messages, { text: message, type: "user" }]);

      if (
        patientName &&
        parseInt(age) > 0 &&
        gender &&
        symptoms &&
        vitals &&
        history
      ) {
        fetchFollowUpQuestions({
          variables: {
            input: {
              name: patientName,
              age: parseInt(age),
              gender: gender,
              symptoms: symptoms,
              vitals: vitals,
              history: history,
            },
          },
          onCompleted: (data) => {
            const questions = data.getFollowUpQuestions.map((q) => ({
              text: q,
              type: "bot",
            }));
            setMessages((prevMessages) => [...prevMessages, ...questions]);
            setFollowUpQuestions(data.getFollowUpQuestions);
            setStep("answering");
          },
        });
        setMessage("");
      }
    }
  };

  // const handleAdvise = async () => {
  //   try {
  //     if (step === "answering") {
  //       // Add the user's message to the chat
  //       const updatedAnswers = [...answers, message];
  //       setAnswers(updatedAnswers);
  //       setMessages([...messages, { text: message, type: "user" }]);
  //       setMessage("");

  //       if (
  //         patientName &&
  //         parseInt(age) > 0 &&
  //         gender &&
  //         vitals &&
  //         history &&
  //         message &&
  //         followUpData?.getFollowUpQuestions &&
  //         updatedAnswers
  //       ) {
  //         const input = {
  //           patientDetails: {
  //             name: patientName,
  //             age: parseInt(age),
  //             gender: gender,
  //             vitals: vitals,
  //             history: history,
  //             symptoms: message,
  //           },
  //           questions: followUpData?.getFollowUpQuestions,
  //           answers: updatedAnswers,
  //         };

  //         const data = await getAdviseHandler(input);

  //         // Add the advice to the chat as a bot message
  //         if (data?.getAdvice) {
  //           setMessages((prev) => [
  //             ...prev,
  //             { text: data.getAdvice, type: "bot" },
  //           ]);
  //           setStep("completed");
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching advice:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       { text: "Something went wrong. Please try again.", type: "bot" },
  //     ]);
  //   }
  // };

  const handleAdvise = async () => {
    try {
      if (step === "answering") {
        const updatedAnswers = [...answers, message];
        setAnswers(updatedAnswers);
        setMessages([...messages, { text: message, type: "user" }]);
        setMessage("");

        if (
          patientName &&
          parseInt(age) > 0 &&
          gender &&
          vitals &&
          history &&
          message &&
          followUpData?.getFollowUpQuestions &&
          updatedAnswers
        ) {
          // const combinedAnswers = updatedAnswers.join("; ");

          const input = {
            patientDetails: {
              name: patientName,
              age: parseInt(age),
              gender: gender,
              vitals: vitals,
              history: history,
              symptoms: message,
            },
            questions: followUpData?.getFollowUpQuestions,
            answers: message,
          };

          const data = await getAdviseHandler(input);

          // console.log(data);
          if (data?.data?.getAdvice) {
            setMessages((prev) => [
              ...prev,
              { text: data?.data?.getAdvice, type: "bot" },
            ]);
            setStep("completed");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (isFullScreen) {
      setIsOpen(isFullScreen);
    }
  }, [isFullScreen, setIsOpen]);

  const renderMessageText = (text) => {
    const boldTextRegex = /\*\*(.*?)\*\*/g;

    const formattedText = text.replace(boldTextRegex, "<strong>$1</strong>");

    return { __html: formattedText };
  };

  return (
    <div
      className={`fixed bottom-5 w-[350px] ${
        isFullScreen ? "h-[90vh]" : "h-16"
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
          <div className="flex items-center gap-3">
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
            onClick={(e) => e.stopPropagation()}
          >
            {isFullScreen ? <BiCollapse /> : <BiExpand />}
          </button>
        </div>

        {isFullScreen && (
          <div className="flex flex-col pb-24  h-full">
            <div className="p-4 bg-gray-50 flex-1 overflow-y-auto">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl max-w-sm ${
                      msg.type === "user"
                        ? "bg-blue-100 self-end"
                        : "bg-green-100 self-start"
                    } shadow-md mb-2`}
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {/* <p>{renderMessageText(msg.text)}</p> */}
                    <p dangerouslySetInnerHTML={renderMessageText(msg.text)} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="">
                      Enter your full name
                    </label>
                    <input
                      className="p-2 border rounded-md outline-none"
                      type="text"
                      name="name"
                      id="name"
                      value={patientName}
                      onChange={(e) => {
                        setPatientName(e?.target?.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="age" className="">
                      Enter your age
                    </label>
                    <input
                      className="p-2 border rounded-md outline-none"
                      type="text"
                      name="age"
                      id="age"
                      value={age?.toString()}
                      onChange={(e) => {
                        setAge(e?.target?.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="gender" className="">
                      Enter your gender
                    </label>
                    <input
                      className="p-2 border rounded-md outline-none"
                      type="text"
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={(e) => {
                        setGender(e?.target?.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="symptoms" className="">
                      Enter your symptoms
                    </label>
                    <input
                      className="p-2 border rounded-md outline-none"
                      type="text"
                      name="symptoms"
                      id="symptoms"
                      value={symptoms}
                      onChange={(e) => {
                        setSymptoms(e?.target?.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="vitals" className="">
                      Enter your current vitals
                    </label>
                    <input
                      className="p-2 border rounded-md outline-none"
                      type="text"
                      name="vitals"
                      id="vitals"
                      value={vitals}
                      onChange={(e) => {
                        setVitals(e?.target?.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="history" className="">
                      Enter your medical history
                    </label>
                    <input
                      className="p-2 border rounded-md outline-none"
                      type="text"
                      name="history"
                      id="history"
                      value={history}
                      onChange={(e) => {
                        setHistory(e?.target?.value);
                      }}
                    />
                  </div>

                  <button
                    onClick={handleFollowUpQuestions}
                    type="submit"
                    className="w-full py-2 bg-blue-400 rounded-lg text-white font-semibold
                  "
                  >
                    Submit
                  </button>
                </div>
              )}
              {(questionLoading || error) && (
                <p className="text-gray-500 text-center">Loading...</p>
              )}
              {(followUpError || error) && (
                <p className="text-red-500 text-center">
                  Error: {followUpError ? followUpError.message : error.message}
                </p>
              )}
            </div>

            <div className="absolute bottom-0 w-full">
              <div className="flex items-center border-t mb-auto px-4 py-2 bg-white">
                <button className="text-gray-400 hover:text-gray-600">
                  <Image src={insert} alt="Insert" width={24} height={24} />
                </button>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleAdvise()
                  }
                  className="flex-1 resize-none border rounded-lg mx-3 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Type a message..."
                  rows={1}
                />

                <button
                  onClick={handleAdvise}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatai;
