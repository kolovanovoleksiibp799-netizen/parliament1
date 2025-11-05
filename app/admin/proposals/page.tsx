"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { uk } from "@/lib/i18n"

interface TenderProposal {
  id: string
  tender_id: string
  company_name: string
  proposer_name: string
  proposer_company_type: string | null
  proposal_amount: number | null
  status: string
  created_at: string
}

interface Tender {
  id: string
  title: string
}

export default function ProposalsManagement() {
  const [proposals, setProposals] = useState<TenderProposal[]>([])
  const [tenders, setTenders] = useState<Tender[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProposals()
    fetchTenders()
  }, [])

  const fetchProposals = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("tender_proposals").select("*").order("created_at", { ascending: false })
    setProposals(data || [])
    setIsLoading(false)
  }

  const fetchTenders = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("tenders").select("id, title")
    setTenders(data || [])
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    const supabase = createClient()
    try {
      await supabase.from("tender_proposals").update({ status: newStatus }).eq("id", id)
      fetchProposals()
    } catch (error) {
      console.error("Error updating proposal:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("tender_proposals").delete().eq("id", id)
      fetchProposals()
    } catch (error) {
      console.error("Error deleting proposal:", error)
    }
  }

  const getTenderTitle = (tenderId: string) => {
    return tenders.find((t) => t.id === tenderId)?.title || "—"
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Керування пропозиціями тендерів</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{uk.tenders.submittedProposals}</CardTitle>
          <CardDescription>{proposals.length} пропозицій</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тендер</TableHead>
                <TableHead>Компанія</TableHead>
                <TableHead>Учасник</TableHead>
                <TableHead>Тип компанії</TableHead>
                <TableHead>Сума (грн)</TableHead>
                <TableHead>{uk.management.status}</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{getTenderTitle(proposal.tender_id)}</TableCell>
                  <TableCell>{proposal.company_name}</TableCell>
                  <TableCell>{proposal.proposer_name}</TableCell>
                  <TableCell>{proposal.proposer_company_type}</TableCell>
                  <TableCell>
                    {proposal.proposal_amount ? `${proposal.proposal_amount.toLocaleString("uk-UA")} грн` : "—"}
                  </TableCell>
                  <TableCell>
                    <select
                      value={proposal.status}
                      onChange={(e) => handleStatusChange(proposal.id, e.target.value)}
                      className="border border-border rounded px-2 py-1 bg-background text-foreground text-sm"
                    >
                      <option value="submitted">Подано</option>
                      <option value="reviewed">Розглянуто</option>
                      <option value="accepted">Прийнято</option>
                      <option value="rejected">Відхилено</option>
                    </select>
                  </TableCell>
                  <TableCell>{new Date(proposal.created_at).toLocaleDateString("uk-UA")}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(proposal.id)}>
                      {uk.management.delete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
