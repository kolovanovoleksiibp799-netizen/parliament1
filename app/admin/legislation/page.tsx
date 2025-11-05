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

interface Legislation {
  id: string
  title: string
  description: string | null
  status: string
  date_proposed: string | null
}

export default function LegislationManagement() {
  const [legislation, setLegislation] = useState<Legislation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    original_url: "",
    status: "proposed",
  })

  useEffect(() => {
    fetchLegislation()
  }, [])

  const fetchLegislation = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("legislation").select("*").order("date_proposed", { ascending: false })
    setLegislation(data || [])
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
      await supabase.from("legislation").insert([
        {
          ...formData,
          date_proposed: new Date().toISOString(),
        },
      ])

      setFormData({
        title: "",
        description: "",
        content: "",
        original_url: "",
        status: "proposed",
      })
      setShowForm(false)
      fetchLegislation()
    } catch (error) {
      console.error("Error adding legislation:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("legislation").delete().eq("id", id)
      fetchLegislation()
    } catch (error) {
      console.error("Error deleting legislation:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  const statusText: Record<string, string> = {
    proposed: "Запропоновано",
    passed: "Прийнято",
    rejected: "Відхилено",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.management.legislation}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Додати новий закон</CardTitle>
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

              <div className="grid gap-2">
                <Label htmlFor="content">Повний текст</Label>
                <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={5} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="original_url">Посилання на оригінал</Label>
                <Input
                  id="original_url"
                  name="original_url"
                  type="url"
                  value={formData.original_url}
                  onChange={handleChange}
                  placeholder="https://example.com/law"
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
                  <option value="proposed">Запропоновано</option>
                  <option value="passed">Прийнято</option>
                  <option value="rejected">Відхилено</option>
                </select>
              </div>

              <Button type="submit">{uk.management.addNew}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{uk.pages.legislation}</CardTitle>
          <CardDescription>{legislation.length} елементів</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.management.name}</TableHead>
                <TableHead>{uk.management.status}</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legislation.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {statusText[item.status] || item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.date_proposed ? new Date(item.date_proposed).toLocaleDateString("uk-UA") : "—"}
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
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
