"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { uk } from "@/lib/i18n"

interface Advocate {
  id: string
  full_name: string
  telegram: string
  license_number: string
}

export default function AdvocacyManagement() {
  const [advocates, setAdvocates] = useState<Advocate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    telegram: "",
    license_number: "",
  })

  useEffect(() => {
    fetchAdvocates()
  }, [])

  const fetchAdvocates = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("advocates").select("*").order("full_name", { ascending: true })
    setAdvocates(data || [])
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      await supabase.from("advocates").insert([formData])
      setFormData({ full_name: "", telegram: "", license_number: "" })
      setShowForm(false)
      fetchAdvocates()
    } catch (error) {
      console.error("Error adding advocate:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("advocates").delete().eq("id", id)
      fetchAdvocates()
    } catch (error) {
      console.error("Error deleting advocate:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.advocacy.advocates}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Додати адвоката</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="full_name">{uk.advocacy.fullName}</Label>
                <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="telegram">Telegram</Label>
                <Input
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="license_number">{uk.advocacy.licenseNumber}</Label>
                <Input
                  id="license_number"
                  name="license_number"
                  value={formData.license_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit">{uk.management.addNew}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{uk.advocacy.advocates}</CardTitle>
          <CardDescription>{advocates.length} адвокатів у реєстрі</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.advocacy.fullName}</TableHead>
                <TableHead>Telegram</TableHead>
                <TableHead>{uk.advocacy.licenseNumber}</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {advocates.map((advocate) => (
                <TableRow key={advocate.id}>
                  <TableCell>{advocate.full_name}</TableCell>
                  <TableCell>{advocate.telegram}</TableCell>
                  <TableCell>{advocate.license_number}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(advocate.id)}>
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
