import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ShieldCheck, ArrowRight, TrendingUp, CheckCircle, 
  BarChart3, Activity, Search, Database, Bell, Lock, Calendar,
  Package, ShoppingBag, Car, Monitor, Smartphone, Coffee, Gamepad2, Briefcase, Headphones, Plug, Printer
} from 'lucide-react'

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
            Monitor inventory,<br/>protect your business
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
        <div className="w-full h-48 md:h-64 relative border-b border-slate-200 overflow-hidden opacity-50 flex items-end">
          <div className="flex w-max animate-marquee">
            {[1, 2, 3, 4].map((i) => (
              <svg key={i} className="w-[1000px] h-48 md:h-64 shrink-0" viewBox="0 0 1000 200" preserveAspectRatio="xMinYMax meet" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Solid Shelf/Conveyor line (dotted line removed) */}
                <path d="M0 180H1000" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {/* Products (Boxes, Bottles, Cans, Tech) */}
                {/* Box 1 */}
                <path d="M30 180V130H80V180 M30 145H80" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Bottle */}
                <path d="M110 180V100C110 90 120 80 120 70V60H130V70C130 80 140 90 140 100V180Z" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Stacked Boxes */}
                <path d="M170 180V140H230V180 M180 140V110H220V140" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Tin Can */}
                <path d="M270 180V120H320V180 M270 130H320 M270 170H320" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Monitor / Tech */}
                <path d="M360 160V110H430V160H360Z M385 180V160 M405 180V160 M370 180H420" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Tall Box */}
                <path d="M470 180V80H520V180 M480 80L495 100L510 80" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Spray Bottle */}
                <path d="M560 180V110C560 100 580 90 580 90H560V80H590V90H600V110C600 110 590 130 590 180H560Z" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Large Box with X */}
                <path d="M630 180V120H710V180 M630 120L710 180 M630 180L710 120" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Small Stack */}
                <path d="M750 180V150H780V180 M750 150V130H770V150 M780 180V160H800V180" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Jar */}
                <path d="M840 180V120C840 110 850 100 850 100V90H890V100C890 100 900 110 900 120V180Z M840 110H900" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Box 2 */}
                <path d="M930 180V140H980V180 M930 150H980" stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Green accent blocks (Representing "Safe" or "Monitored" items) */}
                <rect x="50" y="155" width="10" height="10" fill="var(--primary)" />
                <rect x="195" y="120" width="10" height="10" fill="var(--primary)" />
                <rect x="390" y="125" width="10" height="10" fill="var(--primary)" />
                <rect x="665" y="145" width="10" height="10" fill="var(--primary)" />
                <rect x="865" y="135" width="10" height="10" fill="var(--primary)" />
              </svg>
            ))}
          </div>
        </div>
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
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Trusted<br/>Retailers</div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">10K+</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Products<br/>Monitored</div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">30K+</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Database<br/>Records</div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 md:px-8">
              <div className="text-4xl font-medium tracking-tight">100%</div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide leading-tight uppercase">Automated<br/>Sync</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO / FEATURES SECTION */}
      <section className="py-24 px-4 bg-white">
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
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
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
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
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
          </div>
        </div>
      </section>

      {/* 5. LIVE EXAMPLES OF RECALLS */}
      <section className="py-24 px-4 bg-slate-50 border-t border-slate-100">
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

      {/* FOOTER */}
      <footer className="py-20 px-4 bg-white text-center">
        <h2 className="text-4xl font-medium tracking-tight mb-8">Trusted by retailers,<br/>proven by results</h2>
        <div className="max-w-4xl mx-auto h-64 bg-slate-100 rounded-t-3xl border border-slate-200 border-b-0 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <Lock className="h-16 w-16 text-slate-300" />
          </div>
        </div>
      </footer>
    </div>
  )
}
