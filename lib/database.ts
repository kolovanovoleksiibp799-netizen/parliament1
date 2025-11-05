import { createClient as createServerClient } from "@/lib/supabase/server"

// User management
export async function getUser() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserRole() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase.from("users").select("role").eq("id", user.id).single()

  return data?.role
}

export async function getAllUsers() {
  const supabase = await createServerClient()
  const { data } = await supabase.from("users").select("*")
  return data || []
}

// President
export async function getPresident() {
  const supabase = await createServerClient()
  const { data } = await supabase.from("president").select("*").single()
  return data
}

// Staff
export async function getAllStaff() {
  const supabase = await createServerClient()
  const { data } = await supabase.from("staff").select("*").eq("status", "active")
  return data || []
}

// Media
export async function getAllMedia(limit?: number) {
  const supabase = await createServerClient()
  let query = supabase.from("media").select("*").order("date_published", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data } = await query
  return data || []
}

// Legislation
export async function getAllLegislation() {
  const supabase = await createServerClient()
  const { data } = await supabase.from("legislation").select("*").order("date_proposed", { ascending: false })
  return data || []
}

// Tenders
export async function getAllTenders() {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("tenders")
    .select("*")
    .eq("status", "open")
    .order("deadline", { ascending: true })
  return data || []
}

export async function getTenderWithProposals(tenderId: string) {
  const supabase = await createServerClient()
  const { data } = await supabase
    .from("tenders")
    .select(`
      *,
      tender_proposals(*)
    `)
    .eq("id", tenderId)
    .single()
  return data
}

// Enterprises
export async function getAllEnterprises() {
  const supabase = await createServerClient()
  const { data } = await supabase.from("enterprises").select("*").eq("status", "active")
  return data || []
}
