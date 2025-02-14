import express from 'express' 
import cors from 'cors'
import fetch from 'node-fetch'
const app = express();

app.use(cors());

const URL = 'https://streamtp3.com/eventos.html';


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});




// Define the route to handle /movies/{imdb}
app.get('/movies/:imdb', async (req, res) => {
    const imdbId = req.params.imdb;

    const url = `https://imdb236.p.rapidapi.com/imdb/${imdbId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9fb120d37fmshd161bdd6689911fp1ed9c4jsn93e49ffd5e8b',
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

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title}</title>
                <link rel="icon" type="image/x-icon" href="https://th.bing.com/th/id/R.17dea5ebc20f4fd10389b4f180ae9b3d?rik=e9t%2fhvOQADZM1g&riu=http%3a%2f%2fclipart-library.com%2fimages%2f8i65B8AXT.png&ehk=ruY7nFucsGPNXtLQ6BYoDblZX0Klw15spn25fXFppPs%3d&risl=&pid=ImgRaw&r=0">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <link rel="icon" href="https://th.bing.com/th/id/R.17dea5ebc20f4fd10389b4f180ae9b3d?rik=e9t%2fhvOQADZM1g&riu=http%3a%2f%2fclipart-library.com%2fimages%2f8i65B8AXT.png&ehk=ruY7nFucsGPNXtLQ6BYoDblZX0Klw15spn25fXFppPs%3d&risl=&pid=ImgRaw&r=0">
                <style>
                    :root {
                        --netflix-bg: #141414;
                        --netflix-black: #000000;
                        --netflix-red: #E50914;
                        --text-color: #FFFFFF;
                        --text-secondary: #999999;
                        --card-bg: rgba(0, 0, 0, 0.75);
                    }
    
                    body {
                        font-family: 'Montserrat', sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: var(--netflix-bg);
                        color: var(--text-color);
                        line-height: 1.6;
                    }

                    .navbar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%);
                        padding: 1rem 4%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        z-index: 1000;
                    }

                    .logo {
                        font-size: 28px;
                        font-weight: 700;
                        text-decoration: none;
                    }

                    .logo .yes {
                        color: var(--netflix-red);
                    }

                    .logo .movies {
                        color: var(--text-color);
                    }

                    .search-bar-container {
                        display: flex;
                        align-items: center;
                        background: rgba(0, 0, 0, 0.75);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                        width: 40%;
                        transition: all 0.3s ease;
                    }

                    .search-bar-container:focus-within {
                        border-color: var(--text-color);
                    }

                    .search-bar {
                        background: transparent;
                        border: none;
                        color: var(--text-color);
                        width: 100%;
                        padding: 10px 15px;
                        font-size: 14px;
                        font-family: 'Montserrat', sans-serif;
                    }

                    .search-bar::placeholder {
                        color: var(--text-secondary);
                    }

                    .search-icon {
                        background: var(--netflix-red);
                        padding: 10px 20px;
                        border-radius: 0 4px 4px 0;
                        cursor: pointer;
                        font-weight: 500;
                        transition: background-color 0.3s;
                    }

                    .search-icon:hover {
                        background: #f40612;
                    }

                    .container {
                        display: grid;
                        grid-template-columns: 65% 35%;
                        gap: 2rem;
                        max-width: 1800px;
                        margin: 0 auto;
                        padding: 80px 4% 2rem;
                    }

                    .video-section {
                        position: relative;
                    }

                    iframe {
                        width: 100%;
                        aspect-ratio: 16/9;
                        border: none;
                        border-radius: 4px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    }

                    .fullscreen-button {
                        background: var(--netflix-red);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 4px;
                        cursor: pointer;
                        font-family: 'Montserrat', sans-serif;
                        font-weight: 500;
                        margin-top: 1rem;
                        transition: background-color 0.3s;
                    }

                    .fullscreen-button:hover {
                        background: #f40612;
                    }

                    .video-info {
                        margin-top: 2rem;
                        padding: 2rem;
                        background: var(--card-bg);
                        border-radius: 4px;
                        backdrop-filter: blur(10px);
                    }

                    .rating-container {
                        display: flex;
                        gap: 1.5rem;
                        margin-bottom: 2rem;
                    }

                    .rating-box {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 1rem;
                        border-radius: 4px;
                        text-align: center;
                        flex: 1;
                    }

                    .rating-box h4 {
                        margin: 0;
                        font-size: 0.8rem;
                        color: var(--text-secondary);
                        font-weight: 500;
                    }

                    .rating-box .value {
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-top: 0.5rem;
                        color: var(--text-color);
                    }

                    .genres-container {
                        display: flex;
                        gap: 0.8rem;
                        flex-wrap: wrap;
                    }

                    .genre-tag {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        font-size: 0.9rem;
                        font-weight: 500;
                    }

                    .info-section {
                        background: var(--card-bg);
                        padding: 2rem;
                        border-radius: 4px;
                        backdrop-filter: blur(10px);
                    }

                    .info-section h1 {
                        margin: 0 0 1rem 0;
                        font-size: 2.5rem;
                        font-weight: 700;
                    }

                    .info-section h2 {
                        color: var(--text-secondary);
                        font-size: 1.2rem;
                        font-weight: 500;
                        margin: 0 0 2rem 0;
                    }

                    .info-section h3 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin: 2rem 0 1rem 0;
                    }

                    .info-section p {
                        color: var(--text-secondary);
                        font-size: 1rem;
                        line-height: 1.7;
                        margin: 0;
                    }

                    @media (max-width: 1024px) {
                        .container {
                            grid-template-columns: 1fr;
                        }
                        
                        .search-bar-container {
                            width: 50%;
                        }
                    }

                    @media (max-width: 768px) {
                        .search-bar-container {
                            width: 60%;
                        }
                        
                        .rating-container {
                            flex-direction: column;
                        }
                    }
                </style>
            </head>
<script type='text/javascript' src='//ushermassacrecranny.com/cb/1b/20/cb1b2051c4112987c288797c233ef8d7.js'></script>            <body>
                <nav class="navbar">
                    <a href="/" class="logo">
                        <span class="yes">Yes</span><span class="movies">Movies</span>
                    </a>
                    <div class="search-bar-container">
                        <input id="searchInput" type="text" class="search-bar" placeholder="Search movies & shows...">
                        <div class="search-icon" onclick="performSearch()">Search</div>
                    </div>
                </nav>
                
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
                        <h2>${startYear}</h2>
                        <h3>Description</h3>
                        <p>${description}</p>
                    </div>
                </div>

                <script>
                    function performSearch() {
                        const query = document.getElementById('searchInput').value.trim();
                        if (query) {
                            const url = '/search/' + encodeURIComponent(query);
                            window.location.href = url;
                        } else {
                            alert('Please enter a search term.');
                        }
                    }
                </script>
                <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5D5C0M4BFT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5D5C0M4BFT');
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
            'x-rapidapi-key': '9fb120d37fmshd161bdd6689911fp1ed9c4jsn93e49ffd5e8b',
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
    <title>${title} - YesMovies</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" href="https://th.bing.com/th/id/R.17dea5ebc20f4fd10389b4f180ae9b3d?rik=e9t%2fhvOQADZM1g&riu=http%3a%2f%2fclipart-library.com%2fimages%2f8i65B8AXT.png&ehk=ruY7nFucsGPNXtLQ6BYoDblZX0Klw15spn25fXFppPs%3d&risl=&pid=ImgRaw&r=0">
    <style>
        :root {
            --primary: #e50914;
            --dark: #141414;
            --darker: #000000;
            --light: #ffffff;
            --gray: #808080;
            --transparent-dark: rgba(20, 20, 20, 0.7);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body {
            background: var(--dark);
            color: var(--light);
            min-height: 100vh;
        }

        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 68px;
            padding: 0 4%;
            background: linear-gradient(180deg, var(--darker) 0%, transparent 100%);
            display: flex;
            align-items: center;
            transition: background-color 0.3s;
            z-index: 1000;
        }

        .navbar.scrolled {
            background: var(--darker);
        }

        .logo {
            color: var(--primary);
            text-decoration: none;
            font-size: 1.8rem;
            font-weight: 700;
            margin-right: 2rem;
        }

        .logo span {
            color: var(--light);
        }

        .search-container {
            position: relative;
            max-width: 500px;
            width: 100%;
        }

        .search-bar {
            width: 100%;
            padding: 10px 16px;
            background: var(--transparent-dark);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: var(--light);
            font-size: 1rem;
        }

        .search-bar:focus {
            outline: none;
            border-color: var(--light);
        }

        .search-button {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--primary);
            color: var(--light);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        }

        .content-wrapper {
            max-width: 1600px;
            margin: 0 auto;
            padding: 100px 4% 2rem;
        }

        .content-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2rem;
            align-items: start;
        }

        .video-container {
            position: relative;
            width: 100%;
            background: var(--darker);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .video-player {
            width: 100%;
            aspect-ratio: 16/9;
            border: none;
        }

        .show-info {
            background: rgba(255, 255, 255, 0.05);
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .show-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .show-meta {
            color: var(--gray);
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }

        .show-description {
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            color: #e5e5e5;
        }

        .season-selector {
            background: var(--transparent-dark);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--light);
            padding: 12px;
            font-size: 0.9rem;
            border-radius: 4px;
            margin-bottom: 1.5rem;
            width: 100%;
            cursor: pointer;
        }

        .season-selector:focus {
            outline: none;
            border-color: var(--light);
        }

        .episodes-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.8rem;
        }

        .episode-button {
            background: var(--transparent-dark);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: var(--light);
            padding: 0.8rem;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
            font-size: 0.9rem;
            width: 100%;
        }

        .episode-button:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--primary);
        }

        @media (max-width: 1024px) {
            .content-grid {
                grid-template-columns: 1fr;
            }

            .show-info {
                margin-top: 1rem;
            }
        }

        @media (max-width: 768px) {
            .navbar {
                height: auto;
                padding: 1rem 4%;
                flex-direction: column;
                gap: 1rem;
            }

            .content-wrapper {
                padding-top: 120px;
            }

            .show-title {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<script type='text/javascript' src='//ushermassacrecranny.com/cb/1b/20/cb1b2051c4112987c288797c233ef8d7.js'></script>
<body>
    <nav class="navbar">
        <a href="/" class="logo">Yes<span>Movies</span></a>
        <div class="search-container">
            <input type="search" class="search-bar" placeholder="Search movies & shows..." id="searchInput">
            <button class="search-button" onclick="performSearch()">Search</button>
        </div>
    </nav>

    <div class="content-wrapper">
        <div class="content-grid">
            <div class="video-container">
                <iframe 
                    id="videoPlayer" 
                    class="video-player"
                    src="https://vidsrc.net/embed/tv?imdb=${imdbId}&season=1&episode=1" 
                    allowfullscreen>
                </iframe>
            </div>

            <div class="show-info">
                <h1 class="show-title">${title}</h1>
                <div class="show-meta">
                    <span>${startYear}</span>
                </div>
                <p class="show-description">${description}</p>

                <select class="season-selector" id="seasonDropdown" onchange="updateEpisodes(this.value)">
                    ${seasonDropdown}
                </select>

                <div id="episodeContainer" class="episodes-grid"></div>
            </div>
        </div>
    </div>

    <script>
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Episode generation
        ${generateEpisodeButtonsScript}
        updateEpisodes(1);

        // Search functionality
        function performSearch() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                window.location.href = '/search/' + encodeURIComponent(query);
            }
        }

        // Enter key search trigger
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    </script>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5D5C0M4BFT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5D5C0M4BFT');
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
            'x-rapidapi-key': '9fb120d37fmshd161bdd6689911fp1ed9c4jsn93e49ffd5e8b',
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
                        'x-rapidapi-key': '9fb120d37fmshd161bdd6689911fp1ed9c4jsn93e49ffd5e8b',
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
                    <div class="movie-card" onclick="location.href='https://allstream.cc/${linkType}/${movie.id}'">
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
    <title>Search Results - YesMovies</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" href="https://th.bing.com/th/id/R.17dea5ebc20f4fd10389b4f180ae9b3d?rik=e9t%2fhvOQADZM1g&riu=http%3a%2f%2fclipart-library.com%2fimages%2f8i65B8AXT.png&ehk=ruY7nFucsGPNXtLQ6BYoDblZX0Klw15spn25fXFppPs%3d&risl=&pid=ImgRaw&r=0">

    <style>
        :root {
            --primary: #e50914;
            --dark: #141414;
            --darker: #000000;
            --light: #ffffff;
            --gray: #808080;
            --transparent-dark: rgba(20, 20, 20, 0.7);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Montserrat', sans-serif;
        }

        body {
            background: var(--dark);
            color: var(--light);
        }

        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 68px;
            padding: 0 4%;
            background: linear-gradient(180deg, var(--darker) 0%, transparent 100%);
            display: flex;
            align-items: center;
            transition: background-color 0.3s;
            z-index: 1000;
        }

        .navbar.scrolled {
            background: var(--darker);
        }

        .navbar-content {
            display: flex;
            align-items: center;
            width: 100%;
            gap: 2rem;
        }

        .logo {
            color: var(--primary);
            text-decoration: none;
            font-size: 1.8rem;
            font-weight: 700;
            flex-shrink: 0;
        }

        .logo span {
            color: var(--light);
        }

        .search-container {
            position: relative;
            flex-grow: 1;
            max-width: 600px;
        }

        .search-bar {
            width: 100%;
            padding: 10px 30px;
            background: var(--transparent-dark);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: var(--light);
            font-size: 1rem;
            transition: all 0.3s;
        }

        .search-bar:focus {
            background: var(--darker);
            border-color: var(--light);
            outline: none;
        }

        .search-button {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--primary);
            color: var(--light);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.3s;
        }

        .search-button:hover {
            background: #f40612;
        }

        .main-content {
            padding: 90px 4% 2rem;
            
        }

        .search-header {
            margin-bottom: 2rem;
            font-size: 1.5rem;
            font-weight: 500;
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            padding: 0.5rem;
        }

        .movie-card {
            position: relative;
            border-radius: 4px;
            overflow: hidden;
            transition: transform 0.3s ease;
            cursor: pointer;
            aspect-ratio: 2/3;
        }

        .movie-card:hover {
            transform: scale(1.05);
        }

        .movie-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .movie-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1rem;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
            transform: translateY(100%);
            transition: transform 0.3s ease;

        }

        .movie-card:hover .movie-info {
            transform: translateY(0);
        }

        .movie-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .movie-meta {
            display: flex;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #ccc;
        }

        @media (max-width: 768px) {
            .navbar {
                height: auto;
                padding: 1rem 4%;
                margin-bottom: 30px;
            }

            .navbar-content {
                flex-direction: column;
                gap: 1rem;
            }

            .search-container {
                width: 100%;
            }

            .results-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }

            .movie-info {
                transform: translateY(0);
                background: rgba(0, 0, 0, 0.8);
            }

            .movie-title {
                font-size: 0.9rem;
            }

            .movie-meta {
                font-size: 0.8rem;
            }

            .main-content {
            margin-top: 45px;}
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-content">
            <a href="/" class="logo">Yes<span>Movies</span></a>
            <div class="search-container">
                <input type="search" class="search-bar" placeholder="Search movies & shows..." id="searchInput">
                <button class="search-button" onclick="performSearch()">Search</button>
            </div>
        </div>
    </nav>

    <main class="main-content">
        <h1 class="search-header">Search Results for "${query}"</h1>
        <div class="results-grid">
            ${movieCards}
        </div>
    </main>

    <script>
        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Search functionality
        function performSearch() {
            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                window.location.href = '/search/' + encodeURIComponent(query);
            }
        }

        // Enter key search trigger
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    </script>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5D5C0M4BFT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5D5C0M4BFT');
</script>
</body>
</html>
            `);
            
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});


