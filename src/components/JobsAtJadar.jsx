'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/utils/gsapConfig'
import { useGSAP } from '@gsap/react'
import { ChevronRight, LocateIcon, Send } from 'lucide-react'
import { useTranslation } from '@/translations/useTranslation'
import { useAlert } from '@/components/app-components/alert/AlertContext.jsx'
import { getJobList } from '@/data/jobList'
import ParallaxElement from '@/components/ui/effects/ParallaxElement.jsx'
import ShuffleText from '@/components/ui/text/ShuffleText.jsx'
import SplitedText from '@/components/ui/text/SplitedText.jsx'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'
import CloseBtn from '@/components/ui/buttons/CloseBtn.jsx'

const MAX_FILE_MB = 10
const ACCEPTED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const formFields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Jane / John Doe',
  },
  {
    name: 'position',
    label: 'Position',
    type: 'text',
    readOnly: true,
    placeholder: 'Select a job card above',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'name@company.com',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    readOnly: true,
    placeholder: 'Auto-filled from job card',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    required: true,
    placeholder: '+966 5x xxx xxxx',
  },
  {
    name: 'message',
    label: 'Message (optional)',
    type: 'textarea',
    rows: 4,
    maxLength: 1000,
    colSpan: 2,
    placeholder: 'Briefly tell us why you’re a good fit.',
  },
]

