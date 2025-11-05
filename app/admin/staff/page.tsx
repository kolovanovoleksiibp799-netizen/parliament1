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

interface StaffMember {
  id: string
  name: string
  position: string
  discord: string | null
  department: string | null
  status: string
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    discord: "",
    department: "",
    status: "active",
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("staff").select("*").order("name")
    setStaff(data || [])
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      await supabase.from("staff").insert([formData])

      setFormData({
        name: "",
        position: "",
        discord: "",
        department: "",
        status: "active",
      })
      setShowForm(false)
      fetchStaff()
    } catch (error) {
      console.error("Error adding staff:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("staff").delete().eq("id", id)
      fetchStaff()
    } catch (error) {
      console.error("Error deleting staff:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.management.staff}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Додати члена штабу</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{uk.management.name}</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="position">Посада</Label>
                <Input id="position" name="position" value={formData.position} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="discord">Discord</Label>
                <Input id="discord" name="discord" value={formData.discord} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="department">{uk.staff.department}</Label>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} />
              </div>

              <Button type="submit">Додати члена штабу</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{uk.management.staff}</CardTitle>
          <CardDescription>{staff.length} членів штабу</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.management.name}</TableHead>
                <TableHead>Посада</TableHead>
                <TableHead>{uk.staff.department}</TableHead>
                <TableHead>Discord</TableHead>
                <TableHead>{uk.management.status}</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.position}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>{member.discord}</TableCell>
                  <TableCell>{member.status}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
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
