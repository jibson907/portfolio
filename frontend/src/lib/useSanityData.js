import { useEffect, useState } from 'react'

// Custom hook: runs a service function (e.g. getHomepage) and tracks the result.
// Returns { data, status } where status is 'loading' | 'success' | 'error'.
// The request runs again whenever `fetchData` changes, so pass either a function
// defined outside the component, or one wrapped in useCallback (see ProjectDetailPage).
export function useSanityData(fetchData) {
  // `source` remembers which fetch function produced the stored result.
  const [result, setResult] = useState({ source: null, data: null, status: 'loading' })

  useEffect(() => {
    // Ignores the result if the component unmounts, or a newer request starts, first.
    let ignore = false

    fetchData()
      .then((data) => {
        if (!ignore) setResult({ source: fetchData, data, status: 'success' })
      })
      .catch((error) => {
        if (ignore) return
        console.error('Failed to load content from Sanity:', error)
        setResult({ source: fetchData, data: null, status: 'error' })
      })

    return () => {
      ignore = true
    }
  }, [fetchData])

  // A result from an older request (e.g. the previous project) counts as still loading.
  if (result.source !== fetchData) {
    return { data: null, status: 'loading' }
  }
  return { data: result.data, status: result.status }
}
