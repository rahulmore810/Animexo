<!DOCTYPE html>
<html>
<head>
    <title>Animexo</title>
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#2563eb">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

    <link rel="stylesheet" href="css/style.css?v=3">
</head>
<body>

<div class="top-bar">
    <div class="logo">Animexo</div>

    <div class="controls">
        <button class="btn" onclick="goHome()">Home</button>

        <input id="searchInput" placeholder="Search anime">

        <button class="btn" onclick="searchAnime()">Search</button>

        <select id="genreSelect" onchange="applyGenre()">
            <option value="">Genres</option>
        </select>
    </div>
</div>

<div id="animeGrid"></div>

<div id="popup" class="popup hidden">
    <div class="popup-box">
        <button class="btn back-btn" onclick="closePopup()">Back</button>

        <div class="popup-content">
            <img id="popupImg">
            <div class="popup-info">
                <h2 id="popupTitle"></h2>
                <p id="popupMeta"></p>
                <p id="popupSummary"></p>
            </div>
        </div>

        <h3>Recommendations</h3>
        <div id="popupReco" class="reco-row"></div>
    </div>
</div>

<script src="js/app.js?v=5"></script>

<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
</script>

</body>
</html>
