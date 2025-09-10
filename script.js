// Global o'zgaruvchilar
let cart = [];
let currentCategory = null;
let productsData = [];
let categoriesData = [];
let currentUser = null;

// Telegram WebApp API
if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.setBackgroundColor('#667eea');
    window.Telegram.WebApp.setHeaderColor('#667eea');
    
    // Foydalanuvchi ma'lumotlarini olish
    if (window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
        currentUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (document.getElementById('customer-name')) {
            document.getElementById('customer-name').value = currentUser.first_name + (currentUser.last_name ? ' ' + currentUser.last_name : '');
        }
    }
}

// Namuna ma'lumotlar
const sampleCategories = [
    "Fast Food",
    "Ovqatlar", 
    "Ichimliklar",
    "Shirinliklar",
    "Salatlar"
];

const sampleProducts = [
    // Fast Food
    {id: 1, name: "Lavash Classic", description: "Go'shtli lavash, pomidor, bodring", price: 25000, category: "Fast Food", image: "lavash"},
    {id: 2, name: "Double Cheeseburger", description: "Ikki hissa go'sht, ikki pishloq", price: 32000, category: "Fast Food", image: "burger"},
    {id: 3, name: "Fri Kartoshka", description: "Qovurilgan kartoshka", price: 15000, category: "Fast Food", image: "fries"},
    {id: 4, name: "Hot Dog", description: "Sosiska, non, mayonez", price: 18000, category: "Fast Food", image: "hotdog"},
    
    // Ovqatlar
    {id: 5, name: "Osh", description: "Mazali o'zbek oshi", price: 28000, category: "Ovqatlar", image: "osh"},
    {id: 6, name: "Manti", description: "Bug'da manti, sarimsoq", price: 22000, category: "Ovqatlar", image: "manti"},
    {id: 7, name: "Sho'rva", description: "Qo'y sho'rva", price: 20000, category: "Ovqatlar", image: "shorva"},
    {id: 8, name: "Lag'mon", description: "Uy lag'moni", price: 25000, category: "Ovqatlar", image: "lagmon"},
    
    // Ichimliklar
    {id: 9, name: "Coca Cola", description: "1.5L gazli ichimlik", price: 12000, category: "Ichimliklar", image: "cola"},
    {id: 10, name: "Fanta", description: "Apelsinli ichimlik", price: 12000, category: "Ichimliklar", image: "fanta"},
    {id: 11, name: "Choy Qora", description: "Tabiiy qora choy", price: 5000, category: "Ichimliklar", image: "tea"},
    {id: 12, name: "Ko'cha", description: "Sutli ko'cha", price: 8000, category: "Ichimliklar", image: "coffee"},
    
    // Shirinliklar
    {id: 13, name: "Medovik", description: "Asal-pishloqli tort", price: 18000, category: "Shirinliklar", image: "medovik"},
    {id: 14, name: "Napoleon", description: "Kremli tort", price: 20000, category: "Shirinliklar", image: "napoleon"},
    {id: 15, name: "Chizkeyk", description: "Qulupnayli chizkeyk", price: 22000, category: "Shirinliklar", image: "cheesecake"},
    {id: 16, name: "Muzqaymoq", description: "Vanilli muzqaymoq", price: 12000, category: "Shirinliklar", image: "icecream"},
    
    // Salatlar
    {id: 17, name: "Olivye", description: "Tuxumli salat", price: 15000, category: "Salatlar", image: "olivye"},
    {id: 18, name: "Sezar", description: "Tovuqli sezar salati", price: 18000, category: "Salatlar", image: "caesar"},
    {id: 19, name: "Moydanoq", description: "Moydanoqli salat", price: 12000, category: "Salatlar", image: "moydanoq"}
];

// Sahifa o'tish funksiyasi
function showPage(pageName) {
    // Barcha sahifalarni yashirish
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Tanlangan sahifani ko'rsatish
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Nav tugmalarini yangilash
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agar asosiy menyular bo'lsa, ularni belgilash
    if (pageName === 'menu' || pageName === 'cart' || pageName === 'orders') {
        document.querySelector(`.nav-btn[onclick="showPage('${pageName}')"]`).classList.add('active');
    }
    
    // Sahifaga qarab maxsus funksiyalar
    if (pageName === 'cart') {
        renderCart();
    } else if (pageName === 'orders') {
        renderOrders();
    } else if (pageName === 'menu') {
        loadCategories();
        loadProducts();
    }
}

