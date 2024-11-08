let startTime;
let isRunning = false;
let timerInterval;

// Fungsi untuk memulai timer dan pelacakan
function startRun() {
    if (!isRunning) {
        startTime = new Date();
        isRunning = true;
        document.getElementById("pauseRun").disabled = false;
        document.getElementById("stopRun").disabled = false;
        document.getElementById("startRun").disabled = true;

        // Mulai timer
        timerInterval = setInterval(updateTime, 1000);
    }
}

// Fungsi untuk menghentikan sementara
function pauseRun() {
    isRunning = false;
    clearInterval(timerInterval);
    document.getElementById("startRun").disabled = false;
    document.getElementById("pauseRun").disabled = true;
}

// Fungsi untuk menghentikan dan menambahkan riwayat
function stopRun() {
    isRunning = false;
    clearInterval(timerInterval);
    document.getElementById("startRun").disabled = false;
    document.getElementById("pauseRun").disabled = true;
    document.getElementById("stopRun").disabled = true;

    // Ambil data dari elemen
    const distance = document.getElementById("distance").innerText;
    const time = document.getElementById("time").innerText;
    const speed = document.getElementById("speed").innerText;
    const calories = document.getElementById("calories").innerText;

    // Buat elemen riwayat lari baru
    const logEntry = document.createElement("div");
    logEntry.classList.add("log-entry");
    logEntry.innerHTML = `
        <p><strong>Total KM:</strong> ${distance} km</p>
        <p><strong>Durasi:</strong> ${time}</p>
        <p><strong>Kecepatan:</strong> ${speed} km/h</p>
        <p><strong>Kalori:</strong> ${calories} kcal</p>
    `;

    // Tambahkan riwayat lari terbaru di bagian atas log
    const logContainer = document.getElementById("log");
    logContainer.insertBefore(logEntry, logContainer.children[1]); // Tambahkan di bawah judul "Riwayat Lari"

    // Reset nilai setelah menghentikan lari
    document.getElementById("distance").innerText = "0.0";
    document.getElementById("time").innerText = "00:00:00";
    document.getElementById("speed").innerText = "0.0";
    document.getElementById("calories").innerText = "0";
}

// Fungsi untuk memperbarui waktu
function updateTime() {
    const now = new Date();
    const elapsedTime = new Date(now - startTime);

    const hours = String(elapsedTime.getUTCHours()).padStart(2, '0');
    const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');

    document.getElementById("time").innerText = `${hours}:${minutes}:${seconds}`;

    // Perbarui nilai lainnya
    updateStats(elapsedTime);
}

// Fungsi untuk memperbarui jarak, kecepatan, dan kalori (simulasi sederhana)
function updateStats(elapsedTime) {
    const seconds = elapsedTime / 1000;
    const distance = (seconds * 0.0028).toFixed(2); // Simulasi jarak
    const speed = (distance / (seconds / 3600)).toFixed(2); // Simulasi kecepatan
    const calories = (distance * 50).toFixed(0); // Simulasi kalori

    document.getElementById("distance").innerText = distance;
    document.getElementById("speed").innerText = speed;
    document.getElementById("calories").innerText = calories;
}

// Event listeners
document.getElementById("startRun").addEventListener("click", startRun);
document.getElementById("pauseRun").addEventListener("click", pauseRun);
document.getElementById("stopRun").addEventListener("click", stopRun);
