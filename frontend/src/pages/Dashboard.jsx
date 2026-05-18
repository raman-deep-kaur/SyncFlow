import { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await API.get('dashboard/')
      setData(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-[#080c14] text-white flex justify-center items-center'>
        <div className='flex flex-col items-center gap-3'>
          <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className='text-sm text-slate-400 font-medium tracking-wide'>Fetching workspace metrics...</span>
        </div>
      </div>
    )
  }
  if (!data) {
    return (
      <div className='min-h-screen bg-[#080c14] text-white flex justify-center items-center'>
        <div className='flex flex-col items-center gap-3'>
          <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className='text-sm text-slate-400 font-medium tracking-wide'>Loading dashboard...</span>
        </div>
      </div>
    )
  }
  return (
    <div className='min-h-screen bg-[#080c14] text-white relative pb-12'>
      <Navbar />

      {/* Decorative Orbs */}
      <div className='absolute w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] top-40 left-10 pulse-glow'></div>
      <div className='absolute w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] bottom-10 right-10 pulse-glow'></div>

      <div className='max-w-7xl mx-auto px-8 pt-10 z-10 relative'>
        
        {/* Welcome Header */}
        <div className='bg-gradient-to-r from-slate-900/80 to-slate-950/80 backdrop-blur-md border border-slate-800/60 p-8 rounded-2xl shadow-xl mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div>
            <h1 className='text-3xl font-extrabold tracking-tight text-white font-display mb-1 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent'>
              Workspace Summary
            </h1>
            <p className='text-sm text-slate-400'>
              Track your projects and tasks in real-time.
            </p>
          </div>
          <div className='bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl flex items-center gap-2.5'>
            <span className='w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse'></span>
            <span className='text-xs font-bold text-indigo-300 tracking-wide uppercase'>Live Connection Active</span>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          
          {/* Card 1: Total Tasks */}
          <div className='bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/30 hover:shadow-[0_15px_30px_rgba(99,102,241,0.06)] transition-all duration-300 group hover:scale-[1.02]'>
            <div className='flex justify-between items-start mb-4'>
              <span className='text-xs font-bold text-indigo-400 uppercase tracking-widest'>Total Tasks</span>
              <div className='p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-all'>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className='text-4xl font-extrabold text-white tracking-tight font-display'>
              {data.total_tasks}
            </p>
            <div className='mt-2 text-xs text-slate-500'>Cumulative tasks inside projects</div>
          </div>

          {/* Card 2: Completed */}
          <div className='bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl hover:border-emerald-500/30 hover:shadow-[0_15px_30px_rgba(16,185,129,0.06)] transition-all duration-300 group hover:scale-[1.02]'>
            <div className='flex justify-between items-start mb-4'>
              <span className='text-xs font-bold text-emerald-400 uppercase tracking-widest'>Completed</span>
              <div className='p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-all'>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className='text-4xl font-extrabold text-white tracking-tight font-display'>
              {data.completed_tasks}
            </p>
            <div className='mt-2 text-xs text-slate-500'>Fully closed tasks successfully</div>
          </div>

          {/* Card 3: Pending */}
          <div className='bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl hover:border-amber-500/30 hover:shadow-[0_15px_30px_rgba(245,158,11,0.06)] transition-all duration-300 group hover:scale-[1.02]'>
            <div className='flex justify-between items-start mb-4'>
              <span className='text-xs font-bold text-amber-400 uppercase tracking-widest'>Pending</span>
              <div className='p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-all'>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className='text-4xl font-extrabold text-white tracking-tight font-display'>
              {data.pending_tasks}
            </p>
            <div className='mt-2 text-xs text-slate-500'>Active tasks in the pipelines</div>
          </div>

          {/* Card 4: Overdue */}
          <div className='bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl hover:border-rose-500/30 hover:shadow-[0_15px_30px_rgba(244,63,94,0.06)] transition-all duration-300 group hover:scale-[1.02]'>
            <div className='flex justify-between items-start mb-4'>
              <span className='text-xs font-bold text-rose-400 uppercase tracking-widest'>Overdue</span>
              <div className='p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-all'>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className='text-4xl font-extrabold text-white tracking-tight font-display'>
              {data.overdue_tasks}
            </p>
            <div className='mt-2 text-xs text-slate-500'>Tasks past their set due dates</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
