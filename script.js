// ===================================
// BAGIAN DATA APLIKASI
// ===================================

const USER_CREDENTIALS = {
    username: 'pengguna',
    password: '123'
};

let isAuthenticated = false;
let CART = [];

// Data Produk dengan Rating dan Image
const PRODUCTS = [
    // Menu Andalan 1
    { id: 1, name: 'Kopi Susu Viral', price: 18000, category: 'Kopi', image: 'img/kopi2.jpeg', rating: 4.8 },
    // Menu Andalan 2
    { id: 2, name: 'Americano Dingin', price: 15000, category: 'Kopi', image: 'img/americanoS.jpeg', rating: 4.5 },
    // Menu Andalan 3
    { id: 3, name: 'Indomie Rendang Maut', price: 12000, category: 'Makanan', image: 'img/rendang.jpeg', rating: 4.9 },
    // Produk Lainnya
    { id: 4, name: 'Roti Bakar Keju', price: 10000, category: 'Camilan', image: 'img/roti.jpeg', rating: 4.3 },
    { id: 5, name: 'liong', price: 4000, category: 'Kopi', image: 'img/liong.jpeg', rating: 4.5 },
    { id: 6, name: 'ES kopi', price: 4000, category: 'Kopi', image: 'img/eskopi.jpeg', rating: 4.5 },
    { id: 7, name: 'Indomie Telor', price: 12000, category: 'Makanan', image: 'img/soto.jpeg', rating: 4.9 },
    { id: 8, name: 'Indomie ', price: 12000, category: 'Makanan', image: 'img/indomie.jpeg', rating: 4.9 },
    { id: 9, name: 'ES Teh ', price: 5000, category: 'Non Kopi', image: 'img/teh.jpeg', rating: 4.6 },
    { id: 10, name: ' Teh ', price: 5000, category: 'Non Kopi', image: 'img/tehP.jpeg', rating: 4.6 },
    { id: 11, name: ' susu murni ', price: 5000, category: 'Non Kopi', image: 'img/susu.jpeg', rating: 4.6 },
];

// ===================================
// FUNGSI UTILITY
// ===================================

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

/**
 * Fungsi Keranjang UNIVERSAL (Mobile & Desktop/iPad)
 */
function updateCartCount() {
    const totalItems = CART.reduce((sum, item) => sum + item.quantity, 0);
    
    // 1. Target untuk badge Desktop/Tablet
    const desktopCartCount = document.getElementById('cart-count');
    if (desktopCartCount) {
        desktopCartCount.textContent = totalItems;
    }
    
    // 2. Target untuk badge Mobile
    const mobileCartCount = document.getElementById('cart-count-mobile');
    if (mobileCartCount) {
        mobileCartCount.textContent = totalItems;
        // Sembunyikan jika kosong, tampilkan jika ada isinya
        if (totalItems > 0) {
             mobileCartCount.classList.remove('hidden');
        } else {
             mobileCartCount.classList.add('hidden');
        }
    }
}

/**
 * 🆕 FUNGSI BARU: Memperbarui teks pada tombol checkout di halaman produk.
 */
function updateCheckoutButton() {
    const total = CART.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Kita target class baru yang ditambahkan di renderProduct
    const checkoutButton = document.querySelector('.product-checkout-button'); 

    if (checkoutButton) {
        checkoutButton.textContent = `Selesai Belanja, Lanjut ke Pembayaran (${formatRupiah(total)})`;
    }
}

function createStarRatingHtml(rating) {
    // Fungsi sederhana untuk menampilkan rating (ex: 4.8)
    return `
        <span class="text-yellow-500 font-bold">${rating}</span>
    `;
}

