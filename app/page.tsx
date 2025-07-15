import { Navbar } from "@/components/navbar"
import { ArticleCard } from "@/components/article-card"
import { mockArticles } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Latest Articles</h1>
          <p className="text-muted-foreground">Discover our latest blog posts and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  )
}