// Kategoriyalarni yuklash
function loadCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    sampleCategories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.textContent = category;
        card.onclick = () => selectCategory(category);
        container.appendChild(card);
    });
}

// Kategoriyani tanlash
function selectCategory(category) {
    currentCategory = category;
    document.getElementById('selected-category').textContent = category + ' Mahsulotlari';
    loadProducts(category);
}

// Mahsulotlarni yuklash
function loadProducts(category = null) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    let productsToShow = category ? 
        sampleProducts.filter(p => p.category === category) : 
        sampleProducts;
    
    if (productsToShow.length === 0) {
        container.innerHTML = '<div class="empty-cart">Ushbu kategoriyada mahsulotlar yo\'q</div>';
        return;
    }
    
    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">${product.price.toLocaleString()} so'm</div>
            <button class="add-to-cart-btn" onclick="showQuantityModal(${product.id})">
                🛒 Poritsiya tanlash
            </button>
        `;
        container.appendChild(card);
    });
}

// Poritsiya tanlash modalini ko'rsatish
function showQuantityModal(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('quantity-modal');
    const content = document.getElementById('quantity-content');
    
    let quantity = 1;
    
    content.innerHTML = `
        <div class="quantity-selector">
            <div class="quantity-title">${product.name}</div>
            <div class="quantity-controls">
                <button class="quantity-btn-modal" onclick="updateQuantity(-1, ${productId})" id="minus-btn">-</button>
                <div class="quantity-display" id="quantity-display">1</div>
                <button class="quantity-btn-modal" onclick="updateQuantity(1, ${productId})" id="plus-btn">+</button>
            </div>
            <div class="product-price">Jami: <span id="total-price">${product.price.toLocaleString()}</span> so'm</div>
            <br>
            <button class="add-to-cart-modal" onclick="addToCart(${productId}, ${quantity})">
                🛒 Savatchaga qo'shish
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Global quantity ni saqlash
    window.currentQuantity = 1;
}

// Poritsiya miqdorini yangilash
function updateQuantity(change, productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    let newQuantity = window.currentQuantity + change;
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 50) newQuantity = 50; // Maksimal chegara
    
    window.currentQuantity = newQuantity;
    document.getElementById('quantity-display').textContent = newQuantity;
    document.getElementById('total-price').textContent = (product.price * newQuantity).toLocaleString();
    
    // Tugmalarni o'chirish/yoqish
    document.getElementById('minus-btn').disabled = newQuantity <= 1;
    document.getElementById('plus-btn').disabled = newQuantity >= 50;
}

// Savatchaga qo'shish
function addToCart(productId, quantity = null) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const actualQuantity = quantity || window.currentQuantity || 1;
    
    // Savatchada mavjudligini tekshirish
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += actualQuantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: actualQuantity
        });
    }
    
    updateCartCount();
    closeQuantityModal();
    showNotification(`${product.name} savatchaga qo'shildi!`);
}

// Savatcha sonini yangilash
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
    
    // Buyurtma tugmasini o'chirish/yoqish
    const orderBtn = document.getElementById('order-btn');
    if (orderBtn) {
        orderBtn.disabled = count === 0;
    }
}

// Savatchani ko'rsatish
function renderCart() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-cart">Savatcha bo\'sh</div>';
        if (totalElement) totalElement.textContent = '0';
        document.getElementById('order-btn').disabled = true;
        return;
    }
    
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">
                    <span>${item.price.toLocaleString()} so'm × ${item.quantity}</span>
                </div>
            </div>
            <div class="cart-item-price">${itemTotal.toLocaleString()} so'm</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
        container.appendChild(cartItem);
    });
    
    if (totalElement) totalElement.textContent = total.toLocaleString();
    document.getElementById('order-btn').disabled = false;
}

// Savatcha elementi miqdorini yangilash
function updateCartItemQuantity(index, change) {
    const item = cart[index];
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCartCount();
    renderCart();
}

// Savatchadan o'chirish
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
    showNotification('Mahsulot o\'chirildi');
}

// Buyurtma shaklini ko'rsatish
function showOrderForm() {
    showPage('order-form-page');
    renderOrderForm();
}