function getAboutUsPreviewHtml() {
    return `
        <section class="mb-12 py-10 bg-coffee-bg rounded-xl shadow-inner">
            <h2 class="text-3xl font-bold text-coffee-dark text-center mb-8 border-b-2 border-coffee-accent pb-2 w-max mx-auto">🏠 Sedikit Tentang Kami</h2>
            <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
                <div class="md:w-1/2">
                    <img src="img/warkop.jpeg" alt="Eksterior Warkop51" class="rounded-lg shadow-xl w-full h-72 object-cover">
                </div>
                <div class="md:w-1/2 text-center md:text-left">
                    <p class="text-gray-700 text-lg mb-4">
                        Warkop51 bukan sekadar kedai kopi biasa. Kami adalah titik kumpul komunitas yang menyajikan **kopi lokal terbaik** dan **makanan warkop legendaris** dengan sentuhan modern.
                    </p>
                    <p class="text-gray-700 mb-6">
                        Kami berkomitmen untuk menyediakan tempat yang **hangat, ramah**, dan pastinya **WiFi kencang** untuk semua.
                    </p>
                    <a href="#" data-page="about" 
                        class="nav-link bg-coffee-dark hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105 inline-flex items-center">
                        Pelajari Filosofi Kami →
                    </a>
                </div>
            </div>
        </section>
    `;
}

// ===================================
// FUNGSI RENDERING HALAMAN
// ===================================

function renderHome() {
    // Ambil 3 menu andalan (dianggap 3 produk pertama)
    const featuredProducts = PRODUCTS.slice(0, 3);
    
    // Map produk andalan ke HTML card baru dengan FOTO dan RATING
    const featuredMenuHtml = featuredProducts.map(product => `
        <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
            <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover rounded-t-xl">
            <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-coffee-dark mb-1">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-3">(${product.category})</p>
                
                <div class="flex justify-center items-center mb-4">
                    <span class="text-lg text-yellow-500 mr-2">
                        ${createStarRatingHtml(product.rating)}
                    </span>
                    <span class="text-gray-700 font-semibold">
                        (${product.rating}/5)
                    </span>
                </div>
                
                <p class="text-coffee-accent font-extrabold text-lg">${formatRupiah(product.price)}</p>
            </div>
        </div>
    `).join('');
    
    return `
        <header class="text-center py-20 mb-12 bg-cover bg-center rounded-xl shadow-xl"
            style="background-image: url('img/warkop2.jpeg');">
            <div class="bg-coffee-dark bg-opacity-70 p-8 rounded-lg inline-block">
                <h1 class="text-5xl font-extrabold text-white mb-4">Selamat Datang di Warkop51! ☕</h1>
                <p class="text-xl text-coffee-light font-medium mb-8">Tempat Kopi Terbaik dan Komunitas Paling Hangat.</p>
                <a href="#" data-page="product" 
                    class="nav-link bg-coffee-accent hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Lihat Menu Kami
                </a>
            </div>
        </header>
        
        ${getAboutUsPreviewHtml()}
        <section class="mb-12">
            <h2 class="text-3xl font-bold text-coffee-dark text-center mb-8 border-b-2 border-coffee-accent pb-2">⭐ Menu Andalan Kami</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${featuredMenuHtml}
            </div>
        </section>
        
        `;
}

