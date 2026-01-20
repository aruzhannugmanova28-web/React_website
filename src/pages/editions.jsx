import React, {useEffect, useState } from 'react';

const OL_SEARCH='https://openlibrary.org/search.json?title=The%20Odyssey&author=Homer';

function coverURL(doc, size="L"){
  if (doc.cover_i) return `https://covers.openlibrary.org/b/id/${doc.cover_i}-${size}.jpg`;
  return 'https://covers.openlibrary.org/b/id/240727-S.jpg'; 
}

export default function Editions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading]= useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      setLoading(true);
      setErr(null);
      try{
        //API 1. list Odyssey works, any editions or translations  
        const res = await fetch(OL_SEARCH, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const docs = (data.docs || [])
          .filter(d => (d.title || "").toLowerCase().includes("odyssey"))
          .slice(0,12);
        setItems(docs);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message);
      } finally {
        setLoading(false);
      }
      })();
      return () => ctrl.abort();
    }, []);

  return (
    <section className='hero'>
      <h1 className='title'>The Odyssey - Editions & Translations</h1>

 {loading && <p>Loading editions...</p>}
      {err && <p style={{color: '#c00'}}>Failed to load: {err}</p>}
      {!loading && !err && items.length===0 && <p>No results.</p>}
     
      <div style={{
        display: "grid", 
        gap: "1rem", 
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
        maxWidth: 1100
      }}>
        {items.map(doc => (
          <a
          key={`${doc.key}-${doc.cover_i || Math.random()}`}
          href={`https://openlibrary.org${doc.key}`}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit", 
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 12, 
            overflow: 'hidden',
            boxShadow: "0 10px 24px rgba(0,0, 0,0.08)", 
            background: "rgba(255, 255, 255, 0.6)", 
            backdropFilter: "blur(4px)"
          }}
        >
          <img
          src={coverURL(doc)}
          alt={doc.title}
          style={{width: "100%", height: 260, objectFit: "cover"}}
          />
          <div style={{padding:"0.8rem 1rem"}}>
            <h3 style={{margin: "0 0 0.25rem 0", fontSize: "1rem"}}>{doc.title}</h3>
            <p style={{margin: 0, opacity: 0.8, fontSize: 14}}>
              First published: {doc.first_publish_year || "-"}
              <br />Language: {(doc.language && doc.language[0]) || '—'}
              <br />Author: {(doc.author_name && doc.author_name[0]) || 'Homer'}
            </p>
          </div>
        </a>
        ))}
      </div>
    </section>
  );
}