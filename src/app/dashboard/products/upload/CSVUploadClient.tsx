'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { uploadCSV } from './actions'
import { useState } from 'react'

export function CSVUploadClient() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<{ count: number } | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      const result = await uploadCSV(formData) as { success?: boolean; count?: number; error?: string }
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess({ count: result.count || 0 })
      }
    } catch (e: any) {
      setError(e.message || 'Failed to upload CSV')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="mb-6">
        <Link href="/dashboard/products" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Upload Inventory CSV</h1>
        <p className="text-slate-500 mt-1">Bulk import your products to start monitoring for recalls.</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>CSV File Format</CardTitle>
          <CardDescription>
            Your CSV file should have the following column headers. Only "name" is required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mb-6">
            <code className="text-sm text-slate-800 break-all">
              name, brand, sku, barcode, category
            </code>
            <p className="text-xs text-slate-500 mt-2">Example: "Dyson V11 Vacuum", "Dyson", "V11-123", "885566778899", "Appliances"</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200 mb-6 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 mb-6 text-sm flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Successfully imported {success.count} products! Redirecting...
            </div>
          )}

          <form action={handleSubmit} className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">CSV File</Label>
              <div className="flex items-center gap-4">
                <Input id="file" name="file" type="file" accept=".csv" required disabled={loading} className="cursor-pointer" />
              </div>
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload File'}
              {!loading && <Upload className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
