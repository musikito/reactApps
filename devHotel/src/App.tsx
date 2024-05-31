import { useState } from "react";
import Room from "./components/Room";

function App() {
  // const [roomType, setRoomType] = useState("")
  // Use useState to select a room
  const [selectedRoom, setSelectedRoom] = useState(null);
  // State for num of nights
  const [numNights, setNumNights] = useState(0);
  // Types of rooms we have
  const rooms = [
    {
      type: "Single",
      price: 50,
      beds: 1,
      baths: 1,
      description: "A single room with a king size bed and a bathroom.",
    },
    {
      type: "Double",
      price: 75,
      beds: 2,
      baths: 1,
      description: "A double room with a king size bed and a bathroom.",
    },
    {
      type: "Suite",
      price: 100,
      beds: 3,
      baths: 1,
      description: "A triple room with a king size bed and a bathroom.",
    },
  ]; // End of rooms array
  const selectARoom = (room) => {
    console.log("You selected room: ", room);

    setSelectedRoom(room);
  };

  return (
    <div className="hotel">
      <h1>DevAccelerator Hotel</h1>
      <h2>Rooms to rent</h2>
      <div className="rooms">
        {/* Loop through each room and display it */}
        {rooms.map((room) => (
          <Room key={room.type} roomType={room.type} price={room.price} onClick = {() => console.log("test")
          }/>
        ))}
      </div>
    </div>
  );
}

export default App;