const JobsAtJadar = () => {
  const { t } = useTranslation()
  const jobList = getJobList(t)
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const sidebarRef = useRef(null)
  const overlayRef = useRef(null)
  const { showAlert } = useAlert()
  const [selectedJob, setSelectedJob] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [cvFile, setCvFile] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    city: '',
    message: '',
  })

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth < 768) return

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { scale: 0.7 },
          {
            scale: 0.95,
            backgroundColor: 'white',
            duration: 1,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: formRef.current,
              start: 'center center',
              end: '+=800 center',
              scrub: 0.5,
              pin: true,
              pinSpacing: true,
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useGSAP(() => {
    if (!sidebarRef.current) return
    if (sidebarOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      gsap.fromTo(sidebarRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.35, ease: 'power3.out' })
    }
  }, [sidebarOpen])

  const closeSidebar = () => {
    if (!sidebarRef.current) return

    gsap.to(sidebarRef.current, {
      y: '100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setSidebarOpen(false)
        setSelectedJob(null)
      },
    })
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeSidebar(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openJob = (job) => {
    setSelectedJob(job)
    setForm((f) => ({ ...f, position: job.title, city: job.city }))
    setSidebarOpen(true)
  }

  const overlayClick = (e) => {
    if (e.target === overlayRef.current) closeSidebar()
  }

  const onInput = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Please upload a valid file: PDF, DOC, or DOCX.'
    }
    const sizeMb = file.size / (1024 * 1024)
    if (sizeMb > MAX_FILE_MB) {
      return `File too large. Max ${MAX_FILE_MB} MB.`
    }
    return null
  }

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const err = validateFile(file)
    if (err) {
      showAlert(err, 'error')
      return
    }
    setCvFile(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const err = validateFile(file)
    if (err) {
      showAlert(err, 'error')
      return
    }
    setCvFile(file)
  }

  const onDragOver = (e) => e.preventDefault()

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.position) {
      showAlert('Please click a job card to select a position first.', 'error')
      return
    }
    if (!cvFile) {
      showAlert('Please attach your CV (PDF/DOC/DOCX).', 'error')
      return
    }
    // Simulate submit
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      showAlert("Application submitted successfully. We'll be in touch soon!", 'success')
      // Reset only non-position fields
      setForm((f) => ({
        ...f,
        name: '',
        email: '',
        phone: '',
        message: '',
      }))
      setCvFile(null)
    }, 800)
  }

  return (
    <section ref={sectionRef} className="relative w-screen overflow-hidden bg-text text-bg py-12 px-4">
      <ParallaxElement speed={3} direction="opacity" className="font-light text-center mb-18">
        <ParallaxElement>
          <ShuffleText text={t('jobsAtJadar')} tag="h1" className="text-7xl max-md:text-4xl uppercase cursor-default text-main" />

          <p className="text-sm text-bg/75">
            You must <span className="font-semibold">click a job card</span> to view details and auto-fill the application form.
          </p>
        </ParallaxElement>
      </ParallaxElement>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobList.map((job) => (
          <ParallaxElement
            speed={3}
            mobileSpeed={4}
            direction="opacity"
            key={job.id}
            onClick={() => openJob(job)}
            className="group text-left p-6 bg-bg/2 shadow-lg hover:scale-95! duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <LocateIcon className="opacity-70 group-hover:opacity-100 group-hover:text-main group-hover:translate-y-1 duration-300" />
            </div>

            <span className="mt-1 text-bg/50">{job.city}</span>

            <span className="mt-3 text-sm text-gray-600 line-clamp-3">{job.description}</span>

            <div className="mt-4 inline-flex items-center gap-1 text-sm text-main">
              <span>View details</span>
              <ChevronRight />
            </div>
          </ParallaxElement>
        ))}
      </div>

      <div ref={formRef} className="mx-auto my-36 py-24 px-8 bg-text font-light">
        <div className="mb-12 space-y-2">
          <SplitedText text={'Apply to JADAR'} tag="h3" delay={50} className="text-2xl text-main tracking-wide" />
          <p className="text-bg">
            The position and city <span className="text-main">auto-filled</span> when you click a job card above.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formFields
              .filter((f) => f.type !== 'textarea')
              .map((f) => (
                <div key={f.name} className={f.colSpan === 2 ? 'sm:col-span-2' : undefined}>
                  <label className="block text-sm font-medium mb-4">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={onInput}
                    required={!!f.required}
                    readOnly={!!f.readOnly}
                    className={`w-full border border-bg/75 p-3 outline-none focus:ring-2 focus:ring-bg/30 ${
                      f.readOnly ? 'bg-bg/5 text-bg' : ''
                    }`}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
          </div>

          {/* CV */}
          <div>
            <label className="block text-sm font-medium mb-4">Upload CV</label>
            <div
              onDragOver={onDragOver}
              onDrop={onDrop}
              className="relative w-full border-2 border-dashed p-6 text-center hover:border-black/40 transition duration-300"
            >
              <input
                id="cvInput"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload your CV (PDF, DOC, DOCX)"
              />
              <div className="pointer-events-none flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
                  <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                </svg>
                <p className="font-medium">Drag & drop your CV here</p>
                <p className="text-xs text-bg/50">doc, docx, or pdf — max {MAX_FILE_MB} MB</p>
              </div>
            </div>
            {cvFile && (
              <div className="mt-2 flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="truncate">{cvFile.name}</span>
                <button type="button" onClick={() => setCvFile(null)} className="ml-auto text-bg/50 hover:text-black">
                  Remove
                </button>
              </div>
            )}
          </div>

          {formFields
            .filter((f) => f.type === 'textarea')
            .map((f) => (
              <div key={f.name} className={f.colSpan === 2 ? 'sm:col-span-2' : undefined}>
                <label className="block text-sm font-medium mb-4">{f.label}</label>
                <textarea
                  name={f.name}
                  value={form[f.name]}
                  onChange={onInput}
                  rows={f.rows || 3}
                  className="w-full border p-3 outline-none focus:ring-2 focus:ring-black/20"
                  placeholder={f.placeholder}
                  maxLength={f.maxLength}
                />
                {typeof form[f.name] === 'string' && f.maxLength && (
                  <div className="mt-1 text-xs text-bg/50">
                    {form[f.name].length}/{f.maxLength}
                  </div>
                )}
              </div>
            ))}

          <div className="flex items-center gap-2 text-sm">
            <input id="terms" type="checkbox" required />
            <label htmlFor="terms" className="text-gray-600">
              I confirm the information provided is accurate and I agree to JADAR’s terms.
            </label>
          </div>

          <div className="flex">
            <MainBtn
              text={submitting ? 'Submitting...' : 'Submit Application'}
              icon={Send}
              iconPosition="left"
              disabled={submitting}
              look="outline"
              className="bg-bg! text-text border-0"
            />
          </div>

          {!form.position && (
            <p className="mt-3 text-xs text-main/75">Note: Click a job card above to select a position before submitting.</p>
          )}
        </form>
      </div>

      {sidebarOpen && (
        <>
          <div ref={overlayRef} onClick={overlayClick} className="fixed inset-0 z-40 bg-bg/50" aria-hidden="true" />
          <aside
            ref={sidebarRef}
            className="fixed right-0 bottom-0 z-50 size-full h-150 py-16 px-6 bg-text shadow-2xl space-y-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-title"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl mb-3">{selectedJob?.title}</h3>

                <div className="flex items-center gap-2 text-main/75 mb-4">
                  <LocateIcon />
                  <span>{selectedJob?.city}</span>
                </div>
              </div>

              <CloseBtn onClick={closeSidebar} type="sec" className="text-bg! hover:text-text!" />
            </div>

            <p className="text-bg/75">{selectedJob?.description}</p>

            <h4 className="mt-6 mb-2">Requirements</h4>
            <ul className="space-y-2">
              {selectedJob?.requirements?.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mt-1 shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-bg/5 p-4 text-sm text-bg/75">
              Tip: Once you’ve reviewed the role, scroll to the application form below to submit your details.
            </div>
          </aside>
        </>
      )}
    </section>
  )
}

export default JobsAtJadar
