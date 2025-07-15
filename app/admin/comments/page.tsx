"use client"

import type React from "react"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { mockComments } from "@/lib/mock-data"
import { Edit, Trash2 } from "lucide-react"

export default function AdminCommentsPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingComment, setEditingComment] = useState({ id: "", text: "" })
  const { toast } = useToast()

  const handleEditComment = (comment: any) => {
    setEditingComment({ id: comment.id, text: comment.text })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success",
      description: "Comment updated successfully!",
    })
    setIsEditDialogOpen(false)
    setEditingComment({ id: "", text: "" })
  }

  const handleDelete = (id: string) => {
    toast({
      title: "Success",
      description: "Comment deleted successfully!",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Comments</h1>
          <p className="text-muted-foreground">Manage user comments</p>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Article</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-mono text-sm">{comment.id}</TableCell>
                  <TableCell className="font-medium">{comment.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{comment.text}</TableCell>
                  <TableCell>Article #{comment.articleId}</TableCell>
                  <TableCell>{comment.date}</TableCell>
                  <TableCell>
                    {comment.editedBy ? (
                      <Badge variant="secondary">Edited by admin</Badge>
                    ) : (
                      <Badge variant="default">Original</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditComment(comment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(comment.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Comment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comment">Comment Text</Label>
                <Textarea
                  id="comment"
                  value={editingComment.text}
                  onChange={(e) => setEditingComment((prev) => ({ ...prev, text: e.target.value }))}
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
