export type Language = 'en' | 'sq'

export type MunicipalityId =
  | 'prishtina'
  | 'prizren'
  | 'peja'
  | 'gjakova'
  | 'mitrovica'
  | 'gjilan'
  | 'ferizaj'
  | 'podujeva'
  | 'istog'
  | 'decan'
  | 'fushe-kosove'
  | 'vushtrri'
  | 'suhareka'
  | 'lipjan'
  | 'obiliq'
  | 'drenas'

export type AlertType = 'Critical' | 'Maintenance' | 'Information'

export type ServiceStatus =
  | 'Operational'
  | 'Degraded'
  | 'Outage'
  | 'Maintenance'
  | 'Scheduled'
  | 'Minor Delays'

export type ReportCategory =
  | 'Roads'
  | 'Waste'
  | 'Water'
  | 'Electricity'
  | 'Street Lighting'
  | 'Public Transport'
  | 'Accessibility'
  | 'Safety'
  | 'Parks and Public Areas'

export type Urgency = 'Low' | 'Medium' | 'High'

export type ReportStatus = 'Received' | 'Under Review' | 'In Progress' | 'Resolved'

export type EventCategory =
  | 'Children'
  | 'Youth'
  | 'Adults'
  | 'Technology'
  | 'Culture'
  | 'Environment'
  | 'Sports'
  | 'Education'

export type OpportunityType =
  | 'Internships'
  | 'Volunteering'
  | 'Scholarships'
  | 'Municipal Jobs'
  | 'Youth Programmes'
  | 'Kosovo–U.S. Opportunities'

export interface Municipality {
  id: MunicipalityId
  name: string
  nameSq: string
  region: string
}

export interface Alert {
  id: string
  type: AlertType
  title: string
  titleSq: string
  location: string
  municipalityId: MunicipalityId
  time: string
  description: string
  descriptionSq: string
  estimatedRestoration?: string
}

export interface ServiceUpdate {
  time: string
  message: string
  messageSq: string
}

export interface CityService {
  id: string
  name: string
  nameSq: string
  status: ServiceStatus
  municipalityId: MunicipalityId
  lastUpdated: string
  description: string
  descriptionSq: string
  icon: 'zap' | 'droplets' | 'wifi' | 'trash' | 'bus' | 'road'
  affectedAreas: string[]
  affectedAreasSq: string[]
  tips: string[]
  tipsSq: string[]
  contact: string
  hours: string
  hoursSq: string
  updates: ServiceUpdate[]
  relatedAlertIds: string[]
  reportCategory: ReportCategory
}

export interface UrbanVital {
  id: string
  label: string
  labelSq: string
  value: string
  valueSq: string
  tone: 'good' | 'moderate' | 'low' | 'alert'
}

export interface CityEvent {
  id: string
  title: string
  titleSq: string
  date: string
  time: string
  location: string
  municipalityId: MunicipalityId
  category: EventCategory
  audience: string
  audienceSq: string
  organiser: string
  description: string
  descriptionSq: string
  shortDescription: string
  shortDescriptionSq: string
  image: string
  featured?: boolean
}

export interface Opportunity {
  id: string
  title: string
  titleSq: string
  organisation: string
  location: string
  municipalityId?: MunicipalityId
  type: OpportunityType
  deadline: string
  description: string
  descriptionSq: string
  shortDescription: string
  shortDescriptionSq: string
  requirements: string[]
  requirementsSq: string[]
}

export interface Report {
  id: string
  municipalityId: MunicipalityId
  category: ReportCategory
  location: string
  description: string
  urgency: Urgency
  status: ReportStatus
  anonymous: boolean
  imageDataUrl?: string
  submittedAt: string
}

export interface UserPreferences {
  language: Language
  municipalityId: MunicipalityId
  district: string
  publicServiceAlerts: boolean
  jobRecommendations: boolean
  eventRecommendations: boolean
  alertCategories: AlertType[]
  savedEventIds: string[]
  savedOpportunityIds: string[]
}

export interface ToastMessage {
  id: string
  type: 'success' | 'info' | 'error'
  message: string
}
