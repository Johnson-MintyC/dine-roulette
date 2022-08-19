const Home = () => {
    return (
        <div>
            <form action="/home" method="post">
                <label>Location: </label>
                <select name="location" id="location-selector">
                    <option value="test">test</option>
                </select>
                <br></br>
                <label>Criteria: </label>
                <select name="query" id="query-selector">
                    <option value="search">search</option>
                </select>
                <br></br>
                <label>Within: </label>
                <input type="number" /><p>km</p>
            </form>
        </div>
    )
}

export default Home