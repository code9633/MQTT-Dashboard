import React from 'react'
import { FaPlus} from "react-icons/fa";

export default function ConnectionStatus({connectionStatus, handleButtonClick}) {
  return (
    <div className="connectionTitle">
        <button className="addBtn" onClick={handleButtonClick}>
          <FaPlus />
        </button>
        <div className="connectionStatus">
          <p>Connection Status : </p>
          <p id="status">{connectionStatus}</p>
        </div>
      </div>
  )
}
