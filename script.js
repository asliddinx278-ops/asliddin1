// Asosiy funksiyalar
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageName + '-page').classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`.nav-btn[onclick="showPage('${pageName}')"]`).classList.add('active');
}

// Sahifa yuklanganda
window.onload = function() {
    // Test ma'lumotlar
    const categories = ["Fast Food", "Ovqatlar", "Ichimliklar", "Shirinliklar"];
    
    const container = document.getElementById('categories-container');
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.textContent = category;
        card.onclick = () => alert('Kategoriya tanlandi: ' + category);
        container.appendChild(card);
    });
};
