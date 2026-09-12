import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight,
  CircleHelp, Compass, ExternalLink, Filter, Gem, Globe2, Heart,
  Info, MapPin, Play, RotateCcw, Search, Sparkles, X, ZoomIn
} from 'lucide-react'
import './styles.css'

const periods = [
  {id:'prehistoric', year:'c. 10,000 BCE', title:'Prehistoric India', short:'Prehistoric', region:'Madhya Pradesh', color:'ochre',
   intro:'Early visual storytelling survives in rock shelters, where communities recorded animals, hunting, rituals and everyday life.',
   artifacts:[
    {id:'bhimbetka', name:'Bhimbetka Rock Paintings', date:'c. 10,000 BCE–1,000 BCE', material:'Mineral pigments', place:'Bhimbetka, Madhya Pradesh', type:'Rock art',
     image:'https://upload.wikimedia.org/wikipedia/commons/5/5b/Bhimbetka_rock_shelters.jpg',
     summary:'Layered paintings in rock shelters preserve some of the earliest known visual traditions of the Indian subcontinent.',
     story:'The Bhimbetka shelters contain paintings made across long spans of prehistory. Animal forms, hunting scenes and geometric marks show how images could communicate experience, memory and ritual.',
     tags:['Rock art','Narrative','Pigment'], technique:'Painting on rock surfaces', significance:'A major record of prehistoric visual culture in South Asia.'}
   ]},
  {id:'indus', year:'c. 2600–1900 BCE', title:'Indus Valley Civilization', short:'Indus Valley', region:'Sindh & Punjab', color:'teal',
   intro:'Urban craft traditions produced bronze figures, seals, pottery and terracotta objects with remarkably controlled forms.',
   artifacts:[
    {id:'dancing-girl', name:'Dancing Girl', date:'c. 2500 BCE', material:'Bronze', place:'Mohenjo-daro', type:'Sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/3/3a/Dancing_Girl.jpg',
     summary:'A small bronze figure made using the lost-wax tradition and one of the most recognizable objects of the Indus civilization.',
     story:'The figure demonstrates sophisticated bronze casting and a confident treatment of posture. Its compact scale and relaxed stance reveal a lively sculptural vocabulary in the Indus world.',
     tags:['Bronze','Lost-wax','Mohenjo-daro'], technique:'Lost-wax casting', significance:'Evidence of advanced metallurgical and sculptural skill.'},
    {id:'unicorn-seal', name:'Unicorn Seal', date:'c. 2500–1900 BCE', material:'Steatite', place:'Indus region', type:'Seal',
     image:'https://upload.wikimedia.org/wikipedia/commons/0/0b/Indus_Valley_Civilisation%2C_Mohenjo-daro%2C_seal.jpg',
     summary:'Square seals combined animal imagery with the still-undeciphered Indus script.',
     story:'The so-called unicorn motif appears frequently on Indus seals. These objects were practical as well as artistic, likely connected to identification, trade or administration.',
     tags:['Seal','Script','Animal motif'], technique:'Stone carving and surface finishing', significance:'A key intersection of art, writing and urban administration.'}
   ]},
  {id:'maurya', year:'c. 322–185 BCE', title:'Mauryan Empire', short:'Maurya', region:'North India', color:'gold',
   intro:'Imperial patronage produced monumental stone architecture, polished sculpture and symbolic Buddhist imagery.',
   artifacts:[
    {id:'lion-capital', name:'Lion Capital of Ashoka', date:'c. 250 BCE', material:'Chunar sandstone', place:'Sarnath, Uttar Pradesh', type:'Capital',
     image:'https://upload.wikimedia.org/wikipedia/commons/4/49/Sarnath_capital.jpg',
     summary:'Four lions stand above a circular abacus, creating one of the best-known symbols of ancient India.',
     story:'Commissioned under Ashoka, the capital belongs to a wider network of pillars and monuments. Its polished sandstone and carefully arranged animals combine political authority with Buddhist symbolism.',
     tags:['Stone','Ashoka','Sarnath'], technique:'Monumental stone carving and polishing', significance:'The four-lion capital became the basis of the modern State Emblem of India.'},
    {id:'didarganj-yakshi', name:'Didarganj Yakshi', date:'c. 2nd century BCE–1st century CE', material:'Chunar sandstone', place:'Patna region, Bihar', type:'Sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/2/2e/Didarganj_Yakshi.JPG',
     summary:'A highly polished female figure illustrating the continuing importance of stone sculpture in the early historic period.',
     story:'The sculpture is celebrated for its smooth surface, elaborate ornament and monumental presence. Its exact date remains debated, making it useful for discussing chronology and attribution.',
     tags:['Yakshi','Polish','Stone'], technique:'Stone carving with high polish', significance:'A striking example of early Indian sculptural refinement.'}
   ]},
  {id:'kushan', year:'c. 1st–3rd century CE', title:'Kushan & Early Buddhist Art', short:'Kushan', region:'Gandhara & Mathura', color:'blue',
   intro:'Buddhist imagery developed through distinct regional traditions, especially Gandhara and Mathura.',
   artifacts:[
    {id:'gandhara-buddha', name:'Gandhara Buddha', date:'c. 2nd–3rd century CE', material:'Schist', place:'Gandhara region', type:'Sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Gandhara_Buddha_%28Schist%29.jpg',
     summary:'A Buddhist image with deeply carved drapery and naturalistic modelling characteristic of Gandharan sculpture.',
     story:'Gandharan artists worked in a visual environment shaped by multiple cultural exchanges. Drapery, hair and facial modelling can look more naturalistic than in many later Indian traditions.',
     tags:['Buddhist','Gandhara','Schist'], technique:'Stone carving', significance:'Shows the diversity of early Buddhist visual language.'},
    {id:'mathura-buddha', name:'Mathura Buddha', date:'c. 2nd–3rd century CE', material:'Red sandstone', place:'Mathura, Uttar Pradesh', type:'Sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/4/4d/Standing_Buddha%2C_Mathura%2C_2nd_century.jpg',
     summary:'Mathura developed an influential indigenous sculptural style using local red sandstone.',
     story:'Mathura artists developed Buddha and bodhisattva images with powerful bodies, simplified drapery and strong frontality. The tradition became important to later North Indian Buddhist and Hindu sculpture.',
     tags:['Mathura','Red sandstone','Buddhist'], technique:'Red sandstone carving', significance:'A major regional school in the formation of the Buddha image.'}
   ]},
  {id:'gupta', year:'c. 320–550 CE', title:'Gupta Period', short:'Gupta', region:'North & Central India', color:'rose',
   intro:'Often associated with an idealized classical style, Gupta sculpture emphasized calm expressions, balanced proportions and spiritual presence.',
   artifacts:[
    {id:'sarnath-buddha', name:'Sarnath Buddha', date:'c. 5th century CE', material:'Chunar sandstone', place:'Sarnath, Uttar Pradesh', type:'Sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/0/07/Sarnath_Buddha.jpg',
     summary:'A serene seated Buddha image associated with the mature Sarnath sculptural tradition.',
     story:'The nearly transparent treatment of the robe, gentle modelling and composed expression create a sense of spiritual calm. The style became highly influential across Buddhist Asia.',
     tags:['Sarnath','Buddha','Classical'], technique:'Fine sandstone carving', significance:'A benchmark of classical Indian Buddhist sculpture.'},
    {id:'ajanta', name:'Ajanta Cave Paintings', date:'c. 2nd century BCE–6th century CE', material:'Paint on plaster', place:'Ajanta, Maharashtra', type:'Painting',
     image:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Ajanta_Caves_%2816%29.jpg',
     summary:'Narrative murals depict Buddhist stories, courtly life, figures, animals and ornamental patterns.',
     story:'Ajanta demonstrates how architecture, painting and religious narrative could operate together. Artists built expressive faces, gestures and spatial rhythms with layered mineral pigments.',
     tags:['Murals','Buddhist','Narrative'], technique:'Painting over prepared plaster', significance:'Among the most important surviving traditions of ancient Indian mural painting.'}
   ]},
  {id:'medieval', year:'c. 600–1300 CE', title:'Medieval Temple Traditions', short:'Medieval', region:'Deccan & South India', color:'violet',
   intro:'Temple complexes became powerful centres of sculpture, architecture and ritual performance.',
   artifacts:[
    {id:'ellora-kailasa', name:'Kailasa Temple, Ellora', date:'c. 8th century CE', material:'Basalt', place:'Ellora, Maharashtra', type:'Architecture',
     image:'https://upload.wikimedia.org/wikipedia/commons/3/3a/Kailasa_temple_at_Ellora.jpg',
     summary:'A monumental rock-cut temple created by carving directly into a volcanic cliff.',
     story:'The Kailasa complex reverses ordinary construction logic: instead of assembling blocks, sculptors removed enormous quantities of rock to reveal the temple. Architecture and sculpture were planned as one integrated monument.',
     tags:['Rock-cut','Temple','Basalt'], technique:'Monolithic rock excavation and carving', significance:'One of the most ambitious rock-cut monuments in India.'},
    {id:'khajuraho', name:'Khajuraho Temple Sculpture', date:'c. 10th–11th century CE', material:'Sandstone', place:'Khajuraho, Madhya Pradesh', type:'Sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/0/0d/Khajuraho_Group_of_Monuments_3.jpg',
     summary:'Dense sculptural programmes cover temple exteriors with deities, attendants, musicians and worldly scenes.',
     story:'Khajuraho sculpture integrates divine and human worlds into an architectural rhythm. Figures are arranged in bands that animate the temple surface.',
     tags:['Temple','Sandstone','Figurative'], technique:'Architectural stone carving', significance:'A major expression of North Indian temple sculpture.'}
   ]},
  {id:'chola', year:'c. 850–1300 CE', title:'Chola Bronze Tradition', short:'Chola', region:'Tamil Nadu', color:'copper',
   intro:'South Indian temple culture produced sophisticated bronze icons, especially through the lost-wax casting tradition.',
   artifacts:[
    {id:'nataraja', name:'Shiva Nataraja', date:'c. 11th century CE', material:'Bronze', place:'Tamil Nadu', type:'Bronze sculpture',
     image:'https://upload.wikimedia.org/wikipedia/commons/8/8d/Shiva_Nataraja_MET_DT12.jpg',
     summary:'Shiva dances within a ring of flames, balancing movement, cosmic symbolism and sculptural precision.',
     story:'Nataraja is among the most celebrated forms of South Indian bronze sculpture. The composition communicates the cosmic dance of Shiva through controlled asymmetry, gestures and rhythmic lines.',
     tags:['Chola','Bronze','Nataraja'], technique:'Lost-wax casting', significance:'An iconic synthesis of theology, movement and metalworking.'},
    {id:'brihadisvara', name:'Brihadisvara Temple', date:'completed c. 1010 CE', material:'Granite', place:'Thanjavur, Tamil Nadu', type:'Architecture',
     image:'https://upload.wikimedia.org/wikipedia/commons/5/5c/Brihadeeswarar_Temple%2C_Thanjavur.jpg',
     summary:'A monumental Chola temple known for its towering vimana, inscriptions and sculptural programme.',
     story:'Built under Rajaraja Chola I, the temple demonstrates the organizational scale of Chola architecture and patronage. Its inscriptions also preserve valuable historical evidence.',
     tags:['Chola','Temple','Granite'], technique:'Monumental masonry and stone carving', significance:'A defining monument of Chola architecture.'}
   ]},
  {id:'mughal', year:'c. 1526–1857 CE', title:'Mughal Art', short:'Mughal', region:'North India', color:'indigo',
   intro:'Court ateliers developed sophisticated miniature painting, manuscript illustration, portraiture and architectural ornament.',
   artifacts:[
    {id:'akbar-miniature', name:'Akbar-era Miniature Painting', date:'16th century CE', material:'Opaque watercolor & gold', place:'Mughal court', type:'Painting',
     image:'https://upload.wikimedia.org/wikipedia/commons/8/8e/Akbar_Hunting.jpg',
     summary:'Mughal manuscript paintings combine fine drawing, vivid colour, detailed observation and Persianate traditions.',
     story:'Mughal painting grew through court workshops where artists collaborated on manuscripts. Under Akbar, illustrated histories became especially ambitious and absorbed influences from several artistic traditions.',
     tags:['Miniature','Manuscript','Court art'], technique:'Layered pigments, fine brushwork and gold', significance:'A key tradition in the history of South Asian painting.'},
    {id:'taj-mahal', name:'Taj Mahal', date:'1632–1653 CE', material:'White marble', place:'Agra, Uttar Pradesh', type:'Architecture',
     image:'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg',
     summary:'A monumental Mughal mausoleum combining symmetry, marble inlay, calligraphy and garden design.',
     story:'The Taj Mahal brings together architecture, ornament and landscape planning. Its surface uses carved and inlaid decoration rather than relying only on structural mass.',
     tags:['Marble','Inlay','Mughal'], technique:'Masonry, pietra dura inlay and carving', significance:'One of the most recognizable monuments of Mughal architecture.'}
   ]},
  {id:'colonial', year:'c. 1750–1947 CE', title:'Colonial & National Art', short:'Colonial', region:'Pan-India', color:'slate',
   intro:'New institutions, print technologies and art schools changed Indian visual culture while artists debated identity and tradition.',
   artifacts:[
    {id:'ravi-varma', name:'Raja Ravi Varma Painting', date:'late 19th century CE', material:'Oil on canvas', place:'Travancore & Bombay', type:'Painting',
     image:'https://upload.wikimedia.org/wikipedia/commons/2/2d/Raja_Ravi_Varma_-_Damayanti.jpg',
     summary:'Raja Ravi Varma combined European academic oil painting with subjects from Indian epics and popular culture.',
     story:'His paintings used modelling, perspective and oil techniques associated with European academic art while presenting recognizable Indian mythological figures. Oleographs helped spread such imagery widely.',
     tags:['Oil painting','Print','Mythology'], technique:'Academic oil painting and chromolithography', significance:'A major bridge between elite painting, mass reproduction and modern Indian visual culture.'}
   ]},
  {id:'modern', year:'c. 1947–present', title:'Modern & Contemporary India', short:'Modern', region:'Pan-India', color:'neon',
   intro:'After independence, artists explored abstraction, folk traditions, political themes, identity and new media.',
   artifacts:[
    {id:'amrita', name:'Amrita Sher-Gil — Self-Portrait', date:'20th century CE', material:'Oil on canvas', place:'India / Europe', type:'Painting',
     image:'https://upload.wikimedia.org/wikipedia/commons/8/8c/Amrita_Sher-Gil_-_Self-Portrait_-_1931.jpg',
     summary:'Sher-Gil developed a modernist visual language informed by European training and South Asian subjects.',
     story:'Her work is central to the story of Indian modernism. She brought together lessons from European painting with observations of Indian people, landscapes and social life.',
     tags:['Modernism','Portrait','Oil'], technique:'Oil painting', significance:'A foundational figure in twentieth-century Indian modern art.'},
    {id:'husain', name:'M. F. Husain — Modernist Work', date:'20th century CE', material:'Mixed media / oil', place:'India', type:'Painting',
     image:'https://upload.wikimedia.org/wikipedia/commons/0/0f/MF_Husain.jpg',
     summary:'Husain became known for energetic line, simplified forms and recurring figures drawn from Indian cultural imagery.',
     story:'As a founding member of the Progressive Artists’ Group, Husain helped push Indian painting toward a modernist vocabulary that was international in ambition but deeply connected to Indian visual culture.',
     tags:['Modernism','Progressive Artists','Figuration'], technique:'Painting and mixed media', significance:'A major force in post-independence Indian modernism.'}
   ]}
]

