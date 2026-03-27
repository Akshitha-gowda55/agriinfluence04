'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, Sparkles, Leaf, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

type AiResult = {
  prediction: string
  confidence: number
  suggestion: string
}

type SuggestionData = {
  prediction: string
  type: string
  recommendedTreatment: string
  recommendedProduct: string
  productSlug: string
  careAdvice: string[]
}

function getSuggestion(disease?: string): SuggestionData | null {
  if (!disease) return null

  const normalized = disease.toLowerCase()

  if (normalized === 'black_spot') {
    return {
      prediction: 'Black Spot',
      type: 'Fungal disease',
      recommendedTreatment: 'Apply a copper-based fungicide spray.',
      recommendedProduct: 'Rose Fungicide Spray',
      productSlug: 'rose-fungicide-spray',
      careAdvice: [
        'Remove infected leaves immediately',
        'Avoid watering directly on leaves',
        'Keep proper spacing for good air circulation',
      ],
    }
  }

  if (normalized === 'uncertain') {
    return {
      prediction: 'Uncertain',
      type: 'Low-confidence result',
      recommendedTreatment:
        'Please upload a clearer close-up image of the rose leaf.',
      recommendedProduct: 'No product recommended',
      productSlug: '',
      careAdvice: [
        'Use a clear image in good lighting',
        'Focus on a single affected leaf',
        'Avoid blurry or distant plant photos',
      ],
    }
  }

  if (normalized === 'powdery_mildew') {
    return {
      prediction: 'Powdery Mildew',
      type: 'Fungal disease',
      recommendedTreatment:
        'Apply mildew control spray or sulfur-based treatment.',
      recommendedProduct: 'Mildew Control Spray',
      productSlug: 'mildew-control-spray',
      careAdvice: [
        'Remove affected leaf areas',
        'Reduce excess humidity around the plant',
        'Keep the plant in good sunlight and airflow',
      ],
    }
  }

  if (normalized === 'healthy') {
    return {
      prediction: 'Healthy',
      type: 'Healthy plant',
      recommendedTreatment: 'No major treatment needed.',
      recommendedProduct: 'Rose Growth Booster',
      productSlug: 'rose-growth-booster',
      careAdvice: [
        'Continue balanced watering',
        'Use regular rose fertilizer',
        'Inspect leaves weekly for early symptoms',
      ],
    }
  }

  if (normalized === 'not_rose') {
    return {
      prediction: 'Invalid Image',
      type: 'Non-rose image detected',
      recommendedTreatment:
        'Please upload a clear rose leaf or rose plant image.',
      recommendedProduct: 'No product recommended',
      productSlug: '',
      careAdvice: [
        'Upload only rose leaf, flower, or plant images',
        'Avoid blurry or unrelated images',
        'Make sure the leaf is clearly visible',
      ],
    }
  }

  return {
    prediction: disease,
    type: 'Plant condition detected',
    recommendedTreatment: 'Use preventive treatment after manual inspection.',
    recommendedProduct: 'Rose Plant Care Spray',
    productSlug: 'rose-plant-care-spray',
    careAdvice: [
      'Inspect leaves closely',
      'Remove damaged parts if needed',
      'Use balanced plant nutrition',
    ],
  }
}

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const img = new window.Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
          reject(new Error('Canvas context not available'))
          return
        }

        const targetSize = 224
        canvas.width = targetSize
        canvas.height = targetSize

        ctx.drawImage(img, 0, 0, targetSize, targetSize)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Image compression failed'))
              return
            }

 const compressedFile = new File([blob], 'rose-image.jpg', {
  type: 'image/jpeg',
})


            resolve(compressedFile)
          },
          'image/jpeg',
          0.8
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = reader.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export default function AIChatPage() {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AiResult | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0] || null

    if (!selectedFile) return

    try {
      setLoading(true)
      setError('')
      setResult(null)

      if (preview) {
        URL.revokeObjectURL(preview)
      }

      const compressedFile = await compressImage(selectedFile)

      setFile(compressedFile)
      setPreview(URL.createObjectURL(compressedFile))
    } catch (error) {
      setError('Failed to process image')
      setFile(null)
      setPreview(null)
    } finally {
      setLoading(false)
    }
  }

const handleAnalyze = async () => {
  if (!file) {
    setError('Please upload a rose image first')
    return
  }

  try {
    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData,
    })

    let data: any = null

    try {
      data = await response.json()
    } catch {
      throw new Error('Backend did not return JSON')
    }

    if (!response.ok) {
      throw new Error(data.error || 'Backend request failed')
    }

    setResult(data)
  } catch (error) {
    console.error('Analyze error:', error)

    if (error instanceof TypeError) {
      setError('Cannot connect to backend. Make sure Flask is running on port 5000.')
    } else if (error instanceof Error) {
      setError(error.message)
    } else {
      setError('Failed to analyze image')
    }
  } finally {
    setLoading(false)
  }
}
  const suggestion = getSuggestion(result?.prediction)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Rose AI Advisor</h1>

        <p className="mt-2 text-sm text-gray-600">
          Upload a rose plant image to detect disease or plant health condition
          and get treatment suggestions.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Upload Rose Image
          </h2>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 py-10 text-center hover:border-green-500">
            <Upload className="mb-3 h-8 w-8 text-green-700" />

            <span className="font-medium text-gray-800">Choose an image</span>

            <span className="mt-1 text-sm text-gray-500">
              Upload a rose leaf, flower, or plant image
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={loading}
            />
          </label>

          {preview && (
            <div className="mt-6">
              <div className="relative h-72 w-full overflow-hidden rounded-xl border">
                <Image
                  src={preview}
                  alt="Rose preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <Button
                onClick={handleAnalyze}
                className="mt-4 w-full"
                disabled={loading}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {loading ? 'Analyzing...' : 'Analyze Rose Condition'}
              </Button>
            </div>
          )}

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Diagnosis Result
          </h2>

          {!result || !suggestion ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-gray-50 px-4 text-center text-sm text-gray-500">
              Upload a rose image and click analyze to view the diagnosis
              result.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-sm text-gray-500">Prediction</p>

                <h3 className="mt-1 flex items-center gap-2 text-xl font-bold text-green-800">
                  <ShieldAlert className="h-5 w-5" />
                  {suggestion.prediction}
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {result.confidence}%
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Issue Type</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {suggestion.type}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Recommended Treatment</p>

                <p className="mt-1 font-medium text-gray-900">
                  {suggestion.recommendedTreatment}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Suggested Product</p>

                <p className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                  <Leaf className="h-4 w-4 text-green-700" />
                  {suggestion.recommendedProduct}
                </p>

                {suggestion.productSlug && (
                  <Button
                    className="mt-4 w-full"
                    onClick={() =>
                      router.push(`/checkout?product=${suggestion.productSlug}`)
                    }
                  >
                    Order This Product
                  </Button>
                )}
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Care Advice</p>

                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  {suggestion.careAdvice.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Backend Suggestion</p>
                <p className="mt-1 font-medium text-gray-900">
                  {result.suggestion}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}