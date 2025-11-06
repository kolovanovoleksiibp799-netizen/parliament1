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

interface Lecture {
  id: string
  topic: string
  content: string
  lecturer: string
  created_at: string
}

export default function LecturesManagement() {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    topic: "",
    content: "",
    lecturer: "",
  })

  useEffect(() => {
    fetchLectures()
  }, [])

  const fetchLectures = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("lectures").select("*").order("created_at", { ascending: false })
    setLectures(data || [])
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
      await supabase.from("lectures").insert([formData])
      setFormData({ topic: "", content: "", lecturer: "" })
      setShowForm(false)
      fetchLectures()
    } catch (error) {
      console.error("Error adding lecture:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("lectures").delete().eq("id", id)
      fetchLectures()
    } catch (error) {
      console.error("Error deleting lecture:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.advocacy.lectures}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Додати лекцію</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="topic">{uk.advocacy.topic}</Label>
                <Input id="topic" name="topic" value={formData.topic} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lecturer">{uk.advocacy.lecturer}</Label>
                <Input id="lecturer" name="lecturer" value={formData.lecturer} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">{uk.advocacy.content}</Label>
                <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={6} />
              </div>

              <Button type="submit">{uk.management.addNew}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{uk.advocacy.lectures}</CardTitle>
          <CardDescription>{lectures.length} лекцій</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.advocacy.topic}</TableHead>
                <TableHead>{uk.advocacy.lecturer}</TableHead>
                <TableHead>{uk.advocacy.date}</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lectures.map((lecture) => (
                <TableRow key={lecture.id}>
                  <TableCell>{lecture.topic}</TableCell>
                  <TableCell>{lecture.lecturer}</TableCell>
                  <TableCell>{new Date(lecture.created_at).toLocaleDateString("uk-UA")}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(lecture.id)}>
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