const allArtifacts = periods.flatMap(p => p.artifacts.map(a => ({...a, periodId:p.id, period:p.title, year:p.year, region:p.region})))

function App(){
  const [activePeriod,setActivePeriod] = useState('indus')
  const [selected,setSelected] = useState(null)
  const [query,setQuery] = useState('')
  const [filter,setFilter] = useState('All')
  const [view,setView] = useState('timeline')
  const [saved,setSaved] = useState([])
  const [quizOpen,setQuizOpen] = useState(false)
  const [journey,setJourney] = useState(false)

  const types = ['All', ...new Set(allArtifacts.map(a=>a.type))]
  const filtered = useMemo(()=>allArtifacts.filter(a=>{
    const q=query.toLowerCase()
    const matchQ=!q || `${a.name} ${a.period} ${a.material} ${a.region} ${a.tags.join(' ')}`.toLowerCase().includes(q)
    return matchQ && (filter==='All' || a.type===filter)
  }),[query,filter])

  const currentIndex=periods.findIndex(p=>p.id===activePeriod)
  const current=periods[currentIndex]
  const goPeriod = (idx)=>{
    const p=periods[(idx+periods.length)%periods.length]
    setActivePeriod(p.id)
    document.getElementById('timeline')?.scrollIntoView({behavior:'smooth'})
  }
  const toggleSave=(id)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id])

  return <div className="app">
    <header className="nav">
      <a className="brand" href="#home"><span className="brand-mark">ॐ</span><span>INDIA<span className="brand-light"> / A LIVING CANVAS</span></span></a>
      <nav>
        <button onClick={()=>setView('timeline')}>Timeline</button>
        <button onClick={()=>setView('map')}>Map</button>
        <button onClick={()=>setView('gallery')}>Artifacts</button>
        <button onClick={()=>setQuizOpen(true)}>Quiz</button>
      </nav>
      <button className="collection" onClick={()=>setView('collection')}><Heart size={16}/> {saved.length}</button>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-noise"/>
        <div className="hero-content">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="eyebrow"><span/> DIGITAL MUSEUM • 5000+ YEARS</motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.1,duration:.8}}>INDIA<br/><em>A Living Canvas.</em></motion.h1>
          <p>Travel through millennia of Indian art — from prehistoric rock shelters to modernism. Explore artifacts, techniques, places and stories.</p>
          <div className="hero-actions">
            <button className="primary" onClick={()=>document.getElementById('timeline')?.scrollIntoView({behavior:'smooth'})}>Explore timeline <ArrowRight size={18}/></button>
            <button className="ghost" onClick={()=>setJourney(true)}><Play size={16}/> Start time journey</button>
          </div>
        </div>
        <div className="hero-art">
          <div className="sun"/>
          <div className="arch">ॐ</div>
          <div className="hero-caption"><span>01</span><span>INDUS VALLEY • c. 2500 BCE</span></div>
        </div>
        <div className="scroll-cue"><ArrowDown size={15}/> SCROLL TO EXPLORE</div>
      </section>

      <section className="intro-strip">
        <div><span className="number">01</span><span>TIME</span></div>
        <p>Art is not a straight line. It is a conversation between <strong>place, belief, material and people.</strong></p>
        <div><span className="number">09</span><span>PERIODS</span></div>
      </section>

      {view==='timeline' && <section id="timeline" className="timeline-section">
        <div className="section-head">
          <div><span className="eyebrow">CHRONOLOGY</span><h2>Walk through <em>time.</em></h2></div>
          <div className="timeline-controls"><button onClick={()=>goPeriod(currentIndex-1)}><ChevronLeft/></button><span>{String(currentIndex+1).padStart(2,'0')} / {String(periods.length).padStart(2,'0')}</span><button onClick={()=>goPeriod(currentIndex+1)}><ChevronRight/></button></div>
        </div>

        <div className="timeline-rail">
          {periods.map((p,i)=><button key={p.id} className={`period-dot ${p.id===activePeriod?'active':''}`} onClick={()=>setActivePeriod(p.id)}>
            <span className="dot"/><small>{p.year}</small><b>{p.short}</b>
          </button>)}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current.id} className="period-detail" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
            <div className="period-copy"><span className={`period-number ${current.color}`}>{String(currentIndex+1).padStart(2,'0')}</span><span className="eyebrow">{current.year} • {current.region}</span><h3>{current.title}</h3><p>{current.intro}</p><button className="text-btn" onClick={()=>setView('gallery')}>View all artifacts <ArrowRight size={15}/></button></div>
            <div className="artifact-grid">
              {current.artifacts.map(a=><ArtifactCard key={a.id} a={a} saved={saved.includes(a.id)} onSave={()=>toggleSave(a.id)} onOpen={()=>setSelected(a)}/>)}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>}

      {view==='gallery' && <Gallery query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} types={types} filtered={filtered} saved={saved} toggleSave={toggleSave} setSelected={setSelected} setView={setView}/>}
      {view==='map' && <MapView artifacts={allArtifacts} setSelected={setSelected}/>}
      {view==='collection' && <Collection saved={saved} artifacts={allArtifacts} setSelected={setSelected} toggleSave={toggleSave} setView={setView}/>}

      <section className="features">
        <div className="feature-intro"><span className="eyebrow">BEYOND THE TIMELINE</span><h2>Look closer.</h2><p>History becomes more memorable when you can compare, inspect and test what you have learned.</p></div>
        <button className="feature-card" onClick={()=>setView('map')}><span className="feature-icon"><Compass/></span><span><small>01 / PLACE</small><b>Explore the map</b><i>Trace art across the subcontinent.</i></span><ArrowRight/></button>
        <button className="feature-card" onClick={()=>setView('gallery')}><span className="feature-icon"><ZoomIn/></span><span><small>02 / OBJECT</small><b>Artifact explorer</b><i>Search materials, periods and techniques.</i></span><ArrowRight/></button>
        <button className="feature-card" onClick={()=>setQuizOpen(true)}><span className="feature-icon"><CircleHelp/></span><span><small>03 / TEST</small><b>Art historian quiz</b><i>Challenge your memory.</i></span><ArrowRight/></button>
      </section>
    </main>

    <footer><div><b>INDIA / A LIVING CANVAS</b><p>An educational interactive timeline of Indian art.</p></div><span>Built for exploration • 2026</span></footer>

    <AnimatePresence>{selected && <ArtifactModal a={selected} saved={saved.includes(selected.id)} onSave={()=>toggleSave(selected.id)} onClose={()=>setSelected(null)}/>}</AnimatePresence>
    <AnimatePresence>{journey && <Journey onClose={()=>setJourney(false)} onOpen={(a)=>{setJourney(false);setSelected(a)}}/>}</AnimatePresence>
    <AnimatePresence>{quizOpen && <Quiz onClose={()=>setQuizOpen(false)}/>}</AnimatePresence>
  </div>
}

