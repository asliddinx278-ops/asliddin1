const FULL_MENU = (await import('./main.js')).FULL_MENU;

export function renderSearch(){
  const inp = document.getElementById('searchInp');
  const res = document.getElementById('searchRes');
  inp.oninput = ()=>{
    const q = inp.value.trim().toLowerCase();
    if(!q){res.innerHTML='';return;}
    let found = [];
    Object.values(FULL_MENU).flat().forEach(item=>{
      if(item.name.toLowerCase().includes(q)) found.push(item);
    });
    res.innerHTML='';
    found.forEach(it=>{
      const card = document.createElement('div');
      card.className='card';
      card.innerHTML=`
        <img src="https://api.telegram.org/file/bot<TOKEN>/${it.file_id}" alt="${it.name}">
        <h3>${it.name}</h3>
        <p class="price">${it.price.toLocaleString()} so‘m</p>
        <button class="btn" onclick="import('./cart.js').then(m=>m.addToCart(${it.id},'${it.name}',${it.price},1))">Tanlash</button>`;
      res.appendChild(card);
    });
  };
}
