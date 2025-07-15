'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Check, Upload, X, Star } from 'lucide-react'
import { productsAPI, type CreateProductData } from '@/lib/api/products'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

// Danish regions and cities following Railway backend structure
const DANISH_REGIONS = {
  'hovedstaden': 'Hovedstaden',
  'midtjylland': 'Midtjylland', 
  'nordjylland': 'Nordjylland',
  'sjaelland': 'Sjælland',
  'syddanmark': 'Syddanmark'
}

const CITIES_BY_REGION = {
  'hovedstaden': ['København', 'Frederiksberg', 'Gentofte', 'Gladsaxe', 'Ballerup'],
  'midtjylland': ['Aarhus', 'Viborg', 'Silkeborg', 'Horsens', 'Randers'],
  'nordjylland': ['Aalborg', 'Hjørring', 'Frederikshavn', 'Thisted'],
  'sjaelland': ['Roskilde', 'Næstved', 'Slagelse', 'Holbæk', 'Køge'],
  'syddanmark': ['Odense', 'Esbjerg', 'Kolding', 'Vejle', 'Sønderborg']
}

// Categories based on backend specification
const CATEGORIES = [
  { id: 'electronics', name: 'Elektronik', icon: '📱' },
  { id: 'fashion', name: 'Mode', icon: '👕' },
  { id: 'home', name: 'Hjem', icon: '🏠' },
  { id: 'sports', name: 'Sport', icon: '⚽' },
  { id: 'books', name: 'Bøger', icon: '📚' },
  { id: 'toys', name: 'Legetøj', icon: '🧸' },
  { id: 'beauty', name: 'Skønhed', icon: '💄' },
  { id: 'cars', name: 'Biler', icon: '🚗' },
  { id: 'other', name: 'Andet', icon: '📦' }
]

const CONDITIONS = [
  { value: 'new', label: 'Ny', description: 'Aldrig brugt, i original emballage' },
  { value: 'like_new', label: 'Som ny', description: 'Brugt meget lidt, ingen synlige skader' },
  { value: 'good', label: 'God', description: 'Brugt, men i god stand' },
  { value: 'fair', label: 'Acceptabel', description: 'Brugt med synlige tegn på slid' }
]

interface WizardStep {
  id: string
  title: string
  description: string
  isComplete: boolean
  isOptional?: boolean
}

interface ProductFormData extends Omit<CreateProductData, 'category_id'> {
  category_id: string
  images: File[]
  imageUrls: string[]
}

const INITIAL_FORM_DATA: ProductFormData = {
  title: '',
  description: '',
  price: 0,
  category_id: '',
  condition: 'good',
  location_region: '',
  location_city: '',
  shipping_info: {
    offers_shipping: false,
    pickup_available: true
  },
  images: [],
  imageUrls: []
}

