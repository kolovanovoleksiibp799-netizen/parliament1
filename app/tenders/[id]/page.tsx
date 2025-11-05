import { getTenderWithProposals } from "@/lib/database"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProposalForm from "@/components/proposal-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { uk } from "@/lib/i18n"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function TenderDetailPage({ params }: PageProps) {
  const { id } = await params
  const tender = await getTenderWithProposals(id)

  if (!tender) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-muted-foreground">{uk.tenders.notFound}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{tender.title}</h1>
          <p className="text-muted-foreground">{tender.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{uk.tenders.budget}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{tender.budget?.toLocaleString("uk-UA")} грн</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{uk.tenders.deadline}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{new Date(tender.deadline).toLocaleDateString("uk-UA")}</p>
            </CardContent>
          </Card>
        </div>

        {new Date(tender.deadline) > new Date() && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{uk.tenders.submitProposal}</CardTitle>
              <CardDescription>
                {uk.tenders.deadline}: {new Date(tender.deadline).toLocaleDateString("uk-UA")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProposalForm tenderId={id} />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>{uk.tenders.submittedProposals}</CardTitle>
            <CardDescription>
              {tender.tender_proposals?.length || 0} {uk.tenders.proposalsReceived}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tender.tender_proposals && tender.tender_proposals.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{uk.tenders.company}</TableHead>
                    <TableHead>{uk.tenders.proposer}</TableHead>
                    <TableHead>{uk.tenders.amount}</TableHead>
                    <TableHead>{uk.tenders.status}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tender.tender_proposals.map((proposal: any) => (
                    <TableRow key={proposal.id}>
                      <TableCell>{proposal.company_name}</TableCell>
                      <TableCell>{proposal.proposer_name}</TableCell>
                      <TableCell>
                        {proposal.proposal_amount ? `${proposal.proposal_amount.toLocaleString("uk-UA")} грн` : "—"}
                      </TableCell>
                      <TableCell>{proposal.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">{uk.tenders.noProposals}</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
