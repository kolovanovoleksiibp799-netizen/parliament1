"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { uk } from "@/lib/i18n"

interface President {
  id: string
  name: string
  bio: string | null
  telegram: string | null
  discord: string | null
  image_url: string | null
  official_start_date: string | null
}

export default function PresidentManagement() {
  const [president, setPresident] = useState<President | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    telegram: "",
    discord: "",
    image_url: "",
    official_start_date: "",
  })

  useEffect(() => {
    const fetchPresident = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("president").select("*").single()

      if (data) {
        setPresident(data)
        setFormData({
          name: data.name || "",
          bio: data.bio || "",
          telegram: data.telegram || "",
          discord: data.discord || "",
          image_url: data.image_url || "",
          official_start_date: data.official_start_date || "",
        })
      }
      setIsLoading(false)
    }

    fetchPresident()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const supabase = createClient()
      if (president) {
        const { error } = await supabase
          .from("president")
          .update({
            name: formData.name,
            bio: formData.bio,
            telegram: formData.telegram,
            discord: formData.discord,
            image_url: formData.image_url,
            official_start_date: formData.official_start_date,
          })
          .eq("id", president.id)

        if (error) throw error
      } else {
        await supabase.from("president").insert([
          {
            name: formData.name,
            bio: formData.bio,
            telegram: formData.telegram,
            discord: formData.discord,
            image_url: formData.image_url,
            official_start_date: formData.official_start_date,
          },
        ])
      }
    } catch (error) {
      console.error("Error saving president info:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Завантаження...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{uk.management.president}</CardTitle>
        <CardDescription>Оновіть профіль президента</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">{uk.management.name}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Повне ім'я президента"
            />
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
            <Label htmlFor="discord">Discord</Label>
            <Input
              id="discord"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              placeholder="username#0000"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">{uk.management.description}</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Біографія президента"
              rows={5}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="official_start_date">Дата вступу на посаду</Label>
            <Input
              id="official_start_date"
              name="official_start_date"
              type="date"
              value={formData.official_start_date}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Зберігаємо..." : uk.management.save}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
