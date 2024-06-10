import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface TweetFormProps {
  addTweet: (userId: number, username: string, content: string, date: string) => void;
  userId: number;
  username: string;
}

const TweetForm: React.FC<TweetFormProps> = ({ addTweet, userId, username }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/tweets', {
        userId,
        content,
      });
      addTweet(userId, username, response.data.content, response.data.date);
      setContent('');
      setError('');
    } catch (error) {
      setError('Failed to post tweet');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Label>Tweet</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button variant="primary" type="submit">
        Tweet
      </Button>
    </Form>
  );
};

export default TweetForm;
