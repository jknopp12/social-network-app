import Navigation from "../navigation";
import { Link } from "react-router-dom";

function Home() {
    const posts = [
        {
            _id: 1,
            image: "post1.jpg",
            title: "Post Title 1",
            content: "This is the content for Post 1. It can be a long text to see how it wraps inside the card."
        },
        {
            _id: 2,
            image: "post2.jpg",
            title: "Post Title 2",
            content: "This is the content for Post 2. It can be a long text to see how it wraps inside the card."
        },

    ];

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <h1 className="mb-4">Home</h1>
                <hr />
                <h3>Trending Posts</h3>
                <div className="row mt-4">
                    {posts.map((post) => (
                        <div key={post._id} className="col-md-6 mb-4">
                            <div className="card">
                                <img src={`/images/${post.image}`} className="card-img-top" alt="Post" />
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    {/* // add post id */}
                                    <Link to="/Recipe" className="btn btn-primary">
                                        View Recipe
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
