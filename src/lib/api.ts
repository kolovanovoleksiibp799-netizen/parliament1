import { supabase } from './supabase'

// User management
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserRole() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase.from('users').select('role').eq('id', user.id).single()
  return data?.role
}

export async function getAllUsers() {
  const { data } = await supabase.from('users').select('*')
  return data || []
}

// President
export async function getPresident() {
  const { data } = await supabase.from('president').select('*').single()
  return data
}

export async function updatePresident(presidentData: any) {
  const { data } = await supabase.from('president').update(presidentData).select().single()
  return data
}

// Staff
export async function getAllStaff() {
  const { data } = await supabase.from('staff').select('*').eq('status', 'active')
  return data || []
}

export async function createStaff(staffData: any) {
  const { data } = await supabase.from('staff').insert([staffData]).select().single()
  return data
}

export async function updateStaff(id: string, staffData: any) {
  const { data } = await supabase.from('staff').update(staffData).eq('id', id).select().single()
  return data
}

export async function deleteStaff(id: string) {
  await supabase.from('staff').delete().eq('id', id)
}

// Media
export async function getAllMedia(limit?: number) {
  let query = supabase.from('media').select('*').order('date_published', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data } = await query
  return data || []
}

export async function createMedia(mediaData: any) {
  const { data } = await supabase.from('media').insert([mediaData]).select().single()
  return data
}

export async function updateMedia(id: string, mediaData: any) {
  const { data } = await supabase.from('media').update(mediaData).eq('id', id).select().single()
  return data
}

export async function deleteMedia(id: string) {
  await supabase.from('media').delete().eq('id', id)
}

// Legislation
export async function getAllLegislation() {
  const { data } = await supabase.from('legislation').select('*').order('date_proposed', { ascending: false })
  return data || []
}

export async function createLegislation(legData: any) {
  const { data } = await supabase.from('legislation').insert([legData]).select().single()
  return data
}

export async function updateLegislation(id: string, legData: any) {
  const { data } = await supabase.from('legislation').update(legData).eq('id', id).select().single()
  return data
}

export async function deleteLegislation(id: string) {
  await supabase.from('legislation').delete().eq('id', id)
}

// Tenders
export async function getAllTenders() {
  const { data } = await supabase.from('tenders').select('*').eq('status', 'open').order('deadline', { ascending: true })
  return data || []
}

export async function getTenderWithProposals(tenderId: string) {
  const { data } = await supabase.from('tenders').select(`
    *,
    tender_proposals (
      id,
      proposer_name,
      company_name,
      company_type,
      proposal_amount,
      status,
      created_at
    )
  `).eq('id', tenderId).single()
  return data
}

export async function createTender(tenderData: any) {
  const { data } = await supabase.from('tenders').insert([tenderData]).select().single()
  return data
}

export async function updateTender(id: string, tenderData: any) {
  const { data } = await supabase.from('tenders').update(tenderData).eq('id', id).select().single()
  return data
}

export async function createProposal(proposalData: any) {
  const { data } = await supabase.from('tender_proposals').insert([proposalData]).select().single()
  return data
}

// Enterprises
export async function getAllEnterprises() {
  const { data } = await supabase.from('enterprises').select('*').eq('status', 'active')
  return data || []
}

// Advocacy
export async function getAllAdvocates() {
  const { data } = await supabase.from('advocates').select('*').order('full_name', { ascending: true })
  return data || []
}

export async function createAdvocate(advocateData: any) {
  const { data } = await supabase.from('advocates').insert([advocateData]).select().single()
  return data
}

export async function updateAdvocate(id: string, advocateData: any) {
  const { data } = await supabase.from('advocates').update(advocateData).eq('id', id).select().single()
  return data
}

export async function deleteAdvocate(id: string) {
  await supabase.from('advocates').delete().eq('id', id)
}

// Lectures
export async function getAllLectures() {
  const { data } = await supabase.from('lectures').select('*').order('created_at', { ascending: false })
  return data || []
}

export async function createLecture(lectureData: any) {
  const { data } = await supabase.from('lectures').insert([lectureData]).select().single()
  return data
}

export async function updateLecture(id: string, lectureData: any) {
  const { data } = await supabase.from('lectures').update(lectureData).eq('id', id).select().single()
  return data
}

export async function deleteLecture(id: string) {
  await supabase.from('lectures').delete().eq('id', id)
}
