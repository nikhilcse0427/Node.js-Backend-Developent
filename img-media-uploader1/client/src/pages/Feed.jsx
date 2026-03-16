import { useEffect, useState } from 'react'

const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch('http://localhost:8000/posts/get-feed')
        const json = await res.json()

        if (!res.ok) throw new Error(json?.error || json?.message || 'Failed to load feed')
        if (!cancelled) setFeeds(json?.feed ?? [])
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load feed')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <h1 className="title">Feed</h1>
          <p className="subtitle">Latest posts.</p>

          {loading ? (
            <p className="subtitle">Loading…</p>
          ) : error ? (
            <p className="subtitle">{error}</p>
          ) : feeds.length ? (
            <div className="form">
              {feeds.map((feed, idx) => (
                <div key={feed?._id ?? idx} className="card" style={{ boxShadow: 'none' }}>
                  {feed?.image ? (
                    <img src={feed.image} alt="post" style={{ width: '100%', borderRadius: 12 }} />
                  ) : null}
                  <p style={{ margin: '10px 0 0', color: 'var(--muted)' }}>{feed?.caption}</p>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="subtitle">No posts available</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default Feed
