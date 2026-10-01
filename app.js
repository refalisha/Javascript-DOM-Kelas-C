console.log("Praktikum Dimulai!");

//Aktivasi 1: DOM Selection Seleksi DOM
// DOM Selection kita harus "Menangkap element" Sebelum kita manipulasi HTML
//Ambil elemen -> Simpan di dalam Variable 

// 1. Ambil Element  Judul Berdasarkan ID
// document.getElementById("...") -> Ambil Elemen HTML Spesifik berdasarkan ID
const judulUtama = document.getElementById("judul-utama");

// 1.1 querySelector (#"...") mengambil ID berdasarkan atribut ID
// Tanda (#) Artinya menargetkan ID (.) menargetkan Class
// ambil element sub judul berdasarkan ID
const subJudul = document.querySelector("#sub-judul");

// 2. Mengambil Elemen Pada kartu 1 (Kartu Manipulatif Teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. mengambil tombol" Aksi Pada Kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil Element pada kartu 2 (fitur catatan dinamis \ todolist)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");



// Aktivitas 2: manipulasi teks & style (pada kartu 1)
// addEventListener("click", function() {...}) -> artinya tolong dengarkan dan tunggu
// setelah di "click" oleh user jelankan perintah di dalam function


// A. Mengubah teks preview ketika tombol "Ubah Teks" di klik  
btnUbahTeks.addEventListener("click", function(){
// .innerText = Mengisi/manipulasi tulisan teks yang ada di HTML
teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM!";

// .style.color = mengubah warna teks secara langsung malalui Javascript (Inline)
teksPreview.style.color = "#1619f6";

// consol.log = mencetak pesan di console
console.log("DOM Teks Preview telah diperbaharui");
})


// B. Mengubah warna background box preview ketika tombol "Toggle Warna" di klik
btnToggleWarna.addEventListener("click", function(){
    // .classList.toggle("nama-class") -> menambahkan class jika belum ada, menghapus class jika sudah ada
    // Jika Class tersebut Blum ada pada element, Maka class tersebut akan ditambhakan
    // Jika Class tersebut Sudah ada pada element, Maka class tersebut akan dihapus
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM Box Preview telah diperbaharui");
})

// C. Mengembalikan Teks & Warna Teks Preview ke Default (Reset)
btnReset.addEventListener("click", function(){
// Mengembalikan Teks Preview ke Default 
teksPreview.innerText = "Halo! Teks ini siap di ubah oleh Javascript";

// Kosongkan warna agar warna kembali ke default (inherit)
teksPreview.style.color = "";

// Hapus class khusus menggunakan .classlist.remove("nama-class")
boxPreview.classList.remove("active-mode");
cardManipulasi.classList.remove("highlight")
console.log("DOM Box Preview telah dikembalikan ke default");
});


// Aktivitas 3 & 4: Membuat catatan dinamis (Todolist) & Menghitung Jumalah Catatam (pada kartu 2)
// bagian ini kita belajar membuat element HTML baru (<li>) secara dinamis menggunakan Javascript
// Lalu mengisi teksnya, memberi tombol hapus, lalu menempelkannya kedalam layar

// Langkah 1 : Membuat Variable untuk menampung Jumlah catatan
// "let" digunakan karena nilainya akan berubah-ubah
let totalCatatan = 0;

// Langkah 2 : Membuat Fungsi untuk menambahkan catatan baru
// Fungsi ini adalah kumpulan perintah yang akan diberi nama. Kita bisa memanggilnya kapanpun kita mau.
function perbaruiJumlah() {
    // Masukkan angka totalCatatan ke dalam element HTML jumlahCatatan
    jumlahCatatan.innerText = totalCatatan;

    // Percabangan Kondisi: apakah catatanya 0?
    if (totalCatatan === 0) {
        // Jika 0: Hapus class "hidden" agar pesan "Tidak ada catatan" hilang
        pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0: Tambahkan class "hidden" agar pesan "Tidak ada catatan" muncul 
        pesanKosong.classList.add("hidden");
    }
}

// langkah 3: Membuat Fungsi untuk menambahkan catatan baru
function tambahCatatan() {
    //3.1 inputCatatan.value -> mengambil teks yang diketik user di input 
    // .trim() -> menghapus spasi kosong di awal dan akhir teks
    const isiTeks = inputCatatan.value.trim();

// 3.2  Validasi input: jika variable isiTeks kosong (""), maka Tampilkan alert
if (isiTeks === "") {
    alert("Catatan tidak boleh kosong!");
    return; // hentikan fungsi jika input kosong
}

// 3.3 createElement("li") -> membuat element HTML baru <li> hanya di memori Javascript

const liBaru = document.createElement("li");
liBaru.className = "note-item"; // memberi class agar tampilannya sesuai style CSS

// 3.4 Mengisi teks catatan baru dengan cara innerHTML mengisi <li> dengan teks dan tombol hapus
// Tanda backtick (`) digunakan agar kita bisa menulis teks multi-baris dan menyisipkan variable dengan ${namaVariable}
liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`;

// 3.5 Menambahkan Event Listener pada tombol hapus pada item  <li>
// querySelector(".btn-hapus") -> mengambil tombol hapus yang baru dibuat di dalam <li>
const btnHapus = liBaru.querySelector(".btn-hapus");
btnHapus.addEventListener("click", function() {
    // Menghapus <li> dari daftarCatatan (<lu>)
    liBaru.remove(); // Menghapus element <li> dari DOM .remove()
    totalCatatan--; // mengurangi jumlah catatan
    perbaruiJumlah(); // Memperbarui tampilan jumlah catatan
    console.log(`DOM Catatan "${isiTeks}" telah dihapus`);

})


// 3.6 .appendChild(liBaru) -> menempelkan <li> baru ke dalam <ul> daftarCatatan
daftarCatatan.appendChild(liBaru);

// 3.7 Mengosongkan input setelah catatan ditambahkan
inputCatatan.value = "";

// 3.8 Menambahkan jumlah catatan dan memperbarui tampilan jumlah catatan
totalCatatan++;
perbaruiJumlah();

console.log(`DOM Catatan baru ditambahkan : "${isiTeks}"`);
}

// Langkah 4 : Event Listener untuk tombol tambah catatan 
// ketika tombol tambah diklik, jalankan fungsi TambahCatatan
btnTambah.addEventListener("click", function() {
    tambahCatatan();

});

// langkah 5 : Event Listener untuk menambahkan catatan ketika menekan tombol "Enter" di inputCatatan
inputCatatan.addEventListener("keyup", function(event){
    if (event.key === "Enter") {
        tambahCatatan();
    }
});

