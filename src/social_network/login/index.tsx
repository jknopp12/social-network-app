import Navigation from "../navigation";
import Signin from "./signin";
import Signup from "./signup";

function Login() {
    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding: "20px"}}>
                <h1 className="mb-4">Log In</h1>
                <hr />
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h4>Returning user? Enter your credentials:</h4>
                        <Signin />
                    </div>
                    <div className="col-md-6 mb-4">
                        <h4>New? Enter credentials to create an account:</h4>
                        <Signup />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
