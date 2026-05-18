import { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await API.get('projects/')
      setProjects(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const createProject = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSubmitting(true)
    try {
      await API.post('projects/', form)
      setForm({ name: '', description: '' })
      fetchProjects()
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#080c14] text-white pb-16 relative'>
      <Navbar />

      {/* Background Decoratives */}
      <div className='absolute w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] top-20 left-10 pulse-glow'></div>
      <div className='absolute w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] bottom-10 right-10 pulse-glow'></div>

      <div className='max-w-7xl mx-auto px-8 pt-10 relative z-10'>
        
        {/* Page Header */}
        <div className='mb-10'>
          <h1 className='text-3xl font-extrabold tracking-tight text-white font-display bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent'>
            Project Board
          </h1>
          <p className='text-sm text-slate-400 mt-1'>
            Manage and organize collaborative workspaces.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          
          {/* Create Project Column */}
          <div className='lg:col-span-1 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl shadow-xl'>
            <h2 className='text-xl font-bold mb-4 font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2.5'>
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Workspace
            </h2>

            <form onSubmit={createProject} className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>
                  Project Name
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter workspace title'
                  required
                  value={form.name}
                  onChange={handleChange}
                  className='w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-700 text-sm'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>
                  Description
                </label>
                <textarea
                  name='description'
                  placeholder='Summarize project objectives'
                  required
                  rows='4'
                  value={form.description}
                  onChange={handleChange}
                  className='w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-700 text-sm resize-none'
                />
              </div>

              <button
                type='submit'
                disabled={submitting}
                className='w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 text-sm flex justify-center items-center'
              >
                {submitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Create Project'
                )}
              </button>
            </form>
          </div>

          {/* Project List Column */}
          <div className='lg:col-span-2'>
            {loading ? (
              <div className='flex justify-center py-20'>
                <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : projects.length === 0 ? (
              <div className='bg-slate-900/20 border border-dashed border-slate-800 p-16 rounded-2xl text-center'>
                <div className='w-14 h-14 bg-slate-900 border border-slate-800 text-slate-500 rounded-xl flex items-center justify-center mx-auto mb-4'>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 className='text-lg font-bold text-white font-display mb-1'>No workspaces found</h3>
                <p className='text-sm text-slate-500 max-w-sm mx-auto'>Create your first collaborative team board using the form on the left to start assigning tasks.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className='relative overflow-hidden bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl hover:border-indigo-500/20 hover:shadow-[0_15px_30px_rgba(99,102,241,0.04)] transition-all duration-300 group hover:scale-[1.02]'
                  >
                    {/* Folder indicator */}
                    <div className='w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-all'>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>

                    <h3 className='text-lg font-bold text-white font-display group-hover:text-indigo-400 transition-colors duration-200'>
                      {project.name}
                    </h3>
                    
                    <p className='mt-2 text-sm text-slate-400 line-clamp-3 leading-relaxed'>
                      {project.description}
                    </p>

                    <div className='mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500'>
                      <span className='flex items-center gap-1.5'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                        Admin Workspace
                      </span>
                      <span>Project ID: #{project.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Projects
