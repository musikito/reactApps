import './Room.css'; // Importing the CSS file

interface RoomProps {
  room: { id: number; type: string; price: number; image: string };
  onSelect: () => void;
}

const Room = ({room, onSelect}: RoomProps) => {
    return (
        <div>
            <h2>Room:{room.type} </h2>
            <img src={room.image} alt={`${room.type} room`} className="room-image" /> {/* Applying the CSS class */}
            <h3>Price: ${room.price}</h3>
            <button onClick={onSelect}>Select</button>
        </div>
    );
};


export default Room;