import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-900 px-8 py-4 flex justify-between items-center transition-all duration-300'>
      
      {/* Brand Logo */}
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/10'>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <Link to='/dashboard' className='text-xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-display tracking-tight'>
          SyncFlow
        </Link>
      </div>

      {/* Navigation Links */}
      <div className='flex gap-8'>
        <Link
          to='/dashboard'
          className={`relative text-sm font-semibold tracking-wide py-1.5 transition-all duration-200 ${
            isActive('/dashboard') 
              ? 'text-white font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Dashboard
          {isActive('/dashboard') && (
            <span className='absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md shadow-indigo-500/50' />
          )}
        </Link>

        <Link
          to='/projects'
          className={`relative text-sm font-semibold tracking-wide py-1.5 transition-all duration-200 ${
            isActive('/projects') 
              ? 'text-white font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Projects
          {isActive('/projects') && (
            <span className='absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md shadow-indigo-500/50' />
          )}
        </Link>

        <Link
          to='/tasks'
          className={`relative text-sm font-semibold tracking-wide py-1.5 transition-all duration-200 ${
            isActive('/tasks') 
              ? 'text-white font-bold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Tasks
          {isActive('/tasks') && (
            <span className='absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-md shadow-indigo-500/50' />
          )}
        </Link>
      </div>

      {/* Logout Action */}
      <button
        onClick={logout}
        className='relative overflow-hidden group bg-slate-900 border border-slate-800 hover:border-red-500/30 text-slate-300 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 active:scale-95 shadow-lg'
      >
        <span className='absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
        Logout
      </button>

    </nav>
  )
}

export default Navbar
