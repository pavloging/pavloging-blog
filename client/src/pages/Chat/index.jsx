import { Button, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Chat.module.scss";

export const Chat = () => {
  const fullName = useSelector((state) => state.auth.data);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(fullName?.fullName || "user");
  }, [fullName]);

  function connect() {
    socket.current = new WebSocket("ws://localhost:8080");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <>
        {localStorage.getItem("token") ? (
          <div className="center">
            <div className={styles.form}>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Введите ваше имя"
              />
              <Button onClick={connect}>Войти</Button>
            </div>
          </div>
        ) : (
          <h1 className={styles.title}>
            <Link to="/login">Войдите в систему</Link> чтобы воспользоваться
            чатом
          </h1>
        )}
      </>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Чат</h1>
      {localStorage.getItem("token") ? (
        <div className="center">
          <div>
            <div className={styles.form}>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Введите сообщение"
              />
              <Button onClick={sendMessage}>Отправить</Button>
            </div>
            <div className="messages">
              {messages.map((mess) => (
                <div key={mess.id}>
                  {mess.event === "connection" ? (
                    <div className="connection_message">
                      Пользователь {mess.username} подключился
                    </div>
                  ) : (
                    <div className="message">
                      {mess.username}. {mess.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>Не авторизованны</h1>
      )}
    </>
  );
};