function ArtifactCard({a,saved,onSave,onOpen}){
 return <motion.article whileHover={{y:-7}} className="artifact-card">
   <button className="image-wrap" onClick={onOpen}><img src={a.image} alt={a.name} onError={e=>e.currentTarget.style.opacity=.15}/><span className="view-chip"><ZoomIn size={13}/> Explore</span></button>
   <div className="card-body"><div className="card-top"><span>{a.type}</span><button className={saved?'saved':''} onClick={(e)=>{e.stopPropagation();onSave()}} aria-label="Save artifact"><Heart size={16} fill={saved?'currentColor':'none'}/></button></div><h4>{a.name}</h4><p>{a.date} • {a.material}</p><button className="learn" onClick={onOpen}>Open artifact <ArrowRight size={14}/></button></div>
 </motion.article>
}

function Gallery({query,setQuery,filter,setFilter,types,filtered,saved,toggleSave,setSelected,setView}){
 return <section className="gallery-section">
   <div className="section-head"><div><span className="eyebrow">ARTIFACT ARCHIVE</span><h2>Every object has a <em>story.</em></h2></div><button className="back-btn" onClick={()=>setView('timeline')}><ChevronLeft size={15}/> Timeline</button></div>
   <div className="searchbar"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search artifacts, periods, materials..."/><Filter size={17}/><select value={filter} onChange={e=>setFilter(e.target.value)}>{types.map(t=><option key={t}>{t}</option>)}</select></div>
   <div className="result-count">{filtered.length} artifacts found</div>
   <div className="gallery-grid">{filtered.map(a=><ArtifactCard key={a.id} a={a} saved={saved.includes(a.id)} onSave={()=>toggleSave(a.id)} onOpen={()=>setSelected(a)}/>)}</div>
 </section>
}

