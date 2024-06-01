import { useState } from "react";
import Room from "./components/Room"
import RoomList from "./components/RoomList";

// Interface for props for a room
interface Room {
  id: number;
  type: string;
  price: number;
//   onSelect: () => void;
}

const App = () => {
  // useState hook to store the selected room
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  // Using useState hook to store the number of days
  // We setting the default value to 1, but this can be use to set-up the number of days
  // with a dropdown list
  const [numDays, setNumDays] = useState(1);

  // rooms data, this should be coming from an API call
  // Actually, this needs to have it's own file/component
  const rooms: Room[] = [
    { id: 1, type: "twin", price: 100 },
    { id: 2, type: "double", price: 150 },
    { id: 3, type: "single", price: 100 },
  ];

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return selectedRoom ? selectedRoom.price * numDays : 0;
  }; // End of calculateTotalPrice function

  return (
    <div>
      <h1>DevAccelerator Hotel</h1>
      <RoomList rooms={rooms} onSelectRoom={setSelectedRoom} />
      {selectedRoom && (
        <div>
          <h2>Selected Room: {selectedRoom.type}</h2>
          <h3>Price: ${selectedRoom.price}</h3>
          <h3>Number of Days: {numDays}</h3>
          <h3>Total Price: ${calculateTotalPrice()}</h3>
        </div>
      )}
     
    </div>
  );
};


export default App