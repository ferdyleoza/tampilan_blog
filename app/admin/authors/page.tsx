"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { mockAuthors, mockArticles } from "@/lib/mock-data"
import { Plus, Edit, Trash2 } from "lucide-react"

export default function AdminAuthorsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAuthor, setNewAuthor] = useState({ name: "", email: "" })
  const { toast } = useToast()

  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: "Author added successfully!",
    })
    setIsAddDialogOpen(false)
    setNewAuthor({ name: "", email: "" })
  }

  const handleDelete = (id: string) => {
    toast({
      title: "Success",
      description: "Author deleted successfully!",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Authors</h1>
            <p className="text-muted-foreground">Manage blog authors</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Author
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Author</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAuthor} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newAuthor.name}
                    onChange={(e) => setNewAuthor((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAuthor.email}
                    onChange={(e) => setNewAuthor((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter author email"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Author</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Articles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuthors.map((author) => {
                const articleCount = mockArticles.filter((article) => article.author === author.name).length
                return (
                  <TableRow key={author.id}>
                    <TableCell className="font-mono text-sm">{author.id}</TableCell>
                    <TableCell className="font-medium">{author.name}</TableCell>
                    <TableCell>{author.email}</TableCell>
                    <TableCell>{articleCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(author.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}
