import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../services/api'

function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('token/', form)
      localStorage.setItem('token', res.data.access)
      navigate('/dashboard')
    } catch (err) {
      alert('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative flex justify-center items-center h-screen bg-[#060813] overflow-hidden'>
      {/* Dynamic Glowing Background Orbs */}
      <div className='absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] -top-20 -left-20 pulse-glow'></div>
      <div className='absolute w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px] -bottom-20 -right-20 pulse-glow'></div>

      <div className='w-full max-w-md px-6 z-10'>
        <div className='bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]'>
          
          {/* Logo & Brand Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 mb-3'>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h1 className='text-3xl font-extrabold tracking-tight text-white mb-1 font-display bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent'>
              SyncFlow
            </h1>
            <p className='text-sm text-slate-400'>Collaborative Task Hub</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2'>
                Username
              </label>
              <input
                type='text'
                name='username'
                placeholder='Enter username'
                required
                className='w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-600 text-sm'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2'>
                Password
              </label>
              <input
                type='password'
                name='password'
                placeholder='Enter password'
                required
                className='w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-600 text-sm'
                onChange={handleChange}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 text-sm mt-3 flex justify-center items-center'
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>

            <div className='pt-2 text-center text-sm text-slate-400'>
              Don't have an account?
              <Link to='/register' className='text-indigo-400 font-semibold hover:text-indigo-300 ml-1.5 transition-all'>
                Register
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
