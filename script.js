// Variabel Penyimpanan Data Keuangan Kelompok
let databaseSiswa = [];
let totalSetoran = 0;
let totalPenarikan = 0;

// Menghubungkan element tombol ke kode JS
const btnTambah = document.getElementById('btnTambah');
const btnTarik = document.getElementById('btnTarik');
const navItems = document.querySelectorAll('.nav-menu .nav-item');

// Menyalakan fungsi penangkap klik tombol
btnTambah.addEventListener('click', tambahSiswa);
btnTarik.addEventListener('click', prosesPenarikan);

// Logika Navigasi Tab agar otomatis berpindah menu saat ditekan
navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Fungsi memperbarui angka dashboard secara real-time
function updateDashboard() {
    document.getElementById('totalSetoran').innerText = "Rp " + totalSetoran.toLocaleString('id-ID');
    document.getElementById('totalPenarikan').innerText = "Rp " + totalPenarikan.toLocaleString('id-ID');
    document.getElementById('saldoTabungan').innerText = "Rp " + (totalSetoran - totalPenarikan).toLocaleString('id-ID');
    document.getElementById('jumlahSiswa').innerText = databaseSiswa.length;
}

// Fungsi menambah data siswa ke dalam tabel aplikasi
function tambahSiswa() {
    const nama = document.getElementById('namaSiswa').value.trim();
    const kelas = document.getElementById('kelasSiswa').value;
    const setoran = parseInt(document.getElementById('setoranAwal').value) || 0;

    if (nama === "" || kelas === "" || setoran <= 0) {
        alert("Mohon isi Nama, Kelas, dan nominal Setoran Awal dengan benar!");
        return;
    }

    databaseSiswa.push({ nama, kelas, saldo: setoran });
    totalSetoran += setoran;

    const tabel = document.getElementById('tabelSiswa');
    const emptyRow = document.getElementById('emptyRow');
    if (emptyRow) emptyRow.remove();

    const rowBaru = document.createElement('tr');
    rowBaru.innerHTML = `
        <td class="text-center font-bold" style="color: #6b7565;">${databaseSiswa.length}</td>
        <td class="font-bold" style="color: #2f362a;">${nama}</td>
        <td style="color: #6b7565;">${kelas}</td>
        <td class="text-right font-bold text-green">Rp ${setoran.toLocaleString('id-ID')}</td>
    `;
    tabel.appendChild(rowBaru);

    // Reset isi form pendaftaran setelah sukses
    document.getElementById('namaSiswa').value = "";
    document.getElementById('kelasSiswa').value = "";
    document.getElementById('setoranAwal').value = "";

    updateDashboard();
    alert(`Berhasil mendaftarkan "${nama}" dengan setoran Rp ${setoran.toLocaleString('id-ID')}`);
}

// Fungsi memotong saldo tabungan kelas
function prosesPenarikan() {
    const keterangan = document.getElementById('tarikKeterangan').value.trim();
    const nominal = parseInt(document.getElementById('tarikNominal').value) || 0;
    const saldoSaatIni = totalSetoran - totalPenarikan;

    if (keterangan === "" || nominal <= 0) {
        alert("Mohon masukkan alasan keperluan dan nominal penarikan dengan benar!");
        return;
    }

    if (nominal > saldoSaatIni) {
        alert("Transaksi Gagal! Saldo terkumpul tidak mencukupi untuk melakukan penarikan.");
        return;
    }

    totalPenarikan += nominal;
    updateDashboard();

    // Reset form pencatatan pengeluaran setelah sukses
    document.getElementById('tarikKeterangan').value = "";
    document.getElementById('tarikNominal').value = "";
    alert(`Penarikan sebesar Rp ${nominal.toLocaleString('id-ID')} berhasil dicatat.`);
}