function MapView({artifacts,setSelected}){
 const locations=[
  ['Bhimbetka',22.94,77.61],['Mohenjo-daro',27.33,68.14],['Sarnath',25.38,83.02],['Mathura',27.49,77.67],['Ajanta',20.55,75.70],['Ellora',20.03,75.18],['Khajuraho',24.85,79.92],['Thanjavur',10.79,79.14],['Agra',27.18,78.04]
 ]
 const find=(name)=>artifacts.find(a=>a.place.toLowerCase().includes(name.toLowerCase().split(',')[0]))
 return <section className="map-section">
   <div className="section-head"><div><span className="eyebrow">GEOGRAPHY</span><h2>Art lives in <em>place.</em></h2></div></div>
   <div className="map-layout">
    <div className="india-map">
      <div className="map-shape"/>
      <div className="map-title">INDIA</div>
      {locations.map(([n,lat,lon],i)=>{const x=((lon-67)/31)*100,y=(35-lat)/28*100; const a=find(n); return <button key={n} className="map-pin" style={{left:`${x}%`,top:`${y}%`}} onClick={()=>a&&setSelected(a)}><span/><label>{n}</label></button>})}
    </div>
    <div className="map-copy"><span className="eyebrow">09 LOCATIONS</span><h3>From rock shelters to imperial courts.</h3><p>Explore how materials, techniques and visual traditions changed across regions. Select a glowing location to open an artifact.</p><div className="map-list">{locations.map(([n])=><button key={n} onClick={()=>{const a=find(n);if(a)setSelected(a)}}><MapPin size={14}/>{n}<ArrowRight size={14}/></button>)}</div></div>
   </div>
 </section>
}

