import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck, ArrowRight, TrendingUp, CheckCircle,
  BarChart3, Activity, Search, Database, Bell, Lock, Calendar,
  Package, ShoppingBag, Car, Monitor, Smartphone, Coffee, Gamepad2, Briefcase, Headphones, Plug, Printer
} from 'lucide-react'
import AnimatedAssemblyLine from '@/components/AnimatedAssemblyLine'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-20 pb-0 overflow-hidden font-sans">

        {/* Randomized Scattered Product Background Patterns */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.06]">
          {/* Scattered across the screen with varying sizes, rotations, and positions */}
          <Package className="absolute top-[10%] left-[5%] w-24 h-24 -rotate-12 text-slate-500" strokeWidth={1} />
          <ShoppingBag className="absolute top-[25%] left-[20%] w-16 h-16 rotate-6 text-slate-500" strokeWidth={1.5} />
          <Car className="absolute top-[65%] left-[8%] w-32 h-32 -rotate-6 text-slate-500" strokeWidth={1} />
          <Monitor className="absolute top-[15%] left-[80%] w-20 h-20 rotate-12 text-slate-500" strokeWidth={1} />
          <Smartphone className="absolute top-[50%] left-[88%] w-16 h-16 -rotate-12 text-slate-500" strokeWidth={1.5} />
          <Coffee className="absolute top-[80%] left-[75%] w-24 h-24 rotate-45 text-slate-500" strokeWidth={1} />
          <Package className="absolute top-[70%] left-[35%] w-20 h-20 rotate-12 text-slate-500" strokeWidth={1} />
          <Gamepad2 className="absolute top-[5%] left-[45%] w-28 h-28 -rotate-6 text-slate-500" strokeWidth={1} />
          <Briefcase className="absolute top-[40%] left-[10%] w-20 h-20 rotate-12 text-slate-500" strokeWidth={1} />
          <Headphones className="absolute top-[35%] left-[70%] w-24 h-24 -rotate-12 text-slate-500" strokeWidth={1} />
          <Plug className="absolute top-[85%] left-[20%] w-16 h-16 rotate-45 text-slate-500" strokeWidth={1.5} />
          <Printer className="absolute top-[60%] left-[60%] w-28 h-28 -rotate-6 text-slate-500" strokeWidth={1} />
        </div>

        {/* Centered soft glowing gradient background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] max-w-[90vw] h-[500px] rounded-[100%] bg-gradient-to-r from-[#fde0b5] via-[#e2f8dc] to-[#c6f6d5] blur-[100px] md:blur-[140px] pointer-events-none opacity-80 z-0"></div>

        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10 pt-10">
          <h1 className="text-[3.5rem] md:text-[5.5rem] leading-[1.05] font-medium tracking-tight mb-6">
            Monitor inventory,<br />protect your business
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Take control of your product compliance by automatically diversifying your safety checks against official Government of Canada data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild variant="outline" className="h-14 px-10 text-lg rounded-full border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 w-full sm:w-auto">
              <Link href="/recalls">Browse Database</Link>
            </Button>
            <Button asChild className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-none w-full sm:w-auto">
              <Link href="/signup">Start Monitoring</Link>
            </Button>
          </div>
        </div>

        {/* Abstract Line Art Placeholder (Product & Warehouse Theme - Assembly Line) */}
        <AnimatedAssemblyLine />
      </section>

      {/* 2. HOW BUSINESS OWNERS USE IT */}
      <section className="py-24 px-4 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Premium ambient UI gradients in bottom corners */}
        <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-[100%] bg-gradient-to-tr from-[#c6f6d5]/80 to-transparent blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-[100%] bg-gradient-to-tl from-[#fde0b5]/80 to-transparent blur-[100px] pointer-events-none z-0"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight max-w-xl leading-[1.1]">
              How business owners use RecallGuard
            </h2>
            <p className="text-lg text-slate-600 max-w-md text-right md:text-left leading-relaxed">
              We've boiled down a complex, manual, and legally dangerous process into three completely automated steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-1/2 left-[25%] w-[15%] border-t-2 border-dashed border-slate-200"></div>
            <div className="hidden md:block absolute top-1/2 left-[60%] w-[15%] border-t-2 border-dashed border-slate-200"></div>

            {[
              { step: '1', title: 'Upload your inventory', desc: 'Easily drag and drop a CSV of your product catalog, or use our API to automatically sync your live warehouse inventory data.' },
              { step: '2', title: 'We scan 24/7', desc: 'Our AI engine continuously cross-references your SKUs and product names against official government databases like Health Canada and CPSC.' },
              { step: '3', title: 'Get instant alerts', desc: 'The absolute second a recall matches an item in your inventory, you get notified via email and dashboard so you can pull it from shelves.' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10 transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="h-12 w-12 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-xl font-bold text-slate-900 mb-6">{s.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STATS BAR */}
      <section className="py-16 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">500+</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Trusted<br />Retailers</div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">10K+</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Products<br />Monitored</div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">30K+</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Database<br />Records</div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">100%</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Automated<br />Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* WRAPPER FOR SECTIONS 3 & 4 (SHARED GRADIENT) */}
      <div className="relative overflow-hidden bg-white">
        {/* Massive shared ambient UI gradient centered across both sections */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] max-w-[100vw] h-[1000px] rounded-[100%] bg-gradient-to-r from-[#c6f6d5]/40 via-[#e2f8dc]/40 to-[#fde0b5]/40 blur-[120px] pointer-events-none z-0"></div>

        {/* 3. BENTO / FEATURES SECTION */}
        <section className="pt-24 pb-12 px-4 relative z-10">
          <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1]">
                Powerful automation that makes sense
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Stop manually checking government websites. We continuously sync your inventory against official databases and alert you the second a match is found.
              </p>
              <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 h-14 text-lg">
                <Link href="/signup">See it in action</Link>
              </Button>
            </div>

            <div className="lg:w-2/3 flex flex-col md:flex-row gap-6 w-full">
              {/* Left Column of Bento */}
              <div className="flex flex-col gap-6 w-full md:w-1/2">
                <div className="bg-white rounded-3xl p-8 flex flex-col justify-center h-64 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-5 w-5 text-slate-900" strokeWidth={1.5} />
                      <span className="font-semibold text-slate-900">Instant Alerts</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">Get notified immediately when a product in your catalog gets recalled.</p>
                  </div>

                  {/* Mock Notification UI */}
                  <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] mt-2 transform group-hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <Activity className="h-4 w-4 text-red-500" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">High Risk Match Found</div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">SKU-9921 matches a recent Health Canada recall.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-center transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="mb-6">
                    <CheckCircle className="h-6 w-6 text-slate-900" strokeWidth={1.5} />
                  </div>
                  <div className="text-4xl font-semibold tracking-tight mb-2 text-slate-900">24/7</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Continuous Scanning</div>
                </div>
              </div>

              {/* Right Column of Bento */}
              <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden h-full min-h-[400px] transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-5 w-5 text-slate-900" strokeWidth={1.5} />
                    <span className="font-semibold text-slate-900 text-lg">Official Data Sync</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">Directly integrated with government APIs to ensure you never miss a critical update.</p>
                </div>

                {/* Mock Database List UI */}
                <div className="flex flex-col gap-3 w-full">
                  {[
                    { name: 'Health Canada API', status: 'Live Syncing', time: 'Just now' },
                    { name: 'CPSC Database (US)', status: 'Live Syncing', time: '2m ago' },
                    { name: 'Transport Canada', status: 'Live Syncing', time: '1hr ago' },
                  ].map((db, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between transition-colors hover:border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <div className="font-medium text-slate-700 text-sm">{db.name}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{db.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>

        {/* 4. WHAT IT IS & WHY BUSINESS OWNERS NEED IT */}
        <section className="pt-12 pb-24 px-4 relative z-10">
          <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16">
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 order-2 lg:order-1">
              {[
                { title: 'Protect Your Customers', icon: ShieldCheck, desc: 'Ensure dangerous or defective products never make it to your store shelves or get shipped to consumers.' },
                { title: 'Avoid Massive Liability', icon: Activity, desc: 'Selling recalled goods carries severe fines and legal risks. Our automated checks drastically reduce your liability.' },
                { title: 'Save Hundreds of Hours', icon: TrendingUp, desc: 'Stop paying employees to manually check Health Canada and CPSC databases every single morning.' },
                { title: 'Build Brand Trust', icon: CheckCircle, desc: 'Demonstrate to your customers and partners that you take product safety and compliance seriously.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between h-56 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group">
                  <div className="mb-auto">
                    <item.icon className="h-7 w-7 text-slate-900 mb-4 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1]">
                Why business owners need RecallGuard
              </h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Selling a recalled product can destroy your brand's reputation and result in massive legal liability. We give retailers, distributors, and e-commerce stores the peace of mind they need to scale safely.
              </p>
              <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 h-14 text-lg">
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
            
          </div>
          </div>
        </section>
      </div>
      {/* 4.5. THE RECALLGUARD ADVANTAGE */}
      <section className="py-24 px-4 bg-white border-t border-slate-100 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight max-w-2xl leading-[1.1]">
              Your automated recall management advantage
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* Grid of cards */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Instant alerts', desc: 'Get notified immediately when a matching recall is published.', icon: Bell },
                { title: '24/7 Monitoring', desc: 'Our system scans government databases around the clock.', icon: Activity },
                { title: 'Data accuracy', desc: 'We cross-reference exact SKUs and UPCs to prevent false alarms.', icon: Database },
                { title: 'Compliance ready', desc: 'Automatically maintain logs of your recall checks for audits.', icon: CheckCircle },
                { title: 'Team workflow', desc: 'Assign tasks and track removal of products from your shelves.', icon: Briefcase },
                { title: 'Stress-free ops', desc: 'We handle the complexities so you can focus on your business.', icon: ShieldCheck },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col hover:border-slate-200 transition-colors">
                  <div className="mb-6">
                    <div className="h-10 w-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shadow-sm relative">
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#61c554] rounded-full border-2 border-white"></div>
                      <item.icon className="h-5 w-5 text-slate-700" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Right side text and button */}
            <div className="w-full lg:w-1/3 flex flex-col pt-4">
              <p className="text-slate-600 text-lg leading-relaxed mb-12">
                From initial inventory upload to real-time government database synchronization, we simplify the recall monitoring process so you can focus on running your business safely and compliantly.
              </p>
              <div>
                <Button asChild className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 h-14 border-0 text-base">
                  <Link href="/features">Find the best for you</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE EXAMPLES OF RECALLS */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-medium tracking-tight mb-4">Examples of recalls we catch</h2>
            <p className="text-slate-600 text-lg">
              Our system continuously monitors thousands of categories. Here are some examples of what slips past retailers without automated monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Electric Scooter Battery Fire Risk", category: "Electronics", date: "Oct 12, 2023", risk: "Critical", icon: Plug },
              { title: "Luxury Baby Stroller Hinge Defect", category: "Children's Products", date: "Nov 04, 2023", risk: "High", icon: Package },
              { title: "Contaminated Coffee Beans Batch", category: "Food & Beverage", date: "Dec 01, 2023", risk: "Medium", icon: Coffee },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group cursor-pointer flex flex-col h-full">
                <div className="mb-6 flex justify-between items-start">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-slate-600" strokeWidth={1.5} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${item.risk === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' : item.risk === 'High' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-yellow-50 text-yellow-600 border border-yellow-100'}`}>
                    {item.risk} Risk
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>

                <div className="flex items-center gap-1 text-sm text-slate-500 mb-6">
                  {item.category}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Calendar className="h-4 w-4" strokeWidth={1.5} /> {item.date}
                  </div>
                  <div className="flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight className="ml-1 h-3 w-3" strokeWidth={2} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA / SEMI-FOOTER */}
      <section className="py-32 px-4 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Massive ambient UI gradient orb centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-[100%] bg-gradient-to-r from-[#fde0b5]/50 via-[#c6f6d5]/80 to-[#e2f8dc]/50 blur-[100px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Automate your recall management with confidence
          </h2>
          <Button asChild className="rounded-xl bg-[#61c554] hover:bg-[#4ea843] text-white font-medium px-8 h-14 text-lg border-0">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
