import { Link } from "react-router-dom"
import { useState } from "react"
import "./Header.css"
import { useChatContext } from "../../context/ChatContext"
import CreateRoomPopup from "../CreateRoomPopup/CreateRoomPopup"
import { FiUser, FiMessageSquare } from "react-icons/fi"

function Header() {
  const { username } = useChatContext()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

    return (
      <div className="header">
        <h1>Chatt</h1>
        {isPopupOpen && <CreateRoomPopup onClose={handleClosePopup}/>}
        <div className="text-sm flex gap-2">
        <Link className="flex items-center gap-1" to="#" onClick={handleOpenPopup}><FiMessageSquare /> Create Room</Link>
        <Link className="flex items-center gap-1" to="#"><FiUser /> {username}</Link>
        </div>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/lobby">Lobby</Link></li>
          <li><Link to="/create_room">Create Room</Link></li>
          <li><Link to="/all_rooms">All Rooms</Link></li>
        </ul> */}
      </div>
    )
  }
  
  export default Header