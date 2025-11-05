"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { uk } from "@/lib/i18n"

interface Enterprise {
  id: string
  company_name: string
  company_type: string | null
  contact_person: string | null
  discord: string | null
  status: string
}

export default function EnterprisesManagement() {
  const [enterprises, setEnterprises] = useState<Enterprise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    company_name: "",
    registration_number: "",
    company_type: "",
    company_type_custom: "",
    description: "",
    contact_person: "",
    discord: "",
    status: "active",
  })

  useEffect(() => {
    fetchEnterprises()
  }, [])

  const fetchEnterprises = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("enterprises").select("*").order("company_name")
    setEnterprises(data || [])
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
      await supabase.from("enterprises").insert([
        {
          company_name: formData.company_name,
          registration_number: formData.registration_number || null,
          company_type: formData.company_type_custom || formData.company_type,
          description: formData.description,
          contact_person: formData.contact_person,
          discord: formData.discord,
          status: formData.status,
        },
      ])

      setFormData({
        company_name: "",
        registration_number: "",
        company_type: "",
        company_type_custom: "",
        description: "",
        contact_person: "",
        discord: "",
        status: "active",
      })
      setShowForm(false)
      fetchEnterprises()
    } catch (error) {
      console.error("Error adding enterprise:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("enterprises").delete().eq("id", id)
      fetchEnterprises()
    } catch (error) {
      console.error("Error deleting enterprise:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.management.enterprises}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Реєстрація нового підприємства</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="company_name">{uk.enterprises.companyName}</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="registration_number">{uk.enterprises.registrationNumber}</Label>
                  <Input
                    id="registration_number"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company_type">Тип компанії (готові варіанти)</Label>
                  <select
                    id="company_type"
                    name="company_type"
                    value={formData.company_type}
                    onChange={handleChange}
                    className="border border-border rounded px-3 py-2 bg-background text-foreground"
                  >
                    <option value="">Виберіть тип</option>
                    <option value="ТОВ">ТОВ</option>
                    <option value="ФОП">ФОП</option>
                    <option value="АТ">АТ</option>
                    <option value="Кооператив">Кооператив</option>
                    <option value="НДО">НДО</option>
                    <option value="custom">Вказати свій тип</option>
                  </select>
                </div>
              </div>

              {formData.company_type === "custom" && (
                <div className="grid gap-2">
                  <Label htmlFor="company_type_custom">Ваш тип компанії</Label>
                  <Input
                    id="company_type_custom"
                    name="company_type_custom"
                    value={formData.company_type_custom}
                    onChange={handleChange}
                    placeholder="Наприклад: Асоціація, Гільдія"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="description">{uk.enterprises.businessDescription}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact_person">{uk.enterprises.contactPerson}</Label>
                  <Input
                    id="contact_person"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    name="discord"
                    value={formData.discord}
                    onChange={handleChange}
                    placeholder="username#0000"
                  />
                </div>
              </div>

              <Button type="submit">{uk.management.addNew}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{uk.management.enterprises}</CardTitle>
          <CardDescription>{enterprises.length} підприємств</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.enterprises.companyName}</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>{uk.enterprises.contactPerson}</TableHead>
                <TableHead>Discord</TableHead>
                <TableHead>{uk.management.status}</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enterprises.map((enterprise) => (
                <TableRow key={enterprise.id}>
                  <TableCell className="font-medium">{enterprise.company_name}</TableCell>
                  <TableCell>{enterprise.company_type}</TableCell>
                  <TableCell>{enterprise.contact_person}</TableCell>
                  <TableCell>{enterprise.discord}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        enterprise.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {enterprise.status === "active" ? "Активний" : "Неактивний"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(enterprise.id)}>
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
