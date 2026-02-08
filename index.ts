<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FF Player Lookup</title>
    <style>
        :root {
            --primary: #ff4655;
            --bg: #0f1923;
            --card: #1f2933;
            --text: #ece8e1;
        }
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        .container {
            background: var(--card);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            width: 100%;
            max-width: 500px;
            text-align: center;
        }
        input, select {
            padding: 12px;
            margin: 10px 5px;
            border-radius: 5px;
            border: 1px solid #444;
            background: #111;
            color: white;
            width: calc(50% - 30px);
        }
        button {
            padding: 12px 30px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            width: 100%;
            margin-top: 10px;
        }
        button:hover { opacity: 0.9; }
        #result {
            margin-top: 20px;
            text-align: left;
            border-top: 1px solid #444;
            padding-top: 20px;
            display: none;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            background: rgba(255,255,255,0.05);
            padding: 10px;
            border-radius: 4px;
        }
        .label { color: #888; font-size: 0.9rem; }
        .error { color: var(--primary); margin-top: 10px; }
    </style>
</head>
<body>

    <div class="container">
        <h2>Free Fire Player Lookup</h2>
        <div>
            <input type="text" id="uid" placeholder="Enter Player UID (e.g. 12345)">
            <select id="region">
                <option value="ind">India</option>
                <option value="br">Brazil</option>
                <option value="sg">Singapore</option>
                <option value="us">United States</option>
                <option value="eu">Europe</option>
            </select>
        </div>
        <button onclick="fetchPlayerInfo()">Search Player</button>

        <div id="error-msg" class="error"></div>

        <div id="result">
            <div class="info-item"><span class="label">Nickname:</span> <b id="res-name">-</b></div>
            <div class="info-item"><span class="label">Level:</span> <b id="res-level">-</b></div>
            <div class="info-item"><span class="label">Exp:</span> <b id="res-exp">-</b></div>
            <div class="info-item"><span class="label">Region:</span> <b id="res-region">-</b></div>
            <div class="info-item"><span class="label">Likes:</span> <b id="res-likes">-</b></div>
            <div class="info-item"><span class="label">Rank Points:</span> <b id="res-rank">-</b></div>
        </div>
    </div>

    <script>
        async function fetchPlayerInfo() {
            const uid = document.getElementById('uid').value;
            const region = document.getElementById('region').value;
            const resultDiv = document.getElementById('result');
            const errorDiv = document.getElementById('error-msg');

            // Reset UI
            errorDiv.innerText = "";
            resultDiv.style.display = "none";

            if (!uid) {
                errorDiv.innerText = "Please enter a UID";
                return;
            }

            try {
                // Using the specific API endpoint provided in the repo
                const response = await fetch(`https://free-ff-api.vercel.app/api/info?uid=${uid}&region=${region}`);
                const data = await response.json();

                if (data.error || !data.basicInfo) {
                    throw new Error(data.error || "Player not found");
                }

                // Fill data
                document.getElementById('res-name').innerText = data.basicInfo.nickname;
                document.getElementById('res-level').innerText = data.basicInfo.level;
                document.getElementById('res-exp').innerText = data.basicInfo.exp;
                document.getElementById('res-region').innerText = data.basicInfo.region;
                document.getElementById('res-likes').innerText = data.basicInfo.liked;
                document.getElementById('res-rank').innerText = data.basicInfo.rank;

                resultDiv.style.display = "block";
            } catch (err) {
                errorDiv.innerText = "Error: " + err.message;
            }
        }
    </script>
</body>
</html>
      