export default function CreateProductWizard() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps: WizardStep[] = [
    {
      id: 'category',
      title: 'Kategori',
      description: 'Vælg kategori for dit produkt',
      isComplete: !!formData.category_id
    },
    {
      id: 'basic',
      title: 'Grundlæggende info',
      description: 'Titel, beskrivelse og pris',
      isComplete: !!(formData.title && formData.description && formData.price > 0)
    },
    {
      id: 'condition',
      title: 'Stand',
      description: 'Produktets tilstand',
      isComplete: !!formData.condition
    },
    {
      id: 'location',
      title: 'Lokation',
      description: 'Hvor befinder produktet sig',
      isComplete: !!(formData.location_region && formData.location_city)
    },
    {
      id: 'shipping',
      title: 'Forsendelse',
      description: 'Afhentning og forsendelse',
      isComplete: true, // Optional step
      isOptional: true
    },
    {
      id: 'images',
      title: 'Billeder',
      description: 'Upload billeder af dit produkt',
      isComplete: formData.images.length > 0
    },
    {
      id: 'review',
      title: 'Gennemse',
      description: 'Kontroller dine oplysninger',
      isComplete: false
    }
  ]

  const updateFormData = useCallback((updates: Partial<ProductFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
    setErrors({}) // Clear errors when user makes changes
  }, [])

  const validateCurrentStep = (): boolean => {
    const currentStepData = steps[currentStep]
    if (!currentStepData) return false
    
    const currentStepId = currentStepData.id
    const newErrors: Record<string, string> = {}

    switch (currentStepId) {
      case 'category':
        if (!formData.category_id) {
          newErrors.category_id = 'Vælg venligst en kategori'
        }
        break
      
      case 'basic':
        if (!formData.title.trim()) {
          newErrors.title = 'Titel er påkrævet'
        } else if (formData.title.length < 5) {
          newErrors.title = 'Titel skal være mindst 5 tegn'
        }
        
        if (!formData.description.trim()) {
          newErrors.description = 'Beskrivelse er påkrævet'
        } else if (formData.description.length < 20) {
          newErrors.description = 'Beskrivelse skal være mindst 20 tegn'
        }
        
        if (formData.price <= 0) {
          newErrors.price = 'Pris skal være større end 0'
        }
        break
      
      case 'location':
        if (!formData.location_region) {
          newErrors.location_region = 'Vælg venligst en region'
        }
        if (!formData.location_city) {
          newErrors.location_city = 'Vælg venligst en by'
        }
        break
      
      case 'images':
        if (formData.images.length === 0) {
          newErrors.images = 'Upload mindst ét billede'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Fejl',
          description: 'Kun billedfiler er tilladt',
          variant: 'destructive'
        })
        return false
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'Fejl', 
          description: 'Billeder må maksimalt være 10MB',
          variant: 'destructive'
        })
        return false
      }
      
      return true
    })

    // Convert to preview URLs
    const newImageUrls = validFiles.map(file => URL.createObjectURL(file))
    
    updateFormData({
      images: [...formData.images, ...validFiles],
      imageUrls: [...formData.imageUrls, ...newImageUrls]
    })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newImageUrls = formData.imageUrls.filter((_, i) => i !== index)
    
    // Revoke URL to prevent memory leaks
    const urlToRevoke = formData.imageUrls[index]
    if (urlToRevoke) {
      URL.revokeObjectURL(urlToRevoke)
    }
    
    updateFormData({
      images: newImages,
      imageUrls: newImageUrls
    })
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    
    try {
      // Create the product first
      const productData: CreateProductData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        condition: formData.condition,
        location_region: formData.location_region,
        location_city: formData.location_city,
        shipping_info: formData.shipping_info
      }

      const product = await productsAPI.create(productData)

      // Upload images if any
      if (formData.images.length > 0) {
        await productsAPI.uploadImages(product.id, formData.images)
      }

      toast({
        title: 'Succes!',
        description: 'Dit produkt er blevet oprettet'
      })

      router.push(`/products/${product.id}`)
      
    } catch (error: any) {
      console.error('Error creating product:', error)
      toast({
        title: 'Fejl',
        description: error.response?.data?.message || 'Der opstod en fejl ved oprettelse af produktet',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Tilbage
          </Button>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">Opret annonce</h1>
          <p className="text-muted-foreground mt-1">
            Følg trinene for at oprette din annonce
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Trin {currentStep + 1} af {steps.length}</span>
            <span>{Math.round(progress)}% færdig</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps indicators */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors",
                index === currentStep 
                  ? "bg-primary text-primary-foreground" 
                  : step.isComplete 
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {step.isComplete && index !== currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-current opacity-20 text-xs flex items-center justify-center">
                  {index + 1}
                </span>
              )}
              <span>{step.title}</span>
              {step.isOptional && (
                <Badge variant="secondary" className="text-xs">Valgfri</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[currentStep]?.title}
            {steps[currentStep]?.isOptional && (
              <Badge variant="outline">Valgfri</Badge>
            )}
          </CardTitle>
          <p className="text-muted-foreground">
            {steps[currentStep]?.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Category */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <Label>Vælg kategori for dit produkt</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => updateFormData({ category_id: category.id })}
                    className={cn(
                      "p-4 border rounded-lg text-left transition-colors hover:border-primary",
                      formData.category_id === category.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    )}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
              {errors.category_id && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.category_id}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          {/* Step 2: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData({ title: e.target.value })}
                  placeholder="F.eks. iPhone 13 Pro 128GB Space Gray"
                  maxLength={100}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Skriv en tydelig og beskrivende titel</span>
                  <span>{formData.title.length}/100</span>
                </div>
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beskrivelse *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData({ description: e.target.value })}
                  placeholder="Beskriv produktet i detaljer. Inkluder informationer om stand, alder, defekter, osv."
                  rows={6}
                  maxLength={2000}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Skriv en detaljeret beskrivelse (minimum 20 tegn)</span>
                  <span>{formData.description.length}/2000</span>
                </div>
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Pris (DKK) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => updateFormData({ price: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min={0}
                />
                <p className="text-xs text-muted-foreground">
                  Sæt en fair pris baseret på produktets stand
                </p>
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Condition */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <Label>Produktets stand</Label>
              <RadioGroup
                value={formData.condition}
                onValueChange={(value: string) => updateFormData({ condition: value as 'new' | 'like_new' | 'good' | 'fair' })}
                className="space-y-3"
              >
                {CONDITIONS.map((condition) => (
                  <div key={condition.value} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value={condition.value} id={condition.value} className="mt-1" />
                    <label htmlFor={condition.value} className="flex-1 cursor-pointer">
                      <div className="font-medium">{condition.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {condition.description}
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 4: Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Region *</Label>
                <Select
                  value={formData.location_region}
                  onValueChange={(value: string) => updateFormData({ 
                    location_region: value,
                    location_city: '' // Reset city when region changes
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vælg region" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(DANISH_REGIONS).map(([key, name]) => (
                      <SelectItem key={key} value={key}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location_region && (
                  <p className="text-sm text-destructive">{errors.location_region}</p>
                )}
              </div>

              {formData.location_region && (
                <div className="space-y-2">
                  <Label>By *</Label>
                  <Select
                    value={formData.location_city}
                    onValueChange={(value: string) => updateFormData({ location_city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg by" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES_BY_REGION[formData.location_region as keyof typeof CITIES_BY_REGION]?.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location_city && (
                    <p className="text-sm text-destructive">{errors.location_city}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Shipping */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Afhentning</div>
                    <div className="text-sm text-muted-foreground">
                      Køber kan afhente produktet hos dig
                    </div>
                  </div>
                  <Button
                    variant={formData.shipping_info?.pickup_available ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateFormData({
                      shipping_info: {
                        ...formData.shipping_info,
                        pickup_available: !formData.shipping_info?.pickup_available
                      }
                    })}
                  >
                    {formData.shipping_info?.pickup_available ? "Aktiveret" : "Deaktiveret"}
                  </Button>
                </div>

                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Forsendelse</div>
                      <div className="text-sm text-muted-foreground">
                        Send produktet til køber
                      </div>
                    </div>
                    <Button
                      variant={formData.shipping_info?.offers_shipping ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFormData({
                        shipping_info: {
                          ...formData.shipping_info,
                          offers_shipping: !formData.shipping_info?.offers_shipping
                        }
                      })}
                    >
                      {formData.shipping_info?.offers_shipping ? "Aktiveret" : "Deaktiveret"}
                    </Button>
                  </div>

                  {formData.shipping_info?.offers_shipping && (
                    <div className="space-y-2 pt-3 border-t">
                      <Label htmlFor="shipping_cost">Forsendelsesomkostninger (DKK)</Label>
                      <Input
                        id="shipping_cost"
                        type="number"
                        value={formData.shipping_info?.shipping_cost || ''}
                        onChange={(e) => updateFormData({
                          shipping_info: {
                            ...formData.shipping_info,
                            shipping_cost: parseInt(e.target.value) || 0
                          }
                        })}
                        placeholder="0"
                        min={0}
                      />
                      <p className="text-xs text-muted-foreground">
                        Lad stå tom for gratis forsendelse
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Images */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Upload billeder af dit produkt</Label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-lg font-medium">Upload billeder</p>
                      <p className="text-sm text-muted-foreground">
                        Træk og slip eller klik for at vælge billeder
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG op til 10MB hver
                      </p>
                    </div>
                  </label>
                </div>

                {/* Image Preview Grid */}
                {formData.imageUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border">
                          <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            Hovedbillede
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {errors.images && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.images}</AlertDescription>
                  </Alert>
                )}

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Første billede bliver dit hovedbillede</p>
                  <p>• Upload mindst 1 billede, maksimalt 10</p>
                  <p>• Gode billeder øger chancen for salg betydeligt</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>
                  Gennemse dine oplysninger før du publicerer annoncen
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Preview */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Produktoversigt</h3>
                  
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="font-medium text-lg">{formData.title}</div>
                    <div className="text-2xl font-bold text-primary">
                      {formData.price.toLocaleString('da-DK')} DKK
                    </div>
                    <Badge variant="outline">
                      {CONDITIONS.find(c => c.value === formData.condition)?.label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {formData.description.substring(0, 150)}
                      {formData.description.length > 150 && '...'}
                    </p>
                  </div>

                  {formData.imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.imageUrls.slice(0, 6).map((url, index) => (
                        <div key={index} className="aspect-square rounded border overflow-hidden">
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Detaljer</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Kategori:</span>
                      <span>{CATEGORIES.find(c => c.id === formData.category_id)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stand:</span>
                      <span>{CONDITIONS.find(c => c.value === formData.condition)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lokation:</span>
                      <span>{formData.location_city}, {DANISH_REGIONS[formData.location_region as keyof typeof DANISH_REGIONS]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Afhentning:</span>
                      <span>{formData.shipping_info?.pickup_available ? 'Ja' : 'Nej'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Forsendelse:</span>
                      <span>
                        {formData.shipping_info?.offers_shipping 
                          ? `Ja (${formData.shipping_info.shipping_cost || 0} DKK)`
                          : 'Nej'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Billeder:</span>
                      <span>{formData.images.length} stk.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Forrige
        </Button>

        <div className="flex gap-2">
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Næste
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-w-32"
            >
              {isSubmitting ? 'Opretter...' : 'Publicer annonce'}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
