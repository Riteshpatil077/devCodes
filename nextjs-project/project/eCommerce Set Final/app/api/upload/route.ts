import { NextResponse } from "next/server"
//import { writeFile, mkdir } from "fs/promises"
//import path from "path"
import { put } from "@vercel/blob"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = jwt.verify(token, process.env.JWT_SECRET!)

    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.formData()
    const file = data.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // --- LOCAL UPLOAD ---
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    // Ensure the file name is URL-safe and unique
    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-')}`
    const filepath = path.join(uploadDir, uniqueFilename)

    await writeFile(filepath, buffer)
    const fileUrl = `/uploads/${uniqueFilename}`

    // --- VERCEL BLOB UPLOAD (Commented out as requested) ---
    // const blob = await put(file.name, file, {
    //   access: "public",
    // })
    // const fileUrl = blob.url

    return NextResponse.json({
      message: "Upload successful",
      fileUrl: fileUrl,
    })
  } catch (error) {
    console.error("UPLOAD ERROR:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}