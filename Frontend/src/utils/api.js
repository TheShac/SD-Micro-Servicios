async function call(url, options) {
  const opts = { headers: { 'Content-Type': 'application/json' }, ...options }
  if (opts.body && typeof opts.body === 'object') opts.body = JSON.stringify(opts.body)
  const res = await fetch(url, opts)
  const text = await res.text()
  let data = text
  try { data = JSON.parse(text) } catch(e){}
  if (!res.ok) throw { status: res.status, data }
  return data
}

export async function post(url, body) {
  return call(url, { method: 'POST', body })
}
