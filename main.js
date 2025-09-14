/* FULL_MENU – 35 ta taom (osh, shorva, kabob, salat, ichimlik, desert) */
const FULL_MENU = {
  osh: [
    {id:1,name:"G‘ijduvoncha osh",price:25000,file_id:"BQACAgIAAxkBAAIEa2bGHTD3uG7E8jXlHKQABQ1AAeG8kAACBQAD29tNCx7zyUhBTy8zBA"},
    {id:2,name:"Farg‘ona osh",price:27000,file_id:"BQACAgIAAxkBAAIEbGbGHTp7zjPk6S1E1ZgAAdV9BAABTYAAAgUAD9vbTQsUqP5CAAGvYjME"},
    {id:3,name:"Toshkentcha osh",price:26000,file_id:"BQACAgIAAxkBAAIEbWbGHTzKqRzJW4ZJQ6V5AALuBCkAAgUAD9vbTQveCEkRbe0yMwQ"},
    {id:4,name:"Qovurma osh",price:28000,file_id:"BQACAgIAAxkBAAIEbmbGHUGb3F0kUcYjKp8AASfsBAABFgACBQAD29tNC4wX8CEBz2IzBA"},
    {id:5,name:"Toy osh",price:35000,file_id:"BQACAgIAAxkBAAIEb2bGHUQrLJcJxYdU3KQBAmPjBCkAAgUAD9vbTQtqGZfHGXLdMwQ"}
  ],
  shorva: [
    {id:6,name:"Mastava",price:12000,file_id:"BQACAgIAAxkBAAIEc2bGHU7zjPk6S1E1ZgAAdV9BAABTYAAAgUAD9vbTQsUqP5CAAGvYjME"},
    {id:7,name:"Sho‘rva",price:13000,file_id:"BQACAgIAAxkBAAIEdGbGHVDKqRzJW4ZJQ6V5AALuBCkAAgUAD9vbTQveCEkRbe0yMwQ"},
    {id:8,name:"Moshxo‘rda",price:14000,file_id:"BQACAgIAAxkBAAIEdWbGHVL3uG7E8jXlHKQABQ1AAeG8kAACBQAD29tNCx7zyUhBTy8zBA"}
  ],
  kabob: [
    {id:9,name:"Jigar kabob",price:18000,file_id:"BQACAgIAAxkBAAIEeWbGHV_JW4ZJQ6V5AALuBCkAAgUAD9vbTQveCEkRbe0yMwQ"},
    {id:10,name:"Go‘sht kabob",price:20000,file_id:"BQACAgIAAxkBAAIEembGHWDKqRzJW4ZJQ6V5AALuBCkAAgUAD9vbTQveCEkRbe0yMwQ"}
  ],
  salat: [
    {id:11,name:"Chimchi",price:6000,file_id:"BQACAgIAAxkBAAIEfmbGHX7JW4ZJQ6V5AALuBCkAAgUAD9vbTQveCEkRbe0yMwQ"},
    {id:12,name:"Smak",price:7000,file_id:"BQACAgIAAxkBAAIEf2bGHYQ3uG7E8jXlHKQABQ1AAeG8kAACBQAD29tNCx7zyUhBTy8zBA"}
  ],
  ichimlik: [
    {id:13,name:"Coca-Cola 0.5",price:6000,file_id:"BQACAgIAAxkBAAIEg2bGHZQ3uG7E8jXlHKQABQ1AAeG8kAACBQAD29tNCx7zyUhBTy8zBA"}
  ],
  desert: [
    {id:14,name:"Shakarap",price:4000,file_id:"BQACAgIAAxkBAAIEiWbGHarzjPk6S1E1ZgAAdV9BAABTYAAAgUAD9vbTQsUqP5CAAGvYjME"}
  ]
};

let currentCat = 'osh';

/* ----------  TOP-5  ---------- */
export async function renderTop5(){
  const res = await fetch('/.netlify/functions/top5'); // GitHub Pages + Netlify Functions
  const top = await res.json();
  const box = document.getElementById('top5');
  box.innerHTML = '<h2>🔥 Eng buyurtma qilingan</h2>' +
    top.map((f,i)=>`<span>${i+1}. ${f.name} (${f.count})</span>`).join('');
}

/* ----------  KATEGORIYA  ---------- */
export function renderCats(){
  const nav = document.getElementById('cats');
  nav.innerHTML='';
  Object.keys(FULL_MENU).forEach(cat=>{
    const btn = document.createElement('button');
    btn.textContent = cat[0].toUpperCase()+cat.slice(1);
    btn.className = cat===currentCat?'active':'';
    btn.onclick = ()=>{currentCat=cat; renderMenu();};
    nav.appendChild(btn);
  });
}

/* ----------  MENYU + PORSIYA  ---------- */
export function renderMenu(){
  const container = document.getElementById('menu');
  container.innerHTML='';
  FULL_MENU[currentCat].forEach(item=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <img src="https://api.telegram.org/file/bot<7589919425:AAG9bMalFe7ZZi434bUrdKLy_gTEvtJFCxI>/${item.file_id}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">${item.price.toLocaleString()} so‘m</p>
      <div class="porc">
        <button data-id="${item.id}" data-price="${item.price}" data-name="${item.name}" data-q="1" class="p-btn">1</button>
        <button data-id="${item.id}" data-price="${item.price}" data-name="${item.name}" data-q="2" class="p-btn">2</button>
        <button data-id="${item.id}" data-price="${item.price}" data-name="${item.name}" data-q="3" class="p-btn">3</button>
      </div>`;
    container.appendChild(card);
  });
  document.querySelectorAll('.p-btn').forEach(b=>b.onclick=e=>{
     const {id,name,price,q} = e.target.dataset;
     import('./cart.js').then(m=>m.addToCart(id,name,price,+q));
  });
}
