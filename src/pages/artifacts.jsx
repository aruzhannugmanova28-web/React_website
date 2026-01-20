import React, {useEffect, useState } from 'react';

const MET_SEARCH='https://collectionapi.metmuseum.org/public/collection/v1/search';
const MET_OBJECT='https://collectionapi.metmuseum.org/public/collection/v1/objects/';

export default function Artifacts() {
  const [term, setTerm] = useState("Odysseus");
  const [items, setItems] = useState([]);
  const [loading, setLoading]= useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      setLoading(true);
      setErr(null);
      try{
        //API 1. searching for object IDs matching the query(images only) 
        const res = await fetch(`${MET_SEARCH}?hasImages=true&q=${encodeURIComponent(term)}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const ids = (data.objectIDs || []).slice(0, 12); //im keeping it light
        
        //API 2. fetch oject detaild in paralel 
        const objects = await Promise.all(
          ids.map(id => 
            fetch(MET_OBJECT +id, {signal: ctrl.signal})
            .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))

          )
        );
        setItems(objects.filter(o => o?.primaryImageSmall));
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message);
      } finally {
        setLoading(false);
      }
      })();
      return () => ctrl.abort();
    }, [term]);

  return (
    <section className='hero'>
      <h1 className='title'>Greek Artifacts(The Met)</h1>
      <div style={{display: 'flex', gap: 12, alignItems : 'center', margin: '1rem 0 '}}>
        <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Try Odysseus, Homer, Cyclops, Athena..."
        style={{padding: '0.6rem 0.8rem', minWidth: 300, borderRadius: 8, border: '1px solid #ccc'}}
         />
      </div>

      {loading && <p>Searching artifacts...</p>}
      {err && <p style={{color: '#c00'}}>Failed to load: {err}</p>}
      {!loading && !err && items.length===0 && <p>No results.</p>}

      <div style={{
        display: "grid", 
        gap: "1rem", 
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
        maxWidth: 1100
      }}>
        {items.map(obj => (
          <a
          key={obj.objectID}
          href={obj.objectURL || '#'}
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
          src={obj.primaryImageSmall}
          alt={obj.title || "Artifact"}
          style={{width: "100%", height: 200, objectFit: "cover"}}
          />
          <div style={{padding:"0.8rem 1rem"}}>
            <h3 style={{margin: "0 0 0.25rem 0", fontSize: "1rem"}}>{obj.title || "Untitled"}</h3>
            <p style={{margin: 0, opacity: 0.8, fontSize: 14}}>
              {obj.objectDate || '—'} · {obj.culture || obj.period || '—'}
                <br />{obj.medium || '—'}
            </p>
      </div>
      </a>
        ))}
      </div>
    </section>
  );
}