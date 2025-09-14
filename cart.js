const tg = window.Telegram.WebApp;

let cart = JSON.parse(localStorage.getItem('cart')||'[]');
export { cart };

export function saveCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
  updateBadge();
}

export function updateBadge(){
  const total = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cartBadge') && (document.getElementById('cartBadge').textContent = total||'');
}

export function addToCart(id,name,price,qty){
  const exist = cart.find(i=>i.id==id);
  if(exist) exist.qty += qty;
  else cart.push({id,name,price,qty});
  saveCart();
  tg.HapticFeedback.impactLight();
}

export function renderCart(){
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('total');
  if(!cart.length){list.innerHTML='<p class="empty">Savat bo‘sh</p>';totalEl.textContent='';return;}
  let html=''; let sum=0;
  cart.forEach(it=>{
    const sub = it.price*it.qty;
    sum+=sub;
    html+=`
      <div class="cart-item glass">
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

window.removeItem = id=>{
  cart=cart.filter(i=>i.id!=id);
  saveCart(); renderCart();
};

document.getElementById('checkoutBtn')?.addEventListener('click',()=>{
  if(!cart.length){alert("Savat bo‘sh!");return;}
  const order = {items:cart, total:cart.reduce((s,i)=>s+i.price*i.qty,0)};
  tg.sendData(JSON.stringify(order));
});
