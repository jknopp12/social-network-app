import { CiBowlNoodles } from "react-icons/ci";
import { Link } from "react-router-dom";
import Navigation from "../navigation";


export default function Anon() {
    return (
    <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: '20px' }}>
                <Link to="/Login" className="btn btn-primary btn-logout">
                    Sign Up
                </Link>
                <h1 className="mb-4">Profile</h1>
                <hr />
                <h2>Welcome!</h2>
                <p className="mb-4">If you want to join all of our amazing users, click the sign up button!
                <br/> Click on their usernames below to view their public profiles and recipe posts:</p>

                <hr />
                <Link to="/Profile/Post" className="btn btn-primary btn-logout">
                    Create a New Post
                </Link>
                <h2 className="mb-3"> Popular Recipe Posts </h2>
                <p className="mb-4">View all of your posted recipes here! <br />
                    Click on a recipe card to view more details:</p>
                {/* <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="col-md-4 mb-4">
                            <div className="card">
                                <Link to={`/recipe/${recipe._id}`} style={{ textDecoration: 'none' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.name}</h5>
                                        <p className="card-text">{recipe.description}</p>
                                        <CiBowlNoodles className="card-icon text-right position-absolute bottom-0 end-0" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    )
}