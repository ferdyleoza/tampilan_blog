"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ArticleCard } from "@/components/article-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockArticles, mockCategories } from "@/lib/mock-data"

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredArticles =
    selectedCategory === "all" ? mockArticles : mockArticles.filter((article) => article.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Search Articles</h1>
          <div className="max-w-xs">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  )
}
