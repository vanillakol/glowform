import express from 'express' 
import cors from 'cors'
import fetch from 'node-fetch'
const app = express();

app.use(cors());



app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});




// Define the route to handle /movies/{imdb}
// Define the route to handle /movies/{imdb}
app.get('/movies/:imdb', async (req, res) => {
    const imdbId = req.params.imdb;

    const url = `https://imdb236.p.rapidapi.com/imdb/${imdbId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c184b7c08dmshcb3d53a5367e794p14b044jsna1831453c2e6',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const title = result.primaryTitle;
        const startYear = result.startYear;
        const description = result.description;
        const genres = result.genres || [];
        const directors = result.directors || [];
        const cast = result.cast || [];
        const rating = result.averageRating || 'N/A';
        const votes = result.numVotes || 'N/A';
        const contentRating = result.contentRating || 'Not Rated';

        // Send the response
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title}</title>
                <link rel="icon" type="image/x-icon" href="https://th.bing.com/th/id/R.08c4a010af67c6d824b33fa5d38dd31f?rik=OxoA0JC1W%2bk%2fkA&pid=ImgRaw&r=0">
                <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet">
                <style>

                @font-face {
                    font-family: 'Wonderly';
                    src: url('/Wonderly.otf') format('opentype');
                }
                     :root {
                        --bg-color: #121212;
                        --card-bg: #1E1E1E;
                        --accent-color: #8B5CF6;
                        --accent-hover: #7C3AED;
                        --text-color: #FFFFFF;
                        --text-secondary: rgba(255, 255, 255, 0.7);
                        --shadow: rgba(0, 0, 0, 0.3);
                        --nav-bg: rgba(30, 30, 30, 0.95);
                    }
    
                    body {
                        font-family: "Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace;
                        margin: 0;
                        padding: 0;
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    }

                    .navbar {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 90%;
                    max-width: 1200px;
                    background: var(--nav-bg);
                    border-radius: 5px; /* Changed to a smaller value for subtle rounding */
                    padding: 15px 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 2px 10px var(--shadow); /* Simplified shadow for a clean look */
                    border: 1px solid var(--accent-color); /* Subtle border */
                    z-index: 1000;
}


                    .logo {
                        font-size: 24px;
                        font-weight: bold;
                        color: var(--text-color);
                        text-decoration: none;
                        font-family: Wonderly;
                    }

                    .logo span {
                        color: var(--accent-color);
                    }

                    .search-bar-container {
                        display: flex;
                        align-items: center;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 25px;
                        padding: 5px;
                        width: 40%;
                        
                    }

                    .search-bar {
                        background: transparent;
                        border: none;
                        color: var(--text-color);
                        width: 100%;
                        padding: 8px 15px;
                        font-size: 16px;
                        outline: none;
                    }

                    .search-bar::placeholder {
                        color: rgba(255, 255, 255, 0.7);
                    }

                    .search-icon {
                        background: var(--accent-color);
                        width: 95px;
                        height: 35px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                        .navbar-container {
                        margin-bottom: 20px;
                        }

                    .search-icon:hover {
                        background: var(--accent-hover);
                    }
    
                    header {
                        background-color: var(--card-bg);
                        color: var(--text-color);
                        padding: 1.5rem 2rem;
                        border-bottom: 2px solid var(--accent-color);
                    }
    
                    .container {
                        display: grid;
                        grid-template-columns: 70% 30%;
                        gap: 2rem;
                        max-width: 1800px;
                        margin: 0 auto;
                        padding: 2rem;
                        padding-top: 100px;
                    }
    
                    .video-section {
                        position: relative;
                    }
    
                   iframe {
    width: 100%;
    aspect-ratio: 16/9; /* Maintains the 16:9 ratio */
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 20px var(--shadow);
    max-width: 100%; /* Ensures it doesn’t exceed the container's width */
}

@media (max-width: 768px) {
    iframe {
        aspect-ratio: 16/9; /* Adjusts proportionally for smaller screens */
        border-radius: 5px; /* Slightly smaller radius on mobile */
    }
}

@media (max-width: 480px) {
    iframe {
        aspect-ratio: 4/3; /* Adjust ratio for smaller screens */
    }
}
    
                    .fullscreen-button {
                        background: var(--accent-color);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                    }
    
                    .video-info {
                        margin-top: 2rem;
                        padding: 2rem;
                        background: var(--card-bg);
                        border-radius: 8px;
                        box-shadow: 0 4px 20px var(--shadow);
                    }
    
                    .rating-container {
                        display: flex;
                        align-items: center;
                        gap: 2rem;
                        margin-bottom: 1.5rem;
                    }
    
                    .rating-box {
                        background: var(--accent-color);
                        padding: 1.2rem;
                        border-radius: 8px;
                        text-align: center;
                        min-width: 120px;
                    }
    
                    .rating-box h4 {
                        margin: 0;
                        font-size: 0.8rem;
                        color: var(--text-color);
                        opacity: 0.9;
                    }
    
                    .rating-box .value {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-top: 0.5rem;
                    }
    
                    .meta-info {
                        display: flex;
                        gap: 1rem;
                        flex-wrap: wrap;
                        margin-bottom: 1.5rem;
                    }
    
                    .scroll-container {
                        display: flex;
                        overflow-x: auto;
                        gap: 1rem;
                        padding: 1rem 0;
                        margin-bottom: 1.5rem;
                    }
    
                    .scroll-container::-webkit-scrollbar {
                        height: 8px;
                    }
    
                    .scroll-container::-webkit-scrollbar-track {
                        background: var(--bg-color);
                        border-radius: 4px;
                    }
    
                    .scroll-container::-webkit-scrollbar-thumb {
                        background: var(--accent-color);
                        border-radius: 4px;
                    }
    
                    .person-card {
                        background: var(--accent-color);
                        padding: 1rem;
                        border-radius: 8px;
                        margin-right: 1rem;
                        min-width: 200px;
                        transition: transform 0.2s;
                    }
    
                    .person-card:hover {
                        transform: translateY(-2px);
                    }
    
                    .person-card h4 {
                        margin: 0;
                        font-size: 1rem;
                        color: var(--text-color);
                    }
    
                    .person-card p {
                        margin: 0.5rem 0 0 0;
                        font-size: 0.9rem;
                        color: var(--text-color);
                        opacity: 0.9;
                    }
    
                    .genres-container {
                        display: flex;
                        gap: 0.8rem;
                        flex-wrap: wrap;
                        margin-bottom: 1rem;
                    }
    
                    .genre-tag {
                        background: var(--accent-color);
                        padding: 0.5rem 1rem;
                        border-radius: 4px;
                        font-size: 0.9rem;
                    }
    
                    .info-section {
                        background: var(--card-bg);
                        padding: 2rem;
                        border-radius: 8px;
                        box-shadow: 0 4px 20px var(--shadow);
                    }
    
                    select, button {
                        margin: 0.5rem 0;
                        padding: 0.8rem 1.2rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        background-color: var(--accent-color);
                        color: var(--text-color);
                        font-family: inherit;
                        transition: background-color 0.2s;
                    }
    
                    select:hover, button:hover {
                        background-color: var(--accent-hover);
                    }
    
                    select {
                        width: 100%;
                        margin-bottom: 1rem;
                    }
    
                    #episodeContainer {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 1rem;
                    }
    
                    @media (max-width: 1024px) {
                        .container {
                            grid-template-columns: 1fr;
                        }
                    }

                    a {
                        text-decoration: none;
                        color: white;
                    }
                </style>
                <script type='text/javascript' src='//ushermassacrecranny.com/cb/1b/20/cb1b2051c4112987c288797c233ef8d7.js'></script>
                <script type='text/javascript' src='//ushermassacrecranny.com/cb/1b/20/cb1b2051c4112987c288797c233ef8d7.js'></script>
            </head>
            <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-10YYZFKVGQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-10YYZFKVGQ');
</script>
            <body>
            <div class="navbar-container">
            <nav class="navbar">
                    <a href="https://yesmovies.lol/index.html" class="logo">Yes<span>Movies</span></a>
                    <div class="search-bar-container">
                        <input id="searchInput" type="text" class="search-bar" placeholder="Search movies & shows...">
                        <div class="search-icon" onclick="performSearch()">Search</div>
                    </div>
                </nav>
            </div>
                
                <div class="container">
                    <div>
                        <div class="video-section">
                            <iframe id="videoPlayer" src="https://vidsrc.net/embed/movie?imdb=${imdbId}" allowfullscreen></iframe>
                            <button class="fullscreen-button" onclick="document.getElementById('videoPlayer').requestFullscreen()">Fullscreen</button>
                        </div>
                        <div class="video-info">
                        
                            <div class="rating-container">
                                <div class="rating-box">
                                    <h4>IMDb RATING</h4>
                                    <div class="value">${rating}/10</div>
                                </div>
                                <div class="rating-box">
                                    <h4>VOTES</h4>
                                    <div class="value">${votes}</div>
                                </div>
                                <div class="rating-box">
                                    <h4>CONTENT RATING</h4>
                                    <div class="value">${contentRating}</div>
                                </div>
                            </div>
                            <h3>Genres</h3>
                            <div class="genres-container">
                                ${genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="info-section">
                        <h1>${title}</h1>
                        <h2>Year: ${startYear}</h2>
                        <h3>Description</h3>
                        <p>${description}</p>
                    </div>
                </div>

                 <script>
                    ${generateEpisodeButtonsScript}
                    updateEpisodes(1);

                    function performSearch() {
                        const query = document.getElementById('searchInput').value.trim();
                        if (query) {
                            window.location.href = '/search/' + encodeURIComponent(query);
                        }
                    }
                </script>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});
app.get('/shows/:imdb', async (req, res) => {
    const imdbId = req.params.imdb;

    const url = `https://imdb236.p.rapidapi.com/imdb/${imdbId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c184b7c08dmshcb3d53a5367e794p14b044jsna1831453c2e6',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const title = result.primaryTitle;
        const startYear = result.startYear;
        const description = result.description;
        const episodesArray = result.episodes;

        // Organize episodes by season
        const allShowData = {};
        for (const episode of episodesArray) {
            if (!allShowData[episode.seasonNumber]) {
                allShowData[episode.seasonNumber] = [];
            }
            allShowData[episode.seasonNumber].push(`Episode ${episode.episodeNumber}: ${episode.primaryTitle}`);
        }

        // Generate HTML for season dropdown
        const seasonDropdown = Object.keys(allShowData)
            .map(
                (season) =>
                    `<option value="${season}">Season ${season}</option>`
            )
            .join('');

        // Generate episode buttons dynamically
        const generateEpisodeButtonsScript = `
            function updateEpisodes(season) {
                const episodes = ${JSON.stringify(allShowData)};
                const episodeContainer = document.getElementById('episodeContainer');
                const iframe = document.getElementById('videoPlayer');
                episodeContainer.innerHTML = '';

                if (episodes[season]) {
                    episodes[season].forEach((episode, index) => {
                        const button = document.createElement('button');
                        button.textContent = episode;
                        button.onclick = () => {
                            iframe.src = 'https://vidsrc.net/embed/tv?imdb=${imdbId}&season=' + season + '&episode=' + (index + 1);
                        };
                        episodeContainer.appendChild(button);
                    });
                }
            }
        `;

        // Send the response
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="description" content="Watch ${title} - ${description}">
                <title>${title}</title>
                <link rel="icon" type="image/x-icon" href="https://th.bing.com/th/id/R.08c4a010af67c6d824b33fa5d38dd31f?rik=OxoA0JC1W%2bk%2fkA&pid=ImgRaw&r=0">
                <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet">
                <style>



                @font-face {
                    font-family: 'Wonderly';
                    src: url('/Wonderly.otf') format('opentype');
                }
                    :root {
                        --bg-color: #121212;
                        --card-bg: #1E1E1E;
                        --accent-color: #8B5CF6;
                        --accent-hover: #7C3AED;
                        --text-color: #FFFFFF;
                        --shadow: rgba(0, 0, 0, 0.3);
                        --nav-bg: rgba(30, 30, 30, 0.95);
                    }

                    body {
                        font-family: "Fira Code", monospace;
                        margin: 0;
                        padding: 0;
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    }

                    .navbar {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 1200px;
                background: var(--nav-bg);
                border-radius: 5px; /* Changed to a subtle rounded edge */
                padding: 15px 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 2px 10px var(--shadow); /* Simplified shadow */
                border: 1px solid var(--accent-color); /* Subtle border */
                z-index: 1000;
            }


                    .logo {
                        font-size: 24px;
                        font-weight: bold;
                        color: var(--text-color);
                        text-decoration: none;
                        font-family: Wonderly;
                    }

                    .logo span {
                        color: var(--accent-color);
                    }

                    .search-bar-container {
                        display: flex;
                        align-items: center;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 25px;
                        padding: 5px;
                        width: 40%;
                    }

                    .search-bar {
                        background: transparent;
                        border: none;
                        color: var(--text-color);
                        width: 100%;
                        padding: 8px 15px;
                        font-size: 16px;
                        outline: none;
                    }

                    .search-bar::placeholder {
                        color: rgba(255, 255, 255, 0.7);
                    }

                    .search-icon {
                        background: var(--accent-color);
                        width: 95px;
                        height: 35px;
                        border-radius: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .search-icon:hover {
                        background: var(--accent-hover);
                    }

                    .container {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 1rem;
                        padding-top: 100px;
                    }

                    @media (min-width: 768px) {
                        .container {
                            grid-template-columns: 2fr 1fr;
                        }
                    }

                    .video-section {
                        position: relative;
                    }

                    iframe {
                        width: 100%;
                        aspect-ratio: 16/9;
                        border: none;
                        border-radius: 8px;
                        box-shadow: 0 4px 20px var(--shadow);
                    }

                    .video-info {
                        padding: 2rem;
                        background: var(--card-bg);
                        border-radius: 8px;
                        box-shadow: 0 4px 20px var(--shadow);
                    }

                    select, button {
                        margin: 0.5rem 0;
                        padding: 0.8rem 1.2rem;
                        font-size: 1rem;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        background-color: var(--accent-color);
                        color: var(--text-color);
                        transition: background-color 0.2s;
                        display: block;
                        width: 100%;
                    }

                    select:hover, button:hover {
                        background-color: var(--accent-hover);
                    }

                    .navbar-container{
                    margin-bottom: 20px;
                    }

                    #episodeContainer {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem;
                        margin-top: 1rem;
                    }
                </style>
                <script type='text/javascript' src='//ushermassacrecranny.com/cb/1b/20/cb1b2051c4112987c288797c233ef8d7.js'></script>
                <script type='text/javascript' src='//ushermassacrecranny.com/cb/1b/20/cb1b2051c4112987c288797c233ef8d7.js'></script>
            </head>
            <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-10YYZFKVGQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-10YYZFKVGQ');
</script>
            <body>
            <div class="navbar-container">
                <nav class="navbar">
                    <a href="https://yesmovies.lol/index.html" class="logo">YES<span>MOVIES</span></a>
                    <div class="search-bar-container">
                        <input id="searchInput" type="text" class="search-bar" placeholder="Search movies & shows...">
                        <div class="search-icon" onclick="performSearch()">Search</div>
                    </div>
                </nav>
            </div>
                <div class="container">
                    <div class="video-section">
                        <iframe id="videoPlayer" src="https://vidsrc.net/embed/tv?imdb=${imdbId}&season=1&episode=1" allowfullscreen></iframe>
                    </div>
                    <div class="video-info">
                        <h1>${title}</h1>
                        <h2>Year: ${startYear}</h2>
                        <h3>Description</h3>
                        <p>${description}</p>
                        <h3>Select a Season</h3>
                        <select id="seasonDropdown" onchange="updateEpisodes(this.value)">
                            ${seasonDropdown}
                        </select>
                        <div id="episodeContainer"></div>
                    </div>
                </div>
                <script>
                    ${generateEpisodeButtonsScript}
                    updateEpisodes(1);

                    function performSearch() {
                        const query = document.getElementById('searchInput').value.trim();
                        if (query) {
                            window.location.href = '/search/' + encodeURIComponent(query);
                        }
                    }
                </script>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});



