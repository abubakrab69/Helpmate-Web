import { useState, useEffect } from 'react'

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(url, options)
        if (!res.ok) throw new Error(res.statusText)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

export default useFetch
