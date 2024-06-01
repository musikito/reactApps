import Room from "./Room";

// Interface for props
interface RoomListProps {
    rooms: { id: number; type: string; price: number }[];
    onSelectRoom: (room: {id: number, type: string, price: number}) => void;
  }

// RoomList component
const RoomList = ({ rooms, onSelectRoom }: RoomListProps) => {
  return (
    <div>
        <h2>Available Rooms</h2>
      {rooms.map((room) => (
        <Room key={room.id} room={room} onSelect={()=>onSelectRoom(room)} />
      ))} 
    </div>
  );
};

export default RoomList
