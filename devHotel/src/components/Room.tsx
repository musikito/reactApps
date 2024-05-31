

const Room = ({ roomType, price}) =>{ // beds, baths, description, image }) => {
  // const [roomType, setRoomType] = useState("")
  // const [price, setPrice] = useState("")
  // const [beds, setBeds] = useState("")
  // const [baths, setBaths] = useState("")
  // const [description, setDescription] = useState("")
  // const [image, setImage] = useState("")
  // Display room information here
  return (
    <div className="room">
        <h2>{roomType}</h2>
        <p>Price Per Night: {price}</p>
    
    </div>
  );
}

export default Room