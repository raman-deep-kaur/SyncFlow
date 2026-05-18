import { useEffect, useState } from 'react'
import API from '../services/api'
import Navbar from '../components/Navbar'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    project: '',
    assigned_to: 1,
    due_date: '',
    status: 'TODO'
  })

  useEffect(() => {
    fetchTasks()
    fetchProjects()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await API.get('tasks/')
      setTasks(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const res = await API.get('projects/')
      setProjects(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const createTask = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.project) {
      alert('Please fill in the task title and select a project.')
      return
    }
    setSubmitting(true)
    try {
      await API.post('tasks/', form)
      // reset specific fields but keep project selected for convenience
      setForm(prev => ({
        ...prev,
        title: '',
        description: '',
        due_date: ''
      }))
      fetchTasks()
    } catch (err) {
      console.log(err)
      alert('Only project admins/members can add tasks.')
    } finally {
      setSubmitting(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`tasks/${id}/`, { status })
      fetchTasks()
    } catch (err) {
      console.log(err)
      alert('Error updating status.')
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'IN_PROGRESS':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/5'>
            <span className='w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse'></span>
            In Progress
          </span>
        )
      case 'DONE':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5'>
            <span className='w-1.5 h-1.5 rounded-full bg-emerald-400'></span>
            Completed
          </span>
        )
      default:
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20'>
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400'></span>
            To Do
          </span>
        )
    }
  }

  return (
    <div className='min-h-screen bg-[#080c14] text-white pb-16 relative'>
      <Navbar />

      {/* Decorative Orbs */}
      <div className='absolute w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] top-20 left-10 pulse-glow'></div>
      <div className='absolute w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] bottom-10 right-10 pulse-glow'></div>

      <div className='max-w-7xl mx-auto px-8 pt-10 relative z-10'>
        
        {/* Page Header */}
        <div className='mb-10'>
          <h1 className='text-3xl font-extrabold tracking-tight text-white font-display bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent'>
            Task Hub
          </h1>
          <p className='text-sm text-slate-400 mt-1'>
            Organize task pipelines and delegate activities.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
          
          {/* Create Task Form */}
          <div className='lg:col-span-1 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl shadow-xl'>
            <h2 className='text-xl font-bold mb-4 font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2.5'>
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              New Task
            </h2>

            <form onSubmit={createTask} className='space-y-4'>
              <div>
                <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>
                  Task Title
                </label>
                <input
                  type='text'
                  name='title'
                  placeholder='Enter task summary'
                  required
                  value={form.title}
                  onChange={handleChange}
                  className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-700 text-sm'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>
                  Description
                </label>
                <textarea
                  name='description'
                  placeholder='Enter brief specs'
                  rows='3'
                  value={form.description}
                  onChange={handleChange}
                  className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none placeholder-slate-700 text-sm resize-none'
                />
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>
                  Associated Workspace
                </label>
                <select
                  name='project'
                  required
                  value={form.project}
                  onChange={handleChange}
                  className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none text-sm cursor-pointer'
                >
                  <option value='' className='bg-slate-950 text-slate-500'>Select Workspace</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id} className='bg-slate-950 text-slate-100'>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>
                  Due Date
                </label>
                <input
                  type='date'
                  name='due_date'
                  value={form.due_date}
                  onChange={handleChange}
                  className='w-full bg-slate-950/60 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 px-4 py-3 rounded-xl transition-all outline-none text-sm cursor-pointer'
                />
              </div>

              <button
                type='submit'
                disabled={submitting}
                className='w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 text-sm flex justify-center items-center'
              >
                {submitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Create Task'
                )}
              </button>
            </form>
          </div>

          {/* Tasks Board Column */}
          <div className='lg:col-span-2'>
            {loading ? (
              <div className='flex justify-center py-20'>
                <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : tasks.length === 0 ? (
              <div className='bg-slate-900/20 border border-dashed border-slate-800 p-16 rounded-2xl text-center'>
                <div className='w-14 h-14 bg-slate-900 border border-slate-800 text-slate-500 rounded-xl flex items-center justify-center mx-auto mb-4'>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
                <h3 className='text-lg font-bold text-white font-display mb-1'>No tasks found</h3>
                <p className='text-sm text-slate-500 max-w-sm mx-auto'>Create your first team task using the panel on the left or change active filter scopes.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className='relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl hover:border-slate-700/80 transition-all duration-300 group hover:scale-[1.02] flex flex-col justify-between'
                  >
                    <div>
                      {/* Top Row: Project badge & status */}
                      <div className='flex justify-between items-center mb-4'>
                        <span className='inline-flex px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 uppercase tracking-wider'>
                          Project #{task.project}
                        </span>
                        {getStatusBadge(task.status)}
                      </div>

                      <h3 className='text-lg font-bold text-white font-display group-hover:text-emerald-400 transition-colors duration-200'>
                        {task.title}
                      </h3>

                      <p className='text-slate-400 text-sm mt-2 line-clamp-3 leading-relaxed'>
                        {task.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className='mt-6 pt-4 border-t border-slate-800/60'>
                      
                      {/* Due Date & Assignment info */}
                      <div className='flex items-center gap-4 text-xs text-slate-500 mb-4'>
                        {task.due_date && (
                          <span className='flex items-center gap-1.5'>
                            <svg className="w-4 h-4 text-rose-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {task.due_date}
                          </span>
                        )}
                      </div>

                      {/* Transition Action Buttons */}
                      <div className='flex gap-2.5'>
                        <button
                          onClick={() => updateStatus(task.id, 'TODO')}
                          disabled={task.status === 'TODO'}
                          className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all duration-200 border ${
                            task.status === 'TODO'
                              ? 'bg-slate-950/20 border-slate-900/50 text-slate-600 cursor-not-allowed'
                              : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white active:scale-95'
                          }`}
                        >
                          To Do
                        </button>

                        <button
                          onClick={() => updateStatus(task.id, 'IN_PROGRESS')}
                          disabled={task.status === 'IN_PROGRESS'}
                          className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all duration-200 border ${
                            task.status === 'IN_PROGRESS'
                              ? 'bg-slate-950/20 border-slate-900/50 text-slate-600 cursor-not-allowed'
                              : 'bg-slate-950/80 border-slate-800 hover:border-amber-500/30 hover:text-amber-400 text-slate-300 active:scale-95'
                          }`}
                        >
                          In Progress
                        </button>

                        <button
                          onClick={() => updateStatus(task.id, 'DONE')}
                          disabled={task.status === 'DONE'}
                          className={`flex-1 text-xs font-bold py-2 rounded-xl transition-all duration-200 border ${
                            task.status === 'DONE'
                              ? 'bg-slate-950/20 border-slate-900/50 text-slate-600 cursor-not-allowed'
                              : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 text-slate-300 active:scale-95'
                          }`}
                        >
                          Completed
                        </button>
                      </div>

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

export default Tasks
