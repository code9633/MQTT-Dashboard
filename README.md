

# MQTT Dashboard

![MQTT Dashboard Demo](demo.gif)

MQTT Dashboard is a web application built with React that allows users to create and manage widgets associated with MQTT topics. It provides a simple interface to subscribe to MQTT topics and display real-time messages received from those topics.

## Features

- **Dynamic Widget Management**: Add or remove widgets dynamically to customize your dashboard.
- **MQTT Integration**: Connect to an MQTT broker and subscribe to topics for each widget.
- **Real-time Updates**: Display messages received from MQTT topics in real-time within the corresponding widget.
- **Persistence**: Widget count and MQTT topics are persisted across page reloads using the browser's local storage.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mqtt-dashboard.git
   ```

2. Install dependencies:
   ```bash
   cd mqtt-dashboard
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser to view the MQTT Dashboard.

## Usage

- **Adding Widgets**: Click the "Add Widget" button to add a new widget. Each widget can be associated with a unique MQTT topic.
- **Removing Widgets**: Click the delete button on a widget to remove it from the dashboard.
- **Changing MQTT Topics**: Enter a topic in the input field next to each widget title to specify the MQTT topic for that widget.

## Dependencies

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [MQTT.js](https://github.com/mqttjs/MQTT.js): A client library for the MQTT protocol.
- [React Icons](https://react-icons.github.io/react-icons/): A library providing popular icon packs as React components.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
```

Remember to replace `https://github.com/yourusername/mqtt-dashboard.git` with the actual URL of your GitHub repository. Also, make sure to include the `demo.gif` file in the same directory as the README.md file and update the image link accordingly.

Let me know if you need any further assistance!