function Collection({saved,artifacts,setSelected,toggleSave,setView}){
 const items=artifacts.filter(a=>saved.includes(a.id))
 return <section className="gallery-section"><div className="section-head"><div><span className="eyebrow">YOUR MUSEUM</span><h2>Saved <em>artifacts.</em></h2></div><button className="back-btn" onClick={()=>setView('timeline')}><ChevronLeft size={15}/> Timeline</button></div>
 {items.length?<div className="gallery-grid">{items.map(a=><ArtifactCard key={a.id} a={a} saved onSave={()=>toggleSave(a.id)} onOpen={()=>setSelected(a)}/>)}</div>:<div className="empty"><Gem size={32}/><h3>Your collection is empty.</h3><p>Open an artifact and tap the heart to save it here.</p></div>}</section>
}

function ArtifactModal({a,saved,onSave,onClose}){
 return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
  <motion.div className="modal" initial={{opacity:0,y:30,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}} onClick={e=>e.stopPropagation()}>
   <button className="close" onClick={onClose}><X/></button>
   <div className="modal-image"><img src={a.image} alt={a.name}/><div className="modal-badge">{a.type}</div></div>
   <div className="modal-content"><div className="modal-meta"><span>{a.period}</span><span>{a.year}</span></div><h2>{a.name}</h2><p className="lead">{a.summary}</p>
    <div className="dna"><div><small>DATE</small><b>{a.date}</b></div><div><small>MATERIAL</small><b>{a.material}</b></div><div><small>PLACE</small><b>{a.place}</b></div><div><small>TECHNIQUE</small><b>{a.technique}</b></div></div>
    <div className="story"><h4>THE STORY</h4><p>{a.story}</p></div>
    <div className="tags">{a.tags.map(t=><span key={t}>{t}</span>)}</div>
    <div className="significance"><Info size={17}/><span><b>Why it matters</b>{a.significance}</span></div>
    <button className={`save-large ${saved?'active':''}`} onClick={onSave}><Heart size={17} fill={saved?'currentColor':'none'}/>{saved?'Saved to collection':'Save to my collection'}</button>
   </div>
  </motion.div>
 </motion.div>
}