app.get('/search/:query', async (req, res) => {
    const query = req.params.query;
    const limit = 100; // Adjust the limit as required

    const url = `https://imdb236.p.rapidapi.com/imdb/search?primaryTitle=${query}&sortField=numVotes`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c184b7c08dmshcb3d53a5367e794p14b044jsna1831453c2e6',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const validMovies = result.results.filter(
            (movie) =>
                movie.averageRating &&
                movie.averageRating !== 'N/A' &&
                !movie.primaryTitle.toLowerCase().includes('fan film')
        );

        const movies = validMovies.slice(0, limit);

        const movieDetails = await Promise.all(
            movies.map(async (movie) => {
                const urlmov = `https://imdb236.p.rapidapi.com/imdb/${movie.id}`;
                const optionsmov = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'c184b7c08dmshcb3d53a5367e794p14b044jsna1831453c2e6',
                        'x-rapidapi-host': 'imdb236.p.rapidapi.com',
                    },
                };

                try {
                    const response = await fetch(urlmov, optionsmov);
                    const result = await response.json();
                    return {
                        ...movie,
                        image: result.primaryImage || 'placeholder.jpg',
                    };
                } catch (error) {
                    console.error(error);
                    return {
                        ...movie,
                        image: 'placeholder.jpg',
                    };
                }
            })
        );

        const movieCards = movieDetails
            .map((movie) => {
                const linkType = movie.type === 'tvSeries' ? 'shows' : 'movies';
                return `
                    <div class="movie-card" onclick="location.href='https://yesmovies.lol/${linkType}/${movie.id}'">
                        <img src="${movie.image}" alt="${movie.primaryTitle}" />
                        <div class="movie-info">
                            <div class="movie-title">${movie.primaryTitle}</div>
                            <div class="movie-meta">
                                <span>⭐ ${movie.averageRating || 'N/A'}</span>
                                <span> • ${movie.startYear || ''}</span>
                            </div>
                        </div>
                    </div>
                `;
            })
            .join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Search Results - Yes Movies</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #121212;
                        color: #FFFFFF;
                    }
                    .navbar {
                        position: fixed;
                        top: 0;
                        width: 100%;
                        background-color: #1E1E1E;
                        padding: 15px 20px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
                        z-index: 1000;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #FFFFFF;
                    }
                    .navbar a {
                        color: #FFFFFF;
                        text-decoration: none;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .navbar a span {
                        color: #8B5CF6;
                    }
                    .search-bar-container {
                        display: flex;
                        align-items: center;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 5px;
                        padding: 5px;
                        width: 40%;
                    }
                    .search-bar {
                        background: transparent;
                        border: none;
                        color: #FFFFFF;
                        width: 100%;
                        padding: 8px 15px;
                        font-size: 16px;
                        outline: none;
                    }
                    .search-bar::placeholder {
                        color: rgba(255, 255, 255, 0.7);
                    }
                    .search-icon {
                        background: #8B5CF6;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        color: #FFFFFF;
                        font-size: 16px;
                        text-align: center;
                    }
                    .search-icon:hover {
                        background: #7C3AED;
                    }
                    .main-content {
                        padding-top: 80px;
                        text-align: center;
                    }
                    .movie-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 15px;
                        padding: 20px;
                    }
                    .movie-card {
                        background: #1E1E1E;
                        padding: 10px;
                        border-radius: 8px;
                        cursor: pointer;
                        text-align: center;
                    }
                    .movie-card img {
                        max-width: 100%;
                        border-radius: 8px;
                    }
                    .side-ad {
                        position: fixed;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 160px;
                        height: 300px;
                    }
                    .side-ad.left {
                        left: 10px;
                    }
                    .side-ad.right {
                        right: 10px;
                    }
                </style>
            </head>
            <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-10YYZFKVGQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-10YYZFKVGQ');
</script>
            <body>
                <div class="navbar">
                    <a href="https://yesmovies.lol">YES<span>MOVIES</span></a>
                    <div class="search-bar-container">
                        <input id="searchInput" type="text" class="search-bar" placeholder="Search movies & shows...">
                        <div class="search-icon" onclick="performSearch()">Search</div>
                    </div>
                </div>
               
                
                <div class="main-content">
                    <h2>Search Results for "${query}"</h2>
                    <div class="movie-grid">
                        ${movieCards}
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});


// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on https://yesmovies.lol${PORT}`);
});