// 🔄 MODIFIKASI: Menambahkan class 'product-checkout-button'
function renderProduct(searchTerm = '') {
    // 1. Filter produk berdasarkan searchTerm (jika ada)
    const filteredProducts = filterProducts(searchTerm);

    // 2. Buat HTML untuk daftar produk yang sudah difilter
    const productListHtml = filteredProducts.map(product => `
        <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col hover:shadow-xl transition duration-300">
            <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover rounded-lg mb-4">
            <span class="text-xs font-semibold text-coffee-light bg-coffee-dark px-2 py-1 rounded-full w-max mb-2">${product.category}</span>
            <h3 class="text-2xl font-bold text-coffee-dark">${product.name}</h3>
            <div class="flex items-center mb-2">
                <span class="text-sm text-yellow-500 mr-2 font-semibold">Rating: ${product.rating}</span>
            </div>
            <p class="text-coffee-accent font-extrabold text-lg mt-auto mb-4">${formatRupiah(product.price)}</p>
            <button onclick="addToCart(${product.id})"
                class="bg-coffee-accent hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Tambah ke Keranjang
            </button>
        </div>
    `).join('');

    const noResultsHtml = `
        <div class="text-center py-10 col-span-full">
            <p class="text-2xl text-gray-500">😔 Tidak ada menu yang ditemukan untuk **"${searchTerm}"**.</p>
        </div>
    `;

    // 3. Gabungkan HTML input pencarian dengan daftar produk
    return `
        <h2 class="text-4xl font-bold text-coffee-dark mb-10 text-center">Menu Kami</h2>
        
        <div class="mb-8 max-w-lg mx-auto">
            <input type="text" id="product-search-input" oninput="searchProducts(this.value)"
                    placeholder="Cari menu (ex: Kopi, Indomie, Roti)" value="${searchTerm}"
                    class="w-full p-4 border-2 border-coffee-light rounded-xl focus:outline-none focus:border-coffee-accent transition duration-150 text-lg shadow-inner">
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="product-list-container">
            ${filteredProducts.length > 0 ? productListHtml : noResultsHtml}
        </div>
        
        <div class="mt-10 text-center">
            <a href="#" data-page="checkout" 
                class="nav-link bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 text-lg product-checkout-button">
                Selesai Belanja, Lanjut ke Pembayaran (${formatRupiah(CART.reduce((sum, item) => sum + item.price * item.quantity, 0))})
            </a>
        </div>
    `;
}

function renderAboutUs() {
    return `
        <div class="bg-white p-8 md:p-12 rounded-xl shadow-xl">
            <h2 class="text-4xl font-bold text-coffee-dark mb-6 text-center">Tentang Warkop51</h2>
            
            <div class="grid md:grid-cols-2 gap-8 items-center mb-10">
                <img src="img/warkop.jpeg" alt="Interior Warkop51" class="rounded-lg shadow-md w-full h-72 object-cover">
                <div>
                    <h3 class="text-2xl font-semibold text-coffee-accent mb-3">Filosofi Kami</h3>
                    <p class="text-gray-700 mb-4">
                        Warkop51 didirikan pada tahun 2024 dengan satu tujuan sederhana: menjadi tempat singgah yang hangat. Kami percaya bahwa kopi dan makanan adalah katalis untuk percakapan, ide, dan komunitas.
                    </p>
                    <p class="text-gray-700">
                        Kami tidak hanya menyajikan kopi premium dan indomie terbaik, tetapi juga menyediakan ruang di mana setiap orang, dari gamer hingga pebisnis, merasa diterima.
                    </p>
                </div>
            </div>

            <h3 class="text-3xl font-bold text-coffee-dark mt-10 mb-6 text-center border-b-2 border-coffee-light pb-2">Komitmen Kami</h3>
            <ul class="space-y-4 text-gray-700">
                <li class="flex items-start">
                    <span class="text-coffee-accent text-2xl mr-3">✓</span>
                    <div>
                        <span class="font-semibold text-coffee-dark">Kualitas Bahan Terbaik:</span> Kami hanya menggunakan biji kopi lokal terbaik dan bahan-bahan segar.
                    </div>
                </li>
                <li class="flex items-start">
                    <span class="text-coffee-accent text-2xl mr-3">✓</span>
                    <div>
                        <span class="font-semibold text-coffee-dark">Komunitas Ramah:</span> Menciptakan lingkungan yang inklusif dan menyenangkan untuk semua pelanggan.
                    </div>
                </li>
                <li class="flex items-start">
                    <span class="text-coffee-accent text-2xl mr-3">✓</span>
                    <div>
                        <span class="font-semibold text-coffee-dark">Harga Kaki Lima, Rasa Bintang Lima:</span> Kualitas premium tanpa menguras dompet Anda.
                    </div>
                </li>
            </ul>
        </div>
    `;
}