// Buyurtma shaklini to'ldirish
function renderOrderForm() {
    const itemsContainer = document.getElementById('order-summary-items');
    const totalElement = document.getElementById('order-total-amount');
    
    let total = 0;
    let itemsHtml = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHtml += `
            <div class="order-summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>${itemTotal.toLocaleString()} so'm</span>
            </div>
        `;
    });
    
    itemsContainer.innerHTML = itemsHtml;
    totalElement.textContent = total.toLocaleString();
    
    // Yetkazish turi o'zgarganda manzil maydonini ko'rsatish/yashirish
    const deliveryType = document.getElementById('delivery-type');
    const addressGroup = document.getElementById('address-group');
    
    if (deliveryType) {
        deliveryType.onchange = function() {
            addressGroup.style.display = this.value === 'delivery' ? 'block' : 'none';
        };
    }
    
    // Formani yuborish eventi
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.onsubmit = submitOrder;
    }
}

// Buyurtmani yuborish
function submitOrder(e) {
    e.preventDefault();
    
    const formData = {
        customerName: document.getElementById('customer-name').value,
        customerPhone: document.getElementById('customer-phone').value,
        deliveryType: document.getElementById('delivery-type').value,
        customerAddress: document.getElementById('customer-address').value,
        orderNotes: document.getElementById('order-notes').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    // Validatsiya
    if (!formData.customerName || !formData.customerPhone) {
        showNotification('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
        return;
    }
    
    if (formData.deliveryType === 'delivery' && !formData.customerAddress) {
        showNotification('Iltimos, manzilingizni kiriting!');
        return;
    }
    
    // Telegramga ma'lumot yuborish
    if (window.Telegram && window.Telegram.WebApp) {
        try {
            window.Telegram.WebApp.sendData(JSON.stringify(formData));
            showNotification('✅ Buyurtmangiz qabul qilindi!');
            
            // Savatchani tozalash
            cart = [];
            updateCartCount();
            
            // Bosh sahifaga qaytish
            setTimeout(() => {
                showPage('menu');
            }, 2000);
            
        } catch (error) {
            console.error('Xatolik:', error);
            showNotification('❌ Xatolik yuz berdi!');
        }
    } else {
        // Test rejimi
        alert('Buyurtma ma\'lumotlari:\n' + JSON.stringify(formData, null, 2));
        cart = [];
        updateCartCount();
        showPage('menu');
        showNotification('✅ Test buyurtma yaratildi!');
    }
}

// Buyurtmalarni ko'rsatish
function renderOrders() {
    const container = document.getElementById('orders-list');
    
    // Test buyurtmalar
    const sampleOrders = [
        {
            id: 'ORD-001',
            total: 65000,
            status: 'completed',
            date: '2024-01-15 14:30'
        },
        {
            id: 'ORD-002',
            total: 32000,
            status: 'pending',
            date: '2024-01-16 19:15'
        }
    ];
    
    if (sampleOrders.length === 0) {
        container.innerHTML = '<div class="empty-orders">Hozircha buyurtmalar yo\'q</div>';
        return;
    }
    
    container.innerHTML = '';
    
    sampleOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-header">
                <span class="order-id">🆔 ${order.id}</span>
                <span class="order-status">${order.status === 'completed' ? '✅ Tugallangan' : '⏳ Kutilmoqda'}</span>
            </div>
            <div class="order-total">💰 ${order.total.toLocaleString()} so'm</div>
            <div class="order-date">📅 ${order.date}</div>
        `;
        container.appendChild(orderItem);
    });
}

// Modalni yopish
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function closeQuantityModal() {
    document.getElementById('quantity-modal').style.display = 'none';
    window.currentQuantity = 1;
}

// Bildirishnoma ko'rsatish
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sahifa yuklanganda
window.onload = function() {
    loadCategories();
    loadProducts();
    updateCartCount();
    
    // Yetkazish turi o'zgarishini tinglash
    const deliveryType = document.getElementById('delivery-type');
    const addressGroup = document.getElementById('address-group');
    
    if (deliveryType && addressGroup) {
        deliveryType.onchange = function() {
            addressGroup.style.display = this.value === 'delivery' ? 'block' : 'none';
        };
    }
};

// Orqaga tugmasi uchun Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeQuantityModal();
    }
});