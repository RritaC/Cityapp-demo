import { useState, type FormEvent } from 'react'
import { CheckCircle2, ImagePlus, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type {
  MunicipalityId,
  ReportCategory,
  Urgency,
} from '../types'
import { municipalities } from '../data/municipalities'
import { useApp } from '../context/AppContext'

const categories: ReportCategory[] = [
  'Roads',
  'Waste',
  'Water',
  'Electricity',
  'Street Lighting',
  'Public Transport',
  'Accessibility',
  'Safety',
  'Parks and Public Areas',
]

const urgencies: Urgency[] = ['Low', 'Medium', 'High']

export function ReportForm() {
  const { tr, municipalityId, addReport, showToast, language } = useApp()
  const locationState = useLocation().state as { category?: ReportCategory } | null
  const [municipality, setMunicipality] = useState<MunicipalityId>(municipalityId)
  const [category, setCategory] = useState<ReportCategory | ''>(
    locationState?.category ?? '',
  )
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [urgency, setUrgency] = useState<Urgency | ''>('')
  const [anonymous, setAnonymous] = useState(false)
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>()
  const [error, setError] = useState('')
  const [submittedId, setSubmittedId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onImageChange = (file: File | null) => {
    if (!file) {
      setImageDataUrl(undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setImageDataUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!category || !location.trim() || !description.trim() || !urgency) {
      setError(tr('validationError'))
      return
    }
    setError('')
    setSubmitting(true)
    window.setTimeout(() => {
      const report = addReport({
        municipalityId: municipality,
        category,
        location: location.trim(),
        description: description.trim(),
        urgency,
        anonymous,
        imageDataUrl,
      })
      setSubmittedId(report.id)
      setSubmitting(false)
      showToast(tr('toastReportSubmitted'))
    }, 500)
  }

  if (submittedId) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 sm:p-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-success">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="font-display text-2xl font-semibold text-navy">
          {tr('successTitle')}
        </h2>
        <p className="mt-2 text-sm text-navy-muted">{tr('successBody')}</p>
        <p className="mt-4 inline-flex rounded-full bg-teal-soft px-4 py-1.5 text-sm font-semibold text-teal-dark">
          {tr('reportId')}: {submittedId}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/reports"
            className="rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-white hover:bg-teal-dark"
          >
            {tr('viewMyReports')}
          </Link>
          <Link
            to="/"
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-navy hover:bg-slate-200"
          >
            {tr('returnHome')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6"
      noValidate
    >
      <div>
        <label htmlFor="municipality" className="mb-1.5 block text-sm font-semibold text-navy">
          {tr('municipality')} <span className="text-critical">*</span>
        </label>
        <select
          id="municipality"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value as MunicipalityId)}
          className="w-full rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-navy ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          required
        >
          {municipalities.map((m) => (
            <option key={m.id} value={m.id}>
              {language === 'sq' ? m.nameSq : m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-navy">
          {tr('reportCategory')} <span className="text-critical">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ReportCategory)}
          className="w-full rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-navy ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          required
        >
          <option value="">{tr('selectCategory')}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-navy">
          {tr('location')} <span className="text-critical">*</span>
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Agim Ramadani Street, District 4"
          className="w-full rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-navy ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-navy">
          {tr('description')} <span className="text-critical">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-navy ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          required
        />
      </div>

      <div>
        <label htmlFor="urgency" className="mb-1.5 block text-sm font-semibold text-navy">
          {tr('urgency')} <span className="text-critical">*</span>
        </label>
        <select
          id="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value as Urgency)}
          className="w-full rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-navy ring-1 ring-slate-200 focus:ring-2 focus:ring-teal"
          required
        >
          <option value="">{tr('selectUrgency')}</option>
          {urgencies.map((u) => (
            <option key={u} value={u}>
              {u === 'Low' ? tr('low') : u === 'Medium' ? tr('medium') : tr('high')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-semibold text-navy">
          {tr('imageUpload')}
        </span>
        {imageDataUrl ? (
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={imageDataUrl}
              alt="Report attachment preview"
              className="h-40 w-full object-cover"
            />
            <button
              type="button"
              onClick={() => setImageDataUrl(undefined)}
              className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-navy shadow"
              aria-label={tr('clearImage')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-sm text-navy-muted hover:border-teal hover:bg-teal-soft/40">
            <ImagePlus className="h-6 w-6 text-teal" aria-hidden />
            {tr('addImage')}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
            />
          </label>
        )}
      </div>

      <label className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
        <span className="text-sm font-medium text-navy">{tr('submitAnonymously')}</span>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="h-5 w-5 rounded accent-teal"
        />
      </label>

      {error ? (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-critical" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-teal py-3.5 text-sm font-semibold text-white hover:bg-teal-dark disabled:opacity-60"
      >
        {submitting ? tr('loading') : tr('submitReport')}
      </button>
    </form>
  )
}
