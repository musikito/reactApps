import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa"
import moment from "moment"

function PostList() {
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState()
    const [dislikes, setDislikes] = useState()
  
    useEffect(() => {
      const fetchAllPosts = async () => {
        try {
          const res = await axios.get("http://localhost:3000/api/posts/all")
          console.log(res.data)
          setPosts(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      fetchAllPosts()
    }, [])
  
    const handleLike = () => {
      alert("Post has been Liked")
    }
  
    const handleDislike = () => {
      alert("Post has been Disliked")
    }
  
    return (
      <>
        <div className="container">
          <br />
  
          {/* Post Bar */}
          <form>
            <div className="form-group">
              {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                placeholder="What's on your mind?"
              ></textarea>
              <div id="post-button">
                <button type="button" className="btn btn-success">
                  + Add
                </button>
              </div>
            </div>
          </form>
          {/* End of Post Bar */}
  
          {/* Posts - All */}
          <div className="row">
            {posts.map((post) => (
              <div key={post.id} className="col-md-12 mb-4 mt-4">
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <Link to={`/users/${post.username}`}>{post.username}</Link>
                    </h6>
                    <p className="card-text">{post.content}</p>
                  </div>
                  <div className="post-footer">
                    <div className="post-footer-interactions">
                      <a href="#" className="card-link" onClick={handleLike}>
                        <FaRegThumbsUp />
                        {post.likes}
                      </a>
                      <a href="#" className="card-link" onClick={handleDislike}>
                        <FaRegThumbsDown />
                        {post.dislikes}
                      </a>
                    </div>
                    <div className="post-footer-timestamp">
                      {moment(post.created_at).format("YYYY/MM/DD HH:mm:ss")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* End of Posts All */}
        </div>
      </>
    )
  }

export default PostList