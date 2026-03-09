import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from './Container'
import FloatingLabelInput from './FloatingLabelInput'
import InputField from './InputField'
import SelectRole from './SelectRole'
import SubmitButton from './SubmitButton'
import './styles.css'

function Registration() {
  const nav = useNavigate()
  const [theme, setTheme] = useState('dark')
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'Admin' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [apiStatus, setApiStatus] = useState('')
  const [base, setBase] = useState('http://localhost:1111')

  const emailIcon = useMemo(() => (
    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m8 7L4 7v10h16V7l-8 4Z"/></svg>
  ), [])
  const lockIcon = useMemo(() => (
    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 1a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5m3 8V6a3 3 0 1 0-6 0v3Z"/></svg>
  ), [])

  const change = (e) => {
    setForm({ ...form, [e.target.name || e.target.id]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    try {
      const res = await axios.post(`${base}/api/user/register`, form, { withCredentials: true })
      setMessage({ type: 'success', text: res.data })
      setTimeout(() => nav('/log'), 700)
    } catch (err) {
      const status = err?.response?.status
      const data = err?.response?.data
      const network = err?.message
      const text = (typeof data === 'string' && data) || (status ? `Error ${status}` : network) || 'Registration failed'
      setMessage({ type: 'error', text })
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    const probe = async () => {
      try {
        await axios.get('http://localhost:1111/', { timeout: 2500 })
        setBase('http://localhost:1111')
        setApiStatus('online')
      } catch {
        try {
          await axios.get('http://127.0.0.1:1111/', { timeout: 2500 })
          setBase('http://127.0.0.1:1111')
          setApiStatus('online')
        } catch {
          setApiStatus('offline')
        }
      }
    }
    probe()
  }, [])

  return (
    <Container theme={theme}>
      <div className="ui-header" role="banner" aria-label="Registration header">
        <div>
          <div className="ui-title">Create your account</div>
          <div className="ui-subtitle">Premium onboarding for Admin, Hr and Driver</div>
        </div>
        <button className="ui-theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

      <form className="ui-form" onSubmit={submit} aria-describedby="form-hint">
        <FloatingLabelInput id="username" label="Username" value={form.username} onChange={change} required ariaDescribedBy="form-hint" />

        <InputField id="email" name="email" label="Email" type="email" value={form.email} onChange={change} required ariaDescribedBy="form-hint" icon={emailIcon} />

        <InputField id="password" name="password" label="Password" type="password" value={form.password} onChange={change} required ariaDescribedBy="form-hint" icon={lockIcon} />

        <SelectRole value={form.role} onChange={change} ariaDescribedBy="form-hint" />

        <SubmitButton loading={loading}>Register</SubmitButton>

        {message.text ? (
          <div className={`ui-message ${message.type === 'error' ? 'error' : 'success'}`} role="alert">
            {message.text}
          </div>
        ) : null}
      </form>

      <div className="ui-footer" id="form-hint" aria-live="polite">
        <span className="ui-aria-hint">Press Tab to navigate through fields</span>
        <span className="ui-aria-hint">API: {apiStatus || 'checking...'} {apiStatus === 'online' ? `(${base})` : ''}</span>
      </div>
    </Container>
  )
}

export default Registration