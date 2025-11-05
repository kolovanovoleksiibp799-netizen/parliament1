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

interface Media {
  id: string
  title: string
  description: string | null
  media_type: string
  category: string | null
  date_published: string | null
}

export default function MediaManagement() {
  const [media, setMedia] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "image",
    category: "",
    image_url: "",
  })

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("media").select("*").order("date_published", { ascending: false })
    setMedia(data || [])
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
      await supabase.from("media").insert([
        {
          ...formData,
          date_published: new Date().toISOString(),
        },
      ])

      setFormData({
        title: "",
        description: "",
        media_type: "image",
        category: "",
        image_url: "",
      })
      setShowForm(false)
      fetchMedia()
    } catch (error) {
      console.error("Error adding media:", error)
    }
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    try {
      await supabase.from("media").delete().eq("id", id)
      fetchMedia()
    } catch (error) {
      console.error("Error deleting media:", error)
    }
  }

  if (isLoading) return <div>Завантаження...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{uk.management.media}</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? uk.management.cancel : uk.management.addNew}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Додати новий медіа-контент</CardTitle>
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
                  <Label htmlFor="media_type">Тип медіа</Label>
                  <select
                    id="media_type"
                    name="media_type"
                    value={formData.media_type}
                    onChange={handleChange}
                    className="border border-border rounded px-3 py-2 bg-background text-foreground"
                  >
                    <option value="image">Зображення</option>
                    <option value="video">Відео</option>
                    <option value="document">Документ</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Категорія</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image_url">URL зображення</Label>
                <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} />
              </div>

              <Button type="submit">{uk.management.addNew}</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Бібліотека медіа</CardTitle>
          <CardDescription>{media.length} елементів</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{uk.management.name}</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Категорія</TableHead>
                <TableHead>Опубліковано</TableHead>
                <TableHead>{uk.management.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {media.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.media_type}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.date_published ? new Date(item.date_published).toLocaleDateString("uk-UA") : "Не опублік."}
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
