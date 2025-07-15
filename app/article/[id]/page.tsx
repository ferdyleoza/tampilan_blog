"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { mockArticles, mockComments } from "@/lib/mock-data"
import { CalendarDays, User } from "lucide-react"

export default function ArticlePage() {
  const params = useParams()
  const { toast } = useToast()
  const [newComment, setNewComment] = useState({ name: "", text: "" })

  const article = mockArticles.find((a) => a.id === params.id)
  const articleComments = mockComments.filter((c) => c.articleId === params.id)

  if (!article) {
    return <div>Article not found</div>
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.name.trim() || !newComment.text.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Comment submitted successfully!",
    })
    setNewComment({ name: "", text: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="mb-12">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>{article.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </article>

        <section>
          <h2 className="text-2xl font-bold mb-6">Comments ({articleComments.length})</h2>

          <div className="space-y-4 mb-8">
            {articleComments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{comment.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      {comment.date}
                      {comment.editedBy && <span className="ml-2 text-orange-600">*edited by admin</span>}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{comment.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add a Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your name"
                    value={newComment.name}
                    onChange={(e) => setNewComment((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your comment"
                    value={newComment.text}
                    onChange={(e) => setNewComment((prev) => ({ ...prev, text: e.target.value }))}
                    rows={4}
                  />
                </div>
                <Button type="submit">Submit Comment</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
