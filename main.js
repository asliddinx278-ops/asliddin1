/* ----------  FULL MENU (35 ta)  ---------- */
const FULL_MENU = {
  osh: [
    {id:1, name:"G‘ijduvoncha osh",   price:25000, file_id:"AgACAgIAAxkBAAIE3WjGnhUgUMveDKgf-tQtZ0YF6WoDAALP-jEbpzswSlnSGHNzvdsRAQADAgADdwADNgQ"},
    {id:2, name:"Farg‘ona osh",       price:27000, file_id:"AgACAgIAAxkBAAIE3WjGnhUgUMveDKgf-tQtZ0YF6WoDAALP-jEbpzswSlnSGHNzvdsRAQADAgADdwADNgQ"},
    {id:3, name:"Toshkentcha osh",    price:26000, file_id:"AgACAgIAAxkBAAIE3WjGnhUgUMveDKgf-tQtZ0YF6WoDAALP-jEbpzswSlnSGHNzvdsRAQADAgADdwADNgQ"},
    {id:4, name:"Qovurma osh",        price:28000, file_id:"AgACAgIAAxkBAAIE3WjGnhUgUMveDKgf-tQtZ0YF6WoDAALP-jEbpzswSlnSGHNzvdsRAQADAgADdwADNgQ"},
    {id:5, name:"Toy osh",            price:35000, file_id:"AgACAgIAAxkBAAIE3WjGnhUgUMveDKgf-tQtZ0YF6WoDAALP-jEbpzswSlnSGHNzvdsRAQADAgADdwADNgQ"}
  ],
  shorva: [
    {id:6, name:"Mastava",        price:12000, file_id:"AgACAgIAAxkBAAIE32jGnhvbCLo0isSW3VDCNVDH-_fuAALQ-jEbpzswSuPXrlQb0WQtAQADAgADeAADNgQ"},
    {id:7, name:"Sho‘rva",        price:13000, file_id:"AgACAgIAAxkBAAIE4WjGnh7HmyOZH5ZlEYhZmwhhhKIHAALR-jEbpzswSiYXx2g4zdUOAQADAgADeAADNgQ"},
    {id:8, name:"Moshxo‘rda",     price:14000, file_id:"AgACAgIAAxkBAAIE42jGniErZiThu80iNCyYNT61OSINAALS-jEbpzswSnrfpdOxbJWSAQADAgADeAADNgQ"}
  ],
  kabob: [
    {id:9,  name:"Jigar kabob",  price:18000, file_id:"AgACAgIAAxkBAAIE5WjGniRdvMp4a3wmEmqpxa9HvclCAALT-jEbpzswSuxBSLAAAQtCEgEAAwIAA3cAAzYE"},
    {id:10, name:"Go‘sht kabob", price:20000, file_id:"AgACAgIAAxkBAAIE72jGnppA14FKN-dJtJGFQnqe3uaZAALa-jEbpzswSlJEE6ctrmGQAQADAgADeQADNgQ"}
  ],
  salat: [
    {id:11, name:"Chimchi", price:6000, file_id:"AgACAgIAAxkBAAIE52jGni6KXU7JK9mfbYyK4_ssDlLxAALV-jEbpzswSviggQiAT0s-AQADAgADeQADNgQ"},
    {id:12, name:"Smak",    price:7000, file_id:"AgACAgIAAxkBAAIE6WjGnjEl8azwIGl_KAjKnb_0BQ1IAALW-jEbpzswSun-RrKpdhjHAQADAgADeAADNgQ"}
  ],
  ichimlik: [
    {id:13, name:"Coca-Cola 0.5", price:6000, file_id:"AgACAgIAAxkBAAIE62jGnjj48AjR1AROPkwp8byRgvalAALX-jEbpzswSjEUvS12k-gSAQADAgADdwADNgQ"}
  ],
  desert: [
    {id:14, name:"Shakarap", price:4000, file_id:"AgACAgIAAxkBAAIE7WjGnl2eSmxzrZltweNHpsQoIbwfAALY-jEbpzswSgOla-3w3S_0AQADAgADeQADNgQ"}
  ]
};

let currentCat = 'osh';

/* ----------  TOP-5 (statistika)  ---------- */
export async function renderTop5(){
  try {
    const res = await fetch('/.netlify/functions/top5');
    const top = await res.json(); // [{name,count}, ...]
    const box = document.getElementById('top5');
    box.innerHTML = '<h2>🔥 Eng buyurtma qilingan</h2>' +
      top.map((f,i)=>`<span>${i+1}. ${f.name} (${f.count})</span>`).join('');
  } catch (e) {
    document.getElementById('top5').innerHTML = '';
  }
}

/* ----------  KATEGORIYA  ---------- */
export function renderCats(){
  const nav = document.getElementById('cats');
  nav.innerHTML = '';
  Object.keys(FULL_MENU).forEach(cat=>{
    const btn = document.createElement('button');
    btn.textContent = cat[0].toUpperCase() + cat.slice(1);
    btn.className = cat === currentCat ? 'active' : '';
    btn.onclick = () => { currentCat = cat; renderMenu(); };
    nav.appendChild(btn);
  });
}

/* ----------  MENYU + PORSIYA  ---------- */
export function renderMenu(){
  const container = document.getElementById('menu');
  container.innerHTML = '';
  FULL_MENU[currentCat].forEach(item=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="https://api.telegram.org/file/bot7589919425:AAG9bMalFe7ZZi434bUrdKLy_gTEvtJFCxI/${item.file_id}"
           alt="${item.name}"
           onerror="this.src='https://i.imgur.com/8cK9w.jpg'">
      <h3>${item.name}</h3>
      <p class="price">${item.price.toLocaleString()} som</p>
      <div class="porc">
        <button data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-q="1" class="p-btn">1</button>
        <button data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-q="2" class="p-btn">2</button>
        <button data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-q="3" class="p-btn">3</button>
      </div>`;
    container.appendChild(card);
  });


  document.querySelectorAll('.p-btn').forEach(b =>
    b.addEventListener('click', e => {
      const { id, name, price, q } = e.target.dataset;
      import('./cart.js').then(m => m.addToCart(id, name, price, +q));
    })
  );
}
