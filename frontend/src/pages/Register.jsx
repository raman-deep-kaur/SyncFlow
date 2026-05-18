import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../services/api'

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
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
      await API.post('register/', form)
      alert('Registration successful! Please login.')
      navigate('/')
    } catch (err) {
      alert('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative flex justify-center items-center h-screen bg-[#060813] overflow-hidden'>
      {/* Dynamic Glowing Background Orbs */}
      <div className='absolute w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] -top-20 -left-20 pulse-glow'></div>
      <div className='absolute w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] -bottom-20 -right-20 pulse-glow'></div>

      <div className='w-full max-w-md px-6 z-10'>
        <div className='bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]'>
          
          {/* Logo & Brand Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-400 to-indigo-500 shadow-lg shadow-emerald-500/20 mb-3'>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className='text-3xl font-extrabold tracking-tight text-white mb-1 font-display bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent'>
              Create Account
            </h1>
            <p className='text-sm text-slate-400'>Join SyncFlow Task Hub</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5'>
                Username
              </label>
              <input
                type='text'
                name='username'
                placeholder='Choose username'
                required
                className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-600 text-sm'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                placeholder='Enter email'
                required
                className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-600 text-sm'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5'>
                Password
              </label>
              <input
                type='password'
                name='password'
                placeholder='Choose password'
                required
                className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-600 text-sm'
                onChange={handleChange}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-emerald-500 to-indigo-500 hover:from-emerald-600 hover:to-indigo-600 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 text-sm mt-4 flex justify-center items-center'
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className='pt-2 text-center text-sm text-slate-400'>
              Already have an account?
              <Link to='/' className='text-emerald-400 font-semibold hover:text-emerald-300 ml-1.5 transition-all'>
                Login
              </Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Register
