import {
  getUser,
  getUserRole,
  getAllUsers,
  getPresident,
  getAllStaff,
  getAllMedia,
  getAllLegislation,
  getAllTenders,
  getAllEnterprises,
} from "@/lib/database"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { uk } from "@/lib/i18n"

export default async function AdminDashboard() {
  const user = await getUser()
  const role = await getUserRole()
  const totalUsers = (await getAllUsers()).length
  const president = await getPresident()
  const staffCount = (await getAllStaff()).length
  const mediaCount = (await getAllMedia()).length
  const legislationCount = (await getAllLegislation()).length
  const tendersCount = (await getAllTenders()).length
  const enterprisesCount = (await getAllEnterprises()).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          {uk.admin.welcome}, {user?.email}
        </h2>
        <p className="text-muted-foreground">Роль: {role}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Всього користувачів</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{uk.admin.totalStaff}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{staffCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{uk.admin.totalMedia}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mediaCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{uk.admin.totalLegislation}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{legislationCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{uk.admin.totalTenders}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tendersCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{uk.enterprises.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{enterprisesCount}</p>
          </CardContent>
        </Card>
      </div>

      {president && (
        <Card>
          <CardHeader>
            <CardTitle>{uk.president.title}</CardTitle>
            <CardDescription>Інформація про поточного президента</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">{uk.management.name}:</span> {president.name}
              </p>
              {president.telegram && (
                <p>
                  <span className="font-semibold">Telegram:</span> {president.telegram}
                </p>
              )}
              {president.discord && (
                <p>
                  <span className="font-semibold">Discord:</span> {president.discord}
                </p>
              )}
              {president.official_start_date && (
                <p>
                  <span className="font-semibold">{uk.president.inOffice}</span>{" "}
                  {new Date(president.official_start_date).toLocaleDateString("uk-UA")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
