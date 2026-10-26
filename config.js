// Shared settings for the customer page (index.html) and the admin page (admin.html).
export const firebaseConfig = {
  apiKey: "AIzaSyD_A9wBd_wvU39-KLcAXlXo2O9giHj12Xc",
  authDomain: "benebags-390eb.firebaseapp.com",
  projectId: "benebags-390eb",
  storageBucket: "benebags-390eb.firebasestorage.app",
  messagingSenderId: "338752318914",
  appId: "1:338752318914:web:4678b890e6adc8b9ebba5b"
};

export const SHOP = {
  name: "Shop with Bene",
  whatsapp: "233264337759",          // shop WhatsApp, international format, no +
  momoNumber: "0552645959",
  momoName: "Benedicta Agyin",
  pickup: "Dansoman-Asoredanho",
  callLine: "0535533809",
  snapchat: "theyluvv_bene",
  currency: "GH₵",
  cloudinaryCloud: "qbhs0saw",       // used by the admin page for photo uploads
  cloudinaryPreset: "bags_unsigned"
};

const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// Order number like AMA-7K2F: the customer's first name plus 4 characters of the order ID.
export const orderCode=(name,id)=>((name||'').trim().split(/\s+/)[0].replace(/[^A-Za-z]/g,'').slice(0,10).toUpperCase()||'ORDER')+'-'+id.slice(0,4).toUpperCase();

// Opens a print-ready receipt in a new tab (used by both pages).
export function printReceipt(o){
  const cur=n=>SHOP.currency+Number(n).toFixed(2).replace(/\.00$/,'');
  const fee=o.deliveryFee||0, total=o.subtotal+fee;
  const d=o.createdAt?new Date(o.createdAt.seconds*1000):new Date();
  const w=window.open('','_blank');
  if(!w)return alert('Please allow pop-ups to print the receipt.');
  w.document.write(`<!doctype html><meta charset="utf-8"><title>Receipt ${esc(o.code)}</title>
<style>body{font:14px/1.5 Georgia,serif;max-width:340px;margin:20px auto;color:#222}h1{text-align:center;margin:0;font-size:24px}p{margin:2px 0}.c{text-align:center}hr{border:0;border-top:1px dashed #999;margin:10px 0}.r{display:flex;justify-content:space-between}.b{font-weight:bold;font-size:16px}</style>
<h1>${SHOP.name}</h1><p class="c">Women's bags &middot; ${SHOP.pickup}</p><p class="c">WhatsApp 0${SHOP.whatsapp.slice(3)}</p><hr>
<p>Receipt: <b>${esc(o.code)}</b></p><p>Date: ${d.toLocaleString()}</p><p>Customer: ${esc(o.name)}</p>
<p>${o.mode==='delivery'?'Delivery to '+esc(o.location):'Pickup at '+SHOP.pickup}</p><hr>
${o.items.map(i=>`<div class="r"><span>Bag &times; ${i.qty}</span><span>${cur(i.price*i.qty)}</span></div>`).join('')}<hr>
<div class="r"><span>Subtotal</span><span>${cur(o.subtotal)}</span></div>
${o.mode==='delivery'?`<div class="r"><span>Delivery</span><span>${cur(fee)}</span></div>`:''}
<div class="r b"><span>Total</span><span>${cur(total)}</span></div>
<p>Payment: ${o.payMethod==='cash'?'Cash on pickup':'MoMo'} ${o.paid?'(paid)':'(not yet paid)'}</p><hr>
<p class="c">Thank you for shopping with ${SHOP.name}!</p>
<script>onload=()=>print()<\/script>`);
  w.document.close();
}
