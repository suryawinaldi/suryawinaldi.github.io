const $ = s => document.querySelector(s);
const base = 'https://github.com/suryawinaldi/';
const projects = [
 ['Olist E-commerce','Analisis data','SQL · POWER BI','olist-ecommerce-analysis','6,77% pesanan layak ukur tiba melewati estimasi.','Dari 96.470 pesanan yang dapat dibandingkan dengan estimasi, 6.534 datang terlambat. Analisis memisahkan waktu sebelum dan setelah serah terima untuk menelusuri sumber keterlambatan.','olist'],
 ['Online Retail II','Analisis data','SQL · PYTHON · EXCEL','retail-customer-retention-analysis','68,39% nilai pembelian positif berasal dari pelanggan loyal aktif.','Pada Desember 2010–November 2011, 1.161 dari 4.293 pelanggan termasuk segmen loyal aktif berdasarkan waktu sejak pembelian terakhir dan frekuensi transaksi. Nilai pembelian dihitung sebelum kredit.'],
 ['Mobile Legends','Analisis data','NLP · SCIKIT-LEARN','UTS-Analisis-Data-Tidak-Terstruktur-Sentiment-Analysis-MLBB','Seberapa baik teks ulasan memprediksi rating pemain?','Model mencapai macro F1 0,634 pada 3.321 teks unik bulan Juni. Baseline mayoritas mencapai 0,189. Hanya 30,4% ulasan berbintang tiga dikenali dengan benar.','mlbb'],
 ['World Happiness','Analisis data','PYTHON · ANALISIS PANEL','world-happiness-analysis','Membandingkan perubahan evaluasi hidup di 143 negara.','Dari 2017–2019 ke 2023–2025, rerata skor naik 0,102 poin pada panel negara yang sama dengan bobot setara. Perubahan Indonesia mencapai +0,331 poin.','happiness'],
 ['Pojok Statistik UI','Aplikasi','JAVASCRIPT · SUPABASE','absensi-pojok-statistik-ui','Workspace pengelolaan jadwal, agen, dan kehadiran.','Aplikasi menyatukan jadwal bertanggal, pencatatan kehadiran, layanan daring, dan materi privat dalam satu ruang kerja admin.'],
 ['Hero Hunt MLBB','Aplikasi','REACT · VITE','wordbound','Permainan tebak hero Mobile Legends berbasis petunjuk.','Antarmuka permainan menyajikan petunjuk untuk mengenali hero. Implementasi dan aset permainan tersedia di repositori Wordbound.'],
 ['Pencarian Skripsi Matematika UI','Aplikasi','STREAMLIT · SQLITE','skripsi-math-ui-app','Menelusuri judul skripsi dengan filter akademik.','Pengguna dapat mencari kata kunci dalam judul dan menyaring hasil berdasarkan peminatan, dosen pembimbing, serta tahun.']
];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const wave = $('#wave');
let frame, visible=true;
function draw(t=0){
 const {width:w,height:h}=wave.getBoundingClientRect(), d=Math.min(devicePixelRatio,2);
 if(wave.width!==Math.round(w*d)||wave.height!==Math.round(h*d)){wave.width=Math.round(w*d);wave.height=Math.round(h*d)}
 const ctx=wave.getContext('2d');ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);
 const mobile=w<600,left=mobile?0:w*.47,span=w-left,mid=mobile?h-83:h*.50,amp=mobile?40:h*.19;
 for(let j=0;j<50;j++){const v=j/49;ctx.beginPath();for(let i=0;i<=125;i++){const u=i/125,x=left+span*u, envelope=Math.pow(Math.sin(Math.PI*u),.65),y=mid+amp*((v-.5)*1.4+envelope*(Math.sin(u*8-v*3+t*.00018)*.93+Math.sin(u*13+v*4)*.35));if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y)}ctx.strokeStyle='hsla('+(70+v*28)+',70%,'+(45+v*26)+'%,'+(.23+v*.63)+')';ctx.lineWidth=.95;ctx.stroke()}
 if(!motion.matches&&visible&&!document.hidden)frame=requestAnimationFrame(draw);
}
function redraw(){cancelAnimationFrame(frame);draw(motion.matches?0:performance.now())}
new ResizeObserver(redraw).observe(wave);new IntersectionObserver(([e])=>{visible=e.isIntersecting;redraw()}).observe(wave);motion.addEventListener('change',redraw);document.addEventListener('visibilitychange',redraw);
const dialog=$('dialog');
function openProject(p){$('#dtype').textContent=p[2];$('#dtitle').textContent=p[0];$('#desc').textContent=p[5];$('#source').href=base+p[3];const img=$('#plot');img.hidden=!p[6];if(p[6]){img.src='assets/'+p[6]+'.webp';img.alt='Grafik hasil analisis '+p[0]}dialog.showModal()}
$('#close').onclick=()=>dialog.close();
for (const project of projects) {
  const [title, category, tools, , summary, , chart] = project;
  const analysis = category === 'Analisis data';
  const card = document.createElement('button');
  card.className = analysis ? 'card' : 'other-project';
  if (chart) {
    const image = document.createElement('img');
    image.className = 'cover';
    image.src = 'assets/' + chart + '.webp';
    image.alt = 'Grafik' + ' ' + title;
    card.append(image);
  } else if (analysis) {
    const figure = document.createElement('div');
    figure.className = 'retail-figure';
    figure.innerHTML = '<strong>68,39%</strong><span>Kontribusi pelanggan loyal aktif</span><meter min="0" max="100" value="68.39" aria-label="Persentase nilai pembelian positif"></meter>';
    card.append(figure);
  }
  const body = document.createElement('div');
  body.className = 'copy';
  body.innerHTML = '<span class="tools"></span><h3></h3><p></p><span class="link"></span>';
  body.querySelector('.tools').textContent = tools;
  body.querySelector('h3').textContent = title;
  body.querySelector('p').textContent = summary;
  body.querySelector('.link').textContent = analysis ? 'Baca analisis ↗' : 'Detail proyek ↗';
  card.append(body);
  card.onclick = () => openProject(project);
  $(analysis ? '#cards' : '#other-projects').append(card);
}
function showRepos(names){$('#repos').replaceChildren(...names.map(name=>{const a=document.createElement('a');a.href=base+encodeURIComponent(name);a.textContent=name+' ↗';return a}))}
showRepos([...projects.map(p=>p[3]),'suryawinaldi.github.io']);$('#status').textContent='Repositori dalam portofolio ini.';
(async()=>{try{const names=[];for(let page=1;;page++){const r=await fetch('https://api.github.com/users/suryawinaldi/repos?per_page=100&sort=updated&page='+page,{signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error();const rows=await r.json();names.push(...rows.map(x=>x.name));if(rows.length<100)break}showRepos([...new Set(names)]);$('#status').textContent=names.length+' repositori publik dari profil GitHub.'}catch{$('#status').textContent='Daftar lokal portofolio. Daftar lengkap tersedia di profil GitHub.'}})();
