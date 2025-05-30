import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = window.firestore;

// İletişim Formunu Firebase'e Kaydet
document.getElementById("iletisimFormu").addEventListener("submit", async function(e) {
  e.preventDefault();

  const ad = document.getElementById("ad").value;
  const email = document.getElementById("email").value;
  const mesaj = document.getElementById("mesaj").value;

  try {
    await addDoc(collection(db, "iletisim"), { ad, email, mesaj, tarih: new Date() });
    alert("Mesaj başarıyla gönderildi!");
    document.getElementById("iletisimFormu").reset();
  } catch (err) {
    alert("Bir hata oluştu: " + err);
  }
});

// Projeleri Dinamik Olarak Yükle
async function projeleriYukle() {
  const projeListesi = document.getElementById("projeListesi");
  const querySnapshot = await getDocs(collection(db, "projeler"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="project-box" data-aos="zoom-in">
        <h5>${data.isim}</h5>
        <p>${data.aciklama}</p>
      </div>
    `;
    projeListesi.appendChild(col);
  });
}

projeleriYukle();