function Journey({onClose,onOpen}){
 const [idx,setIdx]=useState(0), p=periods[idx], a=p.artifacts[0]
 return <motion.div className="overlay journey-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
  <div className="journey"><button className="close" onClick={onClose}><X/></button><div className="journey-progress"><span style={{width:`${((idx+1)/periods.length)*100}%`}}/></div><span className="eyebrow">TIME JOURNEY • {idx+1}/{periods.length}</span><h2>{p.year}</h2><h3>{p.title}</h3><p>{p.intro}</p><div className="journey-art"><img src={a.image} alt={a.name}/><div><small>KEY ARTIFACT</small><b>{a.name}</b><button onClick={()=>onOpen(a)}>Explore artifact <ArrowRight size={14}/></button></div></div><div className="journey-actions"><button disabled={idx===0} onClick={()=>setIdx(i=>i-1)}><ChevronLeft/> Previous</button><button onClick={()=>idx===periods.length-1?onClose():setIdx(i=>i+1)}>{idx===periods.length-1?'Finish journey':'Next period'} <ChevronRight/></button></div></div>
 </motion.div>
}

function Quiz({onClose}){
 const questions=[
  {q:'Which technique is strongly associated with Chola bronze sculpture?',o:['Fresco painting','Lost-wax casting','Woodblock printing','Mosaic tiling'],a:1,e:'Chola bronzes were commonly made using the lost-wax casting process.'},
  {q:'The Lion Capital of Ashoka is associated with which site?',o:['Sarnath','Ajanta','Khajuraho','Thanjavur'],a:0,e:'The capital was found at Sarnath and dates to the Mauryan period.'},
  {q:'Which material is especially associated with Mathura sculpture?',o:['Red sandstone','White marble','Granite','Terracotta'],a:0,e:'Mathura developed a major sculptural tradition using local red sandstone.'},
  {q:'What is a defining feature of Mughal miniature painting?',o:['Large stone blocks','Manuscript illustration and fine brushwork','Rock excavation','Bronze casting'],a:1,e:'Mughal court ateliers became famous for detailed manuscript illustration and painting.'},
  {q:'Ajanta is especially famous for which art form?',o:['Mural painting','Bronze casting','Ivory carving','Textile printing'],a:0,e:'Ajanta preserves major Buddhist mural painting traditions.'}
 ]
 const [n,setN]=useState(0),[answer,setAnswer]=useState(null),[score,setScore]=useState(0)
 const q=questions[n],done=n===questions.length
 const choose=i=>{if(answer!==null)return;setAnswer(i);if(i===q.a)setScore(s=>s+1)}
 const next=()=>{setAnswer(null);setN(x=>x+1)}
 return <motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><div className="quiz">
  <button className="close" onClick={onClose}><X/></button>{!done?<><span className="eyebrow">ART HISTORIAN QUIZ • {n+1}/{questions.length}</span><h2>{q.q}</h2><div className="quiz-options">{q.o.map((o,i)=><button className={answer===i?(i===q.a?'correct':'wrong'):''} onClick={()=>choose(i)} key={o}><span>{String.fromCharCode(65+i)}</span>{o}{answer!==null&&i===q.a?<Check size={16}/>:null}</button>)}</div>{answer!==null&&<div className="quiz-feedback"><b>{answer===q.a?'Correct.':'Not quite.'}</b> {q.e}</div>}<button className="primary next" disabled={answer===null} onClick={next}>{n===questions.length-1?'See result':'Next question'} <ArrowRight size={16}/></button></>:<div className="quiz-result"><Sparkles size={34}/><span className="eyebrow">JOURNEY COMPLETE</span><h2>{score}<small> / {questions.length}</small></h2><p>{score>=4?'Excellent. Your eye for Indian art is developing fast.':score>=3?'Good foundation. Explore a few more artifacts and try again.':'Keep exploring. The timeline is designed to help you build the connections.'}</p><button className="primary" onClick={()=>{setN(0);setScore(0);setAnswer(null)}}><RotateCcw size={15}/> Try again</button></div>}</div></motion.div>
}

createRoot(document.getElementById('root')).render(<App />)
