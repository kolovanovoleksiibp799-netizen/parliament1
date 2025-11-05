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

interface Tender {
  id: string
  title: string
  description: string | null
  budget: number | null
  deadline: string
  status: string
  category: string | null
}

export default function TendersManagement() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    category: "",
    status: "open",
  })

  useEffect(() => {
    fetchTenders()
  }, [])

  const fetchTenders = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("tenders").select("*").order("deadline", { ascending: true })
    setTenders(data || [])
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
      await supabase.from("tenders").insert([
        {
          title: formData.title,
          description: formData.description,
          budget: formData.budget ? Number.parseFloat(formData.budget) : null,
          deadline: formData.deadline,
          category: formData.category,
          status: formData.status,
          currency: "UAH",
        },
      ])

      setFormData({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        category: "",
        status: "open",
      })
      setShowForm(false)
      fetchTenders()
    } catch (error) {
      console.error("Error adding tender:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("tenders").delete().eq("id", id)
      fetchTenders()
    } catch (error) {
      console.error("Error deleting tender:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.management.tenders}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Створити новий тендер</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">{uk.management.name}</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">{uk.management.description}</Label>
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
                  <Label htmlFor="budget">Бюджет (грн)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    step="0.01"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Категорія</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deadline">Крайній термін</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">{uk.management.status}</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border border-border rounded px-3 py-2 bg-background text-foreground"
                >
                  <option value="open">Відкритий</option>
                  <option value="closed">Закритий</option>
                  <option value="awarded">Визначений переможець</option>
                </select>
              </div>

              <Button type="submit">{uk.management.addNew}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{uk.tenders.title}</CardTitle>
          <CardDescription>{tenders.length} тендерів</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.management.name}</TableHead>
                <TableHead>Бюджет</TableHead>
                <TableHead>Категорія</TableHead>
                <TableHead>{uk.tenders.deadline}</TableHead>
                <TableHead>{uk.management.status}</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenders.map((tender) => (
                <TableRow key={tender.id}>
                  <TableCell className="font-medium">{tender.title}</TableCell>
                  <TableCell>{tender.budget ? `${tender.budget.toLocaleString("uk-UA")} грн` : "—"}</TableCell>
                  <TableCell>{tender.category}</TableCell>
                  <TableCell>{new Date(tender.deadline).toLocaleDateString("uk-UA")}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        tender.status === "open"
                          ? "bg-green-100 text-green-800"
                          : tender.status === "closed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {tender.status === "open" ? "Відкритий" : tender.status === "closed" ? "Закритий" : "Визначений"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(tender.id)}>
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
