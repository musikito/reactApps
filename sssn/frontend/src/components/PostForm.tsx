import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Interface for the Form component
interface PostFormProps {
    addPost: (username: string, content: string) => void;
}

const PostForm = ({ addPost }: PostFormProps) => {
    const [username, setUsername] = useState('');
    const [content, setContent] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addPost(username, content);
        setUsername("");
        setContent("");
    }; // End of handleSubmit


    return (
        <Form onSubmit={handleSubmit}>
            {/* Username group */}
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            {/* Content group */}
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                />
            </Form.Group>
            {/* Submit button  */}
            <Button variant="primary" type="submit">
                Post
            </Button>
        </Form>

    );
};

export default PostForm;