function renderComplaint() {
    return `
        <div class="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 class="text-4xl font-bold text-coffee-dark mb-6 text-center">Saran & Kritik</h2>
            <p class="text-gray-600 mb-8 text-center">
                Kami sangat menghargai masukan Anda. Gunakan formulir di bawah ini untuk menyampaikan kritik, saran, atau pujian!
            </p>
            <form id="complaint-form" class="space-y-6">
                <div>
                    <label for="complainant-name" class="block text-gray-700 font-semibold mb-2">Nama Anda (Opsional)</label>
                    <input type="text" id="complainant-name" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-coffee-accent transition duration-150">
                </div>
                <div>
                    <label for="complainant-email" class="block text-gray-700 font-semibold mb-2">Email (Opsional)</label>
                    <input type="email" id="complainant-email" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-coffee-accent transition duration-150">
                </div>
                <div>
                    <label for="complaint-type" class="block text-gray-700 font-semibold mb-2">Jenis Masukan</label>
                    <select id="complaint-type" class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-coffee-accent transition duration-150">
                        <option>Saran Menu</option>
                        <option>Kritik Layanan</option>
                        <option>Komentar Kebersihan</option>
                        <option>Pujian</option>
                        <option>Lain-lain</option>
                    </select>
                </div>
                <div>
                    <label for="complaint-text" class="block text-gray-700 font-semibold mb-2">Pesan Anda</label>
                    <textarea id="complaint-text" rows="5" required 
                                     class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-coffee-accent transition duration-150" placeholder="Jelaskan masukan Anda di sini..."></textarea>
                </div>
                <button type="submit" 
                                     class="bg-coffee-accent hover:bg-orange-700 text-white font-bold py-3 rounded-lg w-full shadow-md transition duration-200">
                    Kirim Masukan
                </button>
                <p id="complaint-status" class="text-green-600 text-center mt-4 hidden font-semibold">Terima kasih atas masukan Anda! Kami akan memprosesnya.</p>
            </form>
        </div>
    `;
}

function renderContact() {
    return `
        <div class="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-3xl mx-auto">
            <h2 class="text-4xl font-bold text-coffee-dark mb-6 text-center">Hubungi Kami</h2>
            <p class="text-gray-600 mb-8 text-center">
                Punya pertanyaan atau ingin reservasi tempat? Jangan ragu untuk menghubungi kami melalui saluran di bawah ini.
            </p>

            <div class="grid md:grid-cols-3 gap-8 text-center">
                <div class="p-6 border-2 border-coffee-light rounded-lg hover:bg-coffee-bg transition duration-300">
                    <p class="text-4xl mb-3">📞</p>
                    <h3 class="font-bold text-coffee-dark text-xl mb-2">Telepon</h3>
                    <p class="text-coffee-accent font-semibold">(021) 555-5151</p>
                </div>
                <div class="p-6 border-2 border-coffee-light rounded-lg hover:bg-coffee-bg transition duration-300">
                    <p class="text-4xl mb-3">📧</p>
                    <h3 class="font-bold text-coffee-dark text-xl mb-2">Email</h3>
                    <p class="text-coffee-accent font-semibold">halo@warkop51.com</p>
                </div>
                <div class="p-6 border-2 border-coffee-light rounded-lg hover:bg-coffee-bg transition duration-300">
                    <p class="text-4xl mb-3">📍</p>
                    <h3 class="font-bold text-coffee-dark text-xl mb-2">Alamat</h3>
                    <p class="text-coffee-accent font-semibold">Jl. Kopi Sejati No. 51, Jakarta</p>
                </div>
            </div>

            <div class="mt-10">
                <h3 class="text-2xl font-bold text-coffee-dark mb-4 text-center">Jam Operasional</h3>
                <p class="text-center text-lg text-gray-700">
                    Senin - Minggu: <span class="font-bold text-coffee-accent">10.00 - 24.00 WIB</span> (Buka Setiap Hari)
                </p>
            </div>
        </div>
    `;
}