app.get('/live-events', async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(URL, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.event-name', { timeout: 10000 });

        const events = await page.evaluate((url) => {
            return Array.from(document.querySelectorAll('.event-name')).map(eventElement => {
                const title = eventElement.textContent.trim();
                const iframeInput = eventElement.parentElement.querySelector('.iframe-link');
                let link = '#';
                
                if (iframeInput) {
                    try {
                        link = new URL(iframeInput.value.trim(), url).href;
                    } catch (error) {
                        console.error('Invalid URL:', iframeInput.value.trim());
                    }
                }

                const statusButton = eventElement.parentElement.querySelector('.status-button');
                let status = 'Unknown';
                if (statusButton) {
                    if (statusButton.classList.contains('status-next')) status = 'Soon';
                    else if (statusButton.classList.contains('status-live')) status = 'Live';
                    else if (statusButton.classList.contains('status-finished')) status = 'Finished';
                }

                return { title, link, status };
            });
        }, URL);

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Live Events</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
                <style>
                    .status { 
                        font-weight: bold; 
                        padding: 5px 10px; 
                        border-radius: 5px; 
                        margin-left: 10px;
                    }
                    .status.Soon { background: #ffd700; color: black; }
                    .status.Live { background: #ff4444; color: white; }
                    .status.Finished { background: #808080; color: white; }
                    .watch-btn.disabled { opacity: 0.5; cursor: not-allowed; }
                </style>
            </head>
            <body class="bg-gray-100 min-h-screen p-4">
                <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">Live Events</h1>
                    <div class="space-y-4">
                        ${events.map(event => `
                            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div class="flex items-center">
                                    <span class="font-medium text-gray-800">${event.title}</span>
                                    <span class="status ${event.status}">${event.status}</span>
                                </div>
                                <a class="watch-btn ${event.link === '#' ? 'disabled' : ''} 
                                    bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors
                                    ${event.link === '#' ? 'pointer-events-none' : ''}"
                                   ${event.link !== '#' ? `href="/stream/${encodeURIComponent(event.link)}?title=${encodeURIComponent(event.title)}"` : ''}>
                                    Watch Now
                                </a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </body>
            </html>
        `;

        res.send(html);
    } catch (error) {
        console.error('Scraping Error:', error);
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
            </head>
            <body class="bg-gray-100 min-h-screen flex items-center justify-center">
                <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h1 class="text-2xl font-bold text-red-600 mb-4">Error</h1>
                    <p class="text-gray-700">Unable to fetch live events. Please try again later.</p>
                    <button onclick="window.location.reload()" 
                            class="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                        Retry
                    </button>
                </div>
            </body>
            </html>
        `);
    } finally {
        await browser.close();
    }
});

// Endpoint to serve the stream page
app.get('/stream/:url', (req, res) => {
  const externalUrl = decodeURIComponent(req.params.url);
  const title = req.query.title || 'Live Stream';
  
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">
          <style>
              body, html { margin: 0; padding: 0; height: 100vh; }
              .aspect-video { aspect-ratio: 16 / 9; }
          </style>
      </head>
      <body class="bg-gray-100">
          <div class="min-h-screen flex flex-col">
              <header class="bg-white border-b">
                  <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                      <div class="flex items-center gap-4">
                          <a href="/live-events" class="text-gray-600 hover:text-gray-900">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                              </svg>
                          </a>
                          <h1 class="text-xl font-semibold text-gray-900">${title}</h1>
                      </div>
                      <button onclick="toggleFullscreen()" class="text-gray-600 hover:text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                      </button>
                  </div>
              </header>
              <main class="flex-1 p-4">
                  <div class="max-w-6xl mx-auto bg-black rounded-lg overflow-hidden">
                      <div class="aspect-video w-full h-96"> <!-- Adjusted to a specific height -->
                          <iframe src="${externalUrl}" 
                                  class="w-full h-full" 
                                  allowfullscreen>
                          </iframe>
                      </div>
                  </div>
              </main>
          </div>
          <script>
              function toggleFullscreen() {
                  if (!document.fullscreenElement) {
                      document.documentElement.requestFullscreen();
                  } else {
                      document.exitFullscreen();
                  }
              }
          </script>
      </body>
      </html>
  `;
  res.send(html);
});




// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
