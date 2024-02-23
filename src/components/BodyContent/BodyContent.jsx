import React, { useState, useEffect } from "react";
import "./BodyContent.css";
import mqtt from "mqtt";
import { FaRegTrashAlt } from "react-icons/fa";
import ConnectionStatus from "./ConnectionStatus";

export default function BodyContent() {
  // State variables using useState hook
  const [connectionStatus, setConnectionStatus] = useState(
    "Waiting for connection..."
  );
  const [widgetCount, setWidgetCount] = useState(
    parseInt(localStorage.getItem("widgetCount")) || 0
  );
  const [widgetTopics, setWidgetTopics] = useState(
    JSON.parse(localStorage.getItem("widgetTopics")) || []
  );

  const [mqttClient, setMqttClient] = useState(null);
  const [messages, setMessages] = useState(
    Array.from({ length: widgetCount }, () => "")
  );

  useEffect(() => {
    const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      setConnectionStatus("Connected");
      setMqttClient(client);
    });

    client.on("error", (error) => {
      console.log("Connection Failed", error);
      setConnectionStatus("Connection Failed");
    });

    return () => {
      client.end(); // cleanup the function to end the mqtt connection
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("widgetCount", widgetCount);
    localStorage.setItem("widgetTopics", JSON.stringify(widgetTopics));
  }, [widgetCount, widgetTopics]);

  const handleButtonClick = () => {
    setWidgetCount(widgetCount + 1);
    setWidgetTopics([...widgetTopics, `widget${widgetCount + 1}`]);
  };

  const handleDeleteWidget = (index) => {
    setWidgetCount(widgetCount - 1);
    setWidgetTopics(widgetTopics.filter((_, i) => i !== index));
  };

  const handleTopicChange = (index, topic) => {
    const newWidgetTopics = [...widgetTopics];
    newWidgetTopics[index] = topic;
    setWidgetTopics(newWidgetTopics);
  };

  useEffect(() => {
    if (mqttClient) {
      widgetTopics.forEach((topic, index) => {
        mqttClient.subscribe(topic);
        mqttClient.on("message", (mqttTopic,data) => {
          if (mqttTopic === topic) {
            const newMessages = [...messages]
            newMessages[index] = data.toString()
            setMessages(newMessages);
            console.log(
              `Received message for widget ${index + 1}: ${data.toString()}`
            );
            // Handle the received message for the corresponding widget
          }
        });
      });
    }
  }, [mqttClient, widgetTopics]);

  return (
    <div className="bodyContainer">
      <ConnectionStatus
        connectionStatus={connectionStatus}
        handleButtonClick={handleButtonClick}
      />

      <div className="widgetCards">
        {[...Array(widgetCount)].map((_, index) => (
          <div className="widget" key={index}>
            <div className="widgetTitle">
              <h3>
                Topic :
                <input
                  type="text"
                  value={widgetTopics[index] || ""}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                />
              </h3>
              <button
                className="deleteBtn"
                onClick={() => handleDeleteWidget(index)}
              >
                <FaRegTrashAlt className="deleteBtnIcon" />
              </button>
            </div>
            <div className="widgetBody">
              <p className="messageBody">{messages[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
