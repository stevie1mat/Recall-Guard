import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out the service.',
    features: [
      'Public recall search',
      'Save up to 5 watched products',
      'No email alerts',
    ],
    buttonText: 'Get Started',
    href: '/signup',
  },
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'For very small businesses with few products.',
    features: [
      '50 watched products',
      'Daily recall matching',
      'Email alerts',
    ],
    buttonText: 'Start Free Trial',
    href: '/signup?plan=starter',
    popular: true,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    description: 'For growing stores needing bulk uploads.',
    features: [
      '500 watched products',
      'CSV upload',
      'Daily recall matching',
      'Email alerts',
      'Match dashboard',
    ],
    buttonText: 'Start Free Trial',
    href: '/signup?plan=pro',
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    description: 'For established retailers and suppliers.',
    features: [
      '2,000 watched products',
      'Priority matching',
      'CSV upload',
      'Email alerts',
      'Export reports',
      'Multiple notification emails',
    ],
    buttonText: 'Start Free Trial',
    href: '/signup?plan=business',
  },
]

export const metadata = {
  title: 'Pricing - RecallGuard Canada',
}

export default function PricingPage() {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Simple, predictable pricing
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your inventory size. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col relative ${plan.popular ? 'border-blue-600 shadow-md ring-1 ring-blue-600' : 'border-slate-200 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold text-slate-900">
                  {plan.price}
                  {plan.period && <span className="ml-1 text-xl font-medium text-slate-500">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 shrink-0 mr-3" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  <Link href={plan.href}>{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
