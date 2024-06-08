// import { useState } from "react"
import Post from "./Post";

interface PostsProps {
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    likeCount: number;
    dislikeCount: number;
}

// Post data from the Post component

const posts: PostsProps[] = [
    // Add your sample tweet data here
    {
        username: 'Alice',
       avatarUrl: 'https://placeimg.com/64/64/people',
        content: 'This is a sample tweet from Alice.',
        timestamp: '2024-06-05T11:30:00Z',
        likeCount: 0,
        dislikeCount: 0,
    },
    // Add more sample tweets
];


const PostsList = () =>{
    return (
        <div>
            {posts.map((post) => (
                <Post id={""} key={post.username || post.username} {...post} /> // Use username as a fallback if no id provided
            ))}
        </div>
    );
};

export default PostsList