function renderCheckout() {
    if (CART.length === 0) {
        return `
            <div class="text-center py-10 bg-white rounded-xl shadow-xl">
                <h2 class="text-3xl font-bold text-coffee-dark mb-4">Keranjang Anda Kosong 😢</h2>
                <p class="text-gray-600 mb-6">Yuk, segera pilih menu andalanmu!</p>
                <a href="#" data-page="product" 
                    class="nav-link bg-coffee-accent hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
                    Lihat Menu
                </a>
            </div>
        `;
    }

    const total = CART.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const cartItemsHtml = CART.map(item => `
        <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <div class="flex items-center">
                <span class="text-xl text-coffee-accent mr-3 font-bold">${item.quantity}x</span>
                <span class="font-semibold text-coffee-dark">${item.name}</span>
            </div>
            <div class="flex items-center">
                <span class="text-gray-600 mr-4">${formatRupiah(item.price * item.quantity)}</span>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700 transition duration-150">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    `).join('');

    return `
        <div class="bg-white p-8 md:p-12 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h2 class="text-4xl font-bold text-coffee-dark mb-8 text-center">Detail Pesanan Anda</h2>
            <div class="mb-6 space-y-4">
                ${cartItemsHtml}
            </div>
            <div class="flex justify-between items-center pt-4 border-t-2 border-coffee-dark">
                <span class="text-2xl font-bold text-coffee-dark">Total Pembayaran:</span>
                <span class="text-2xl font-extrabold text-coffee-accent">${formatRupiah(total)}</span>
            </div>
            
            <form id="checkout-form" class="mt-8 space-y-4">
                <h3 class="text-xl font-bold text-coffee-dark">Informasi Pembayaran</h3>
                <input type="text" placeholder="Nama Pemesan" required class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-coffee-accent transition duration-150">
                <select id="payment-method" required class="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-coffee-accent transition duration-150">
                    <option value="">Pilih Metode Pembayaran</option>
                    <option value="Cash">Cash (Tunai di Tempat)</option>
                    <option value="Transfer">Transfer Bank (BCA)</option>
                    <option value="QRIS">QRIS</option>
                </select>
                <button type="submit"
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg w-full shadow-md transition duration-200">
                    Konfirmasi Pembayaran
                </button>
                <p id="checkout-status" class="text-green-600 text-center mt-4 hidden font-semibold">Memproses pesanan...</p>
            </form>

            <button onclick="goToPage('product')" class="mt-4 w-full text-center text-sm text-gray-500 hover:text-coffee-dark transition">
                ← Tambah Pesanan Lain
            </button>
        </div>
    `;
}

// 🆕 FUNGSI BARU: renderReceipt
function renderReceipt() {
    // Menyimpan cart untuk struk sebelum di-reset
    const currentCart = [...CART]; 
    
    if (currentCart.length === 0) {
        return `
            <div class="text-center py-10 bg-white rounded-xl shadow-xl">
                <h2 class="text-3xl font-bold text-coffee-dark mb-4">Struk Kosong</h2>
                <p class="text-gray-600 mb-6">Silakan lakukan pemesanan terlebih dahulu.</p>
                <a href="#" data-page="product" 
                    class="nav-link bg-coffee-accent hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
                    Lihat Menu
                </a>
            </div>
        `;
    }

    const total = currentCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxRate = 0.10; // PPN 10%
    const taxAmount = total * taxRate;
    const grandTotal = total + taxAmount;
    // ID transaksi unik sederhana
    const transactionId = 'W51-' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const receiptItemsHtml = currentCart.map(item => `
        <div class="flex justify-between text-gray-700 text-sm">
            <span class="w-1/2">${item.name}</span>
            <span class="w-1/6 text-center">${item.quantity}</span>
            <span class="w-1/3 text-right">${formatRupiah(item.price * item.quantity)}</span>
        </div>
    `).join('');

    return `
        <div class="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg mx-auto transform transition duration-500 hover:scale-[1.01] border-4 border-coffee-accent">
            <div class="text-center mb-6 border-b pb-4">
                <h2 class="text-3xl font-extrabold text-coffee-dark mb-2">Struk Pembayaran</h2>
                <p class="text-sm text-gray-500">Warkop51 - Kopi dan Komunitas</p>
                <p class="text-xs text-gray-400 mt-2">ID Transaksi: <span class="font-mono font-semibold text-coffee-dark">${transactionId}</span></p>
                <p class="text-xs text-gray-400">Tanggal: ${new Date().toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
            </div>

            <div class="space-y-3 mb-6 font-semibold border-b pb-3 border-dashed">
                <div class="flex justify-between text-coffee-dark font-bold text-base">
                    <span class="w-1/2">Menu</span>
                    <span class="w-1/6 text-center">Qty</span>
                    <span class="w-1/3 text-right">Subtotal</span>
                </div>
                <hr class="border-t border-dashed border-gray-300">
                ${receiptItemsHtml}
            </div>

            <div class="space-y-2 mb-6 text-base">
                <div class="flex justify-between text-gray-700">
                    <span>Subtotal (Item)</span>
                    <span class="font-semibold">${formatRupiah(total)}</span>
                </div>
                <div class="flex justify-between text-gray-700">
                    <span>PPN (10%)</span>
                    <span class="font-semibold">${formatRupiah(taxAmount)}</span>
                </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t-4 border-coffee-dark">
                <span class="text-2xl font-bold text-coffee-dark">TOTAL AKHIR</span>
                <span class="text-2xl font-extrabold text-green-600">${formatRupiah(grandTotal)}</span>
            </div>

            <div class="mt-8 text-center pt-4 border-t border-dashed">
                <p class="text-gray-600 text-sm mb-4">Terima kasih telah berkunjung di Warkop51!</p>
                <a href="#" data-page="product" 
                    class="nav-link bg-coffee-dark hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-lg">
                    Kembali ke Menu Utama
                </a>
            </div>
        </div>
    `;
}

// ===================================
// FUNGSI LOGIKA (PENCARIAN, KERANJANG, DLL.)
// ===================================

// 🔄 MODIFIKASI: Menambahkan updateCheckoutButton()
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const cartItem = CART.find(item => item.id === productId);

    if (product) {
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            CART.push({ ...product, quantity: 1 });
        }
    }
    updateCartCount();
    updateCheckoutButton(); // 🚀 Memperbarui tombol checkout di halaman produk
}

// 🔄 MODIFIKASI: Menambahkan updateCheckoutButton()
function removeFromCart(productId) {
    const cartIndex = CART.findIndex(item => item.id === productId);
    if (cartIndex > -1) {
        if (CART[cartIndex].quantity > 1) {
            CART[cartIndex].quantity -= 1;
        } else {
            CART.splice(cartIndex, 1);
        }
    }
    updateCartCount();
    updateCheckoutButton(); // 🚀 Memperbarui tombol checkout di halaman produk
    // Refresh halaman checkout setelah item dihapus
    goToPage('checkout'); 
}

function filterProducts(searchTerm) {
    if (!searchTerm) {
        return PRODUCTS;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    return PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
}

// 🔄 MODIFIKASI: Menambahkan updateCheckoutButton()
function searchProducts(searchTerm) {
    const filteredProducts = filterProducts(searchTerm);

    // Buat HTML untuk produk yang difilter
    const productListHtml = filteredProducts.map(product => `
        <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col hover:shadow-xl transition duration-300">
            <img src="${product.image}" alt="${product.name}" class="w-full h-72 object-cover rounded-lg mb-4">
            <span class="text-xs font-semibold text-coffee-light bg-coffee-dark px-2 py-1 rounded-full w-max mb-2">${product.category}</span>
            <h3 class="text-2xl font-bold text-coffee-dark">${product.name}</h3>
            <div class="flex items-center mb-2">
                <span class="text-sm text-yellow-500 mr-2 font-semibold">Rating: ${product.rating}</span>
            </div>
            <p class="text-coffee-accent font-extrabold text-lg mt-auto mb-4">${formatRupiah(product.price)}</p>
            <button onclick="addToCart(${product.id})"
                class="bg-coffee-accent hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Tambah ke Keranjang
            </button>
        </div>
    `).join('');

    const noResultsHtml = `
        <div class="text-center py-10 col-span-full">
            <p class="text-2xl text-gray-500">😔 Tidak ada menu yang ditemukan untuk **"${searchTerm}"**.</p>
        </div>
    `;

    const productGridContainer = document.getElementById('product-list-container');
    if (productGridContainer) {
        productGridContainer.innerHTML = filteredProducts.length > 0 ? productListHtml : noResultsHtml;
    }

    updateCheckoutButton(); // 🚀 Memperbarui tombol checkout setelah pencarian/render ulang
}


function goToPage(pageId) {
    const contentContainer = document.getElementById('content-container');
    let contentHtml = '';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-coffee-accent');
        if (link.dataset.page === pageId) {
            link.classList.add('text-coffee-accent');
        }
    });

    switch (pageId) {
        case 'home': contentHtml = renderHome(); break;
        case 'product': contentHtml = renderProduct(); break; 
        case 'complaint': contentHtml = renderComplaint(); break;
        case 'contact': contentHtml = renderContact(); break;
        case 'checkout': contentHtml = renderCheckout(); break;
        case 'about': contentHtml = renderAboutUs(); break;
        case 'receipt': contentHtml = renderReceipt(); break; // 🆕 Kasus untuk Struk Pembayaran
        default: contentHtml = renderHome();
    }
    
    contentContainer.innerHTML = contentHtml;
    window.scrollTo(0, 0);

    // Event Listener untuk Form Keluhan (TETAP SAMA)
    if (pageId === 'complaint') {
        document.getElementById('complaint-form').addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('complaint-status').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('complaint-status').classList.add('hidden');
                e.target.reset();
            }, 3000);
        });
    }

    // 🆕 Event Listener untuk Form Checkout (Diubah untuk Struk)
    if (pageId === 'checkout') {
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulasikan proses pembayaran
            document.getElementById('checkout-status').textContent = 'Memproses pesanan...';
            document.getElementById('checkout-status').classList.remove('hidden');

            // Set timeout untuk simulasi loading
            setTimeout(() => {
                // Pergi ke halaman Struk Pembayaran
                goToPage('receipt'); 
                
                // Bersihkan Keranjang setelah struk ditampilkan
                CART = [];
                updateCartCount();
                updateCheckoutButton(); // Pastikan tombol di halaman produk di-reset ke Rp 0
                
            }, 1500); 
        });
    }

    // Panggil updateCheckoutButton() juga di goToPage saat masuk ke halaman produk 
    // untuk memastikan teksnya benar saat pertama kali dimuat/diganti halaman.
    if (pageId === 'product') {
        updateCheckoutButton(); 
    }
}

// ===================================
// INTI APLIKASI & EVENT LISTENERS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const loginError = document.getElementById('login-error');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // 1. Logic Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
                isAuthenticated = true;
                loginScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
                loginError.classList.add('hidden');
                goToPage('home'); 
            } else {
                loginError.classList.remove('hidden');
            }
        });
    }


    // 2. Logic Logout
    const handleLogout = () => {
        isAuthenticated = false;
        loginScreen.classList.remove('hidden');
        mainApp.classList.add('hidden');
        CART = [];
        updateCartCount();
        updateCheckoutButton(); // Pastikan di-reset saat logout
        alert('Anda telah keluar.');
    };

    if (document.getElementById('logout-button')) {
        document.getElementById('logout-button').addEventListener('click', handleLogout);
    }
    if (document.getElementById('logout-button-mobile')) {
        document.getElementById('logout-button-mobile').addEventListener('click', handleLogout);
    }

    // 3. Logic Navigasi
    document.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link[data-page]')) {
            e.preventDefault();
            const pageId = e.target.dataset.page;
            goToPage(pageId);
        }
    });

    // 4. Logic Mobile Menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 5. Inisialisasi: Tampilkan layar login jika belum terautentikasi
    if (!isAuthenticated) {
        loginScreen.classList.remove('hidden');
        mainApp.classList.add('hidden');
    } else {
        loginScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
        goToPage('home'); // Muat halaman utama
    }
    
    // Pastikan count keranjang ter-update saat load
    updateCartCount(); 
});