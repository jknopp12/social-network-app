import Navigation from "../navigation";

function Search() {

    return (
        <div className="d-flex">
            <Navigation />
            <div style={{ flexGrow: 1, padding:"20px" }}>
                <h1>Search</h1> <hr />
                <h5> Search Page</h5>
            </div>
        </div>
    );
}
export default Search;