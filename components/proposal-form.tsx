"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uk } from "@/lib/i18n"

interface ProposalFormProps {
  tenderId: string
}

export default function ProposalForm({ tenderId }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    company_name: "",
    company_type: "",
    proposer_name: "",
    proposal_amount: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const supabase = createClient()
      await supabase.from("tender_proposals").insert([
        {
          tender_id: tenderId,
          company_name: formData.company_name,
          proposer_name: formData.proposer_name,
          proposer_company_type: formData.company_type,
          proposal_amount: formData.proposal_amount ? Number.parseFloat(formData.proposal_amount) : null,
          status: "submitted",
        },
      ])

      setMessage(uk.proposals.successMessage)
      setFormData({
        company_name: "",
        company_type: "",
        proposer_name: "",
        proposal_amount: "",
      })
    } catch (error) {
      setMessage(uk.proposals.errorMessage)
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="proposer_name">{uk.proposals.yourName}</Label>
        <Input
          id="proposer_name"
          name="proposer_name"
          value={formData.proposer_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="company_name">{uk.proposals.companyName}</Label>
        <Input id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="company_type">{uk.proposals.companyType}</Label>
        <Input
          id="company_type"
          name="company_type"
          value={formData.company_type}
          onChange={handleChange}
          placeholder="Наприклад: ТОВ, ФОП, Кооператив тощо"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="proposal_amount">{uk.proposals.proposedAmount}</Label>
        <Input
          id="proposal_amount"
          name="proposal_amount"
          type="number"
          step="0.01"
          value={formData.proposal_amount}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? uk.proposals.submitting : uk.proposals.submit}
      </Button>

      {message && (
        <p className={`text-sm ${message.includes("успішно") ? "text-green-600" : "text-red-600"}`}>{message}</p>
      )}
    </form>
  )
}
