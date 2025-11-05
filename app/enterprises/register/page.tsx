"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { uk } from "@/lib/i18n"

export default function RegisterEnterprisePage() {
  const [formData, setFormData] = useState({
    company_name: "",
    registration_number: "",
    company_type: "",
    company_type_custom: "",
    description: "",
    contact_person: "",
    discord: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      await supabase.from("enterprises").insert([
        {
          company_name: formData.company_name,
          registration_number: formData.registration_number || null,
          company_type: formData.company_type_custom || formData.company_type,
          description: formData.description,
          contact_person: formData.contact_person,
          discord: formData.discord,
          status: "active",
        },
      ])

      setMessage(uk.enterprises.successMessage)
      setFormData({
        company_name: "",
        registration_number: "",
        company_type: "",
        company_type_custom: "",
        description: "",
        contact_person: "",
        discord: "",
      })
    } catch (error) {
      setMessage(uk.enterprises.errorMessage)
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{uk.enterprises.register}</h1>
          <p className="text-muted-foreground">{uk.enterprises.joinRegistry}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{uk.enterprises.registerEnterprise}</CardTitle>
            <CardDescription>Надайте інформацію про ваше підприємство</CardDescription>
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
                    placeholder="Наприклад: Асоціація, Гільдія тощо"
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
                  placeholder={uk.enterprises.businessDescription}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact_person">{uk.enterprises.contactPerson}</Label>
                <Input
                  id="contact_person"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  required
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

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? uk.enterprises.registering : uk.enterprises.register}
              </Button>

              {message && (
                <p className={`text-sm ${message.includes("успішно") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
