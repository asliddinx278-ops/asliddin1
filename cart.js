const tg = window.Telegram.WebApp;
tg.expand();
let cart = JSON.parse(localStorage.getItem('cart')||'[]');

function render(){
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('total');
  if(!cart.length){list.innerHTML='<p>Savat bo‘sh</p>';totalEl.textContent='';return;}
  let html=''; let sum=0;
  cart.forEach(it=>{
    const sub = it.price*it.qty;
    sum+=sub;
    // rasm file_id orqali
    html+=`
      <div class="cart-item">
        <img src="https://api.telegram.org/file/bot<YOUR_BOT_TOKEN>/${it.file_id}" alt="${it.name}" onerror="this.src='https://i.imgur.com/food.jpg'">
        <div>
          <h4>${it.name}</h4>
          <p>${it.price.toLocaleString()} × ${it.qty}</p>
        </div>
        <strong>${sub.toLocaleString()} so‘m</strong>
        <button onclick="removeItem(${it.id})">❌</button>
      </div>`;
  });
  list.innerHTML=html;
  totalEl.textContent=`Jami: ${sum.toLocaleString()} so‘m`;
}
render();

document.getElementById('checkoutBtn').onclick=()=>{
  if(!cart.length){alert("Savat bo‘sh!");return;}
  const order = {items:cart, total:cart.reduce((s,i)=>s+i.price*i.qty,0)};
  tg.sendData(JSON.stringify(order));
};
function removeItem(id){
  cart=cart.filter(i=>i.id!==id);
  localStorage.setItem('cart',JSON.stringify(cart));
  render();
};

document.getElementById('themeBtn').onclick=()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
};
