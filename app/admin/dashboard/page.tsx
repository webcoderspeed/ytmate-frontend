"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, Trash2, Search, FileText, Save, Eye, LogOut, TagIcon } from "lucide-react"

// Mock blog data
const initialBlogs = [
  {
    id: 1,
    slug: "how-to-download-youtube-videos",
    title: "How to Download YouTube Videos in 2023",
    excerpt: "Learn the easiest and fastest ways to download YouTube videos in various formats and qualities.",
    content: "Full content here...",
    date: "May 15, 2023",
    author: "Rahul Sharma",
    tags: ["YouTube", "Download", "Tutorial"],
  },
  {
    id: 2,
    slug: "instagram-reels-downloader-guide",
    title: "Complete Guide to Downloading Instagram Reels",
    excerpt: "Everything you need to know about downloading and saving Instagram Reels to your device.",
    content: "Full content here...",
    date: "June 22, 2023",
    author: "Priya Patel",
    tags: ["Instagram", "Reels", "Social Media"],
  },
  {
    id: 3,
    slug: "convert-videos-to-mp3",
    title: "How to Convert Videos to MP3 Audio Files",
    excerpt: "A step-by-step guide to extracting audio from videos and converting them to MP3 format.",
    content: "Full content here...",
    date: "July 10, 2023",
    author: "Amit Kumar",
    tags: ["Audio", "Conversion", "MP3"],
  },
]

interface Blog {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
}

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all-posts")
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [newTagInput, setNewTagInput] = useState("")

  const router = useRouter()

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleLogout = () => {
    // In a real app, you would clear cookies or tokens here
    router.push("/admin")
  }

  const handleCreateNew = () => {
    const newBlog: Blog = {
      id: blogs.length + 1,
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      author: "Admin",
      tags: [],
    }
    setEditingBlog(newBlog)
    setActiveTab("editor")
    setPreviewMode(false)
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setActiveTab("editor")
    setPreviewMode(false)
  }

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const handleSave = () => {
    if (!editingBlog) return

    // Validate required fields
    if (!editingBlog.title || !editingBlog.content || !editingBlog.slug) {
      alert("Please fill in all required fields: title, content, and slug.")
      return
    }

    // Check if it's a new blog or an existing one
    const isNewBlog = !blogs.some((blog) => blog.id === editingBlog.id)

    if (isNewBlog) {
      setBlogs([...blogs, editingBlog])
    } else {
      setBlogs(blogs.map((blog) => (blog.id === editingBlog.id ? editingBlog : blog)))
    }

    setActiveTab("all-posts")
    setEditingBlog(null)
  }

  const handleAddTag = () => {
    if (!editingBlog || !newTagInput.trim()) return

    // Don't add duplicate tags
    if (!editingBlog.tags.includes(newTagInput.trim())) {
      setEditingBlog({
        ...editingBlog,
        tags: [...editingBlog.tags, newTagInput.trim()],
      })
    }

    setNewTagInput("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingBlog) return

    setEditingBlog({
      ...editingBlog,
      tags: editingBlog.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your blog posts and content</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger
                value="all-posts"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Posts
              </TabsTrigger>
              <TabsTrigger
                value="editor"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {editingBlog && editingBlog.id <= blogs.length ? "Edit Post" : "New Post"}
              </TabsTrigger>
            </TabsList>

            {activeTab === "all-posts" && (
              <Button
                onClick={handleCreateNew}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> New Post
              </Button>
            )}

            {activeTab === "editor" && (
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? <Edit className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {previewMode ? "Edit" : "Preview"}
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Save className="mr-2 h-4 w-4" /> Save Post
                </Button>
              </div>
            )}
          </div>

          <TabsContent value="all-posts" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredBlogs.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-40">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No blog posts found</p>
                  <Button variant="link" onClick={handleCreateNew} className="mt-2">
                    Create your first post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredBlogs.map((blog) => (
                  <Card key={blog.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                            <span>{blog.date}</span>
                            <span>By {blog.author}</span>
                            <span>Slug: {blog.slug}</span>
                          </div>
                          <p className="text-muted-foreground line-clamp-2 mb-3">{blog.excerpt}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-full"
                              >
                                <TagIcon className="h-3 w-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/blogs/${blog.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only md:not-sr-only md:ml-2">View</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="editor">
            {editingBlog && (
              <div className="space-y-6">
                {previewMode ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">{editingBlog.title || "Untitled Post"}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{editingBlog.date}</span>
                          <span>By {editingBlog.author}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {editingBlog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-full"
                            >
                              <TagIcon className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {editingBlog.content.split("\n").map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>{editingBlog.id <= blogs.length ? "Edit Post" : "Create New Post"}</CardTitle>
                      <CardDescription>Fill in the details for your blog post</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                          Title *
                        </label>
                        <Input
                          id="title"
                          placeholder="Enter post title"
                          value={editingBlog.title}
                          onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="slug" className="text-sm font-medium">
                          Slug * (URL-friendly version of title)
                        </label>
                        <Input
                          id="slug"
                          placeholder="enter-post-slug"
                          value={editingBlog.slug}
                          onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="excerpt" className="text-sm font-medium">
                          Excerpt (Short summary)
                        </label>
                        <Textarea
                          id="excerpt"
                          placeholder="Enter a brief summary of your post"
                          rows={2}
                          value={editingBlog.excerpt}
                          onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">
                          Content *
                        </label>
                        <Textarea
                          id="content"
                          placeholder="Write your blog post content here..."
                          rows={15}
                          value={editingBlog.content}
                          onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tags</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editingBlog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center text-xs bg-muted px-2 py-1 rounded-full"
                            >
                              {tag}
                              <button
                                onClick={() => handleRemoveTag(tag)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag"
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                handleAddTag()
                              }
                            }}
                          />
                          <Button variant="outline" onClick={handleAddTag}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setActiveTab("all-posts")
                          setEditingBlog(null)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Save className="mr-2 h-4 w-4" /> Save Post
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
