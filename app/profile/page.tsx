import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockComments } from "@/lib/mock-data"
import { User, Mail, MessageSquare } from "lucide-react"

export default function ProfilePage() {
  const userComments = mockComments.filter((c) => c.name === "John Doe")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg">John Doe</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  john.doe@example.com
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Comments</label>
                <p className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {userComments.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userComments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-primary pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">Article #{comment.articleId}</Badge>
                      <span className="text-sm text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-muted-foreground">{comment.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
