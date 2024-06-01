
interface RoomProps {
  room: { id: number; type: string; price: number };
  onSelect: () => void;
}

const Room = ({room, onSelect}: RoomProps) => {
    return (
        <div>
            <h2>Room:{room.type} </h2>
            <h3>Price: ${room.price}</h3>
            <button onClick={onSelect}>Select</button>
        </div>
    );
};


export default Room;