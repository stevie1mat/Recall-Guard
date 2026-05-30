import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ShieldCheck, ArrowRight, TrendingUp, CheckCircle, 
  BarChart3, Activity, Search, Database, Bell, Lock, Calendar
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-20 pb-0 overflow-hidden font-sans">
        {/* Soft, glowing gradient background using blurred divs for reliability */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[800px] rounded-full bg-[#fde0b5] blur-[120px] pointer-events-none opacity-80"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[800px] rounded-full bg-[#c6f6d5] blur-[120px] pointer-events-none opacity-80"></div>
        
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

        {/* Abstract Line Art Placeholder (Product & Warehouse Theme) */}
        <div className="w-full h-48 md:h-64 relative border-b border-slate-200 flex items-end justify-center overflow-hidden opacity-50 px-4">
          <svg className="w-full max-w-6xl h-full" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMax meet" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shelf lines */}
            <path d="M0 180H1000" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M0 120H1000" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
            
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
        </div>
      </section>

      {/* 2. STATS BAR */}
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

      {/* 3. BENTO / UNLOCK NUMBERS SECTION */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1]">
                Unlock the numbers behind smart compliance
              </h2>
              <p className="text-slate-600 mb-8">
                Find the safest products for your market. We analyze all the government databases and pick the matches for you.
              </p>
              <Button asChild className="rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-6">
                <Link href="/signup">Find the best for you</Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 flex flex-col md:flex-row gap-6 w-full">
              {/* Left Column of Bento */}
              <div className="flex flex-col gap-6 w-full md:w-1/2">
                <div className="bg-[#fafafa] rounded-3xl p-8 flex flex-col items-center justify-center text-center h-64 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="text-primary font-black text-2xl mb-2 tracking-tight">RecallGuard</div>
                  <div className="text-lg font-medium text-slate-800 mb-6">AI Optimization</div>
                  <div className="bg-white rounded-full px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-400 flex items-center shadow-sm w-full max-w-[200px] justify-between">
                    <span>Automated matching</span>
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">Go</div>
                  </div>
                </div>
                
                <div className="bg-[#fafafa] rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="bg-[#e8fcf1] h-10 w-10 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-5xl font-medium tracking-tight mb-2">99%</div>
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Client Trust</div>
                </div>
              </div>
              
              {/* Right Column of Bento */}
              <div className="w-full md:w-1/2 bg-[#fafafa] rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col relative overflow-hidden h-full min-h-[400px]">
                <div className="absolute top-10 right-10 bg-white shadow-xl rounded-2xl p-4 w-48 -rotate-6 z-10 border border-slate-100">
                  <div className="flex gap-2 mb-2">
                    <div className="h-8 w-8 bg-slate-100 rounded flex items-center justify-center"><Search className="h-4 w-4 text-slate-400"/></div>
                    <div>
                      <div className="h-2 w-16 bg-slate-200 rounded mb-1"></div>
                      <div className="h-2 w-10 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded mb-1"></div>
                  <div className="h-1.5 w-3/4 bg-slate-100 rounded"></div>
                </div>
                
                <div className="mt-auto relative z-20 bg-white/80 backdrop-blur p-4 rounded-xl border border-white">
                  <div className="text-lg font-semibold text-slate-900">Health Canada Sync</div>
                  <div className="flex items-center text-xs text-slate-500 mt-1 gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div> Daily Data Pull
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ADVANTAGE GRID (4 squares) */}
      <section className="py-24 px-4 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1]">
                Compliance advantage
              </h2>
              <p className="text-slate-600 mb-8">
                From curated open data to end-to-end automation, we simplify product safety so you can focus on growing your business.
              </p>
              <Button asChild className="rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-6">
                <Link href="/about">Find the best for you</Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Steady protection', icon: ShieldCheck, desc: 'Earn reliable protection without day-to-day involvement.' },
                { title: 'Reliable growth', icon: TrendingUp, desc: 'Backed by data and expert analysis for long-term success.' },
                { title: 'Clear insights', icon: BarChart3, desc: 'Track your safety status with real-time insights.' },
                { title: 'Stress-free selling', icon: CheckCircle, desc: 'We handle the complexities while you enjoy peace of mind.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#fafafa] rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between h-56 transition-colors hover:bg-slate-50">
                  <div className="bg-white shadow-sm border border-slate-100 h-10 w-10 rounded-lg flex items-center justify-center mb-auto">
                    <item.icon className="h-5 w-5 text-primary" />
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

      {/* 5. TOP PROPERTIES (RECALLS) */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-medium tracking-tight mb-4">Discover our top tracked recalls</h2>
            <p className="text-slate-600">
              Explore handpicked consumer alerts with high relevance and strong search volumes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Modern electric scooter with...", loc: "Nationwide", date: "Oct 12, 2023", risk: "High", color: "bg-red-500" },
              { title: "Luxury baby stroller inc...", loc: "Ontario, BC", date: "Nov 04, 2023", risk: "Medium", color: "bg-yellow-500" },
              { title: "Spacious family tent in growi...", loc: "Nationwide", date: "Dec 01, 2023", risk: "Low", color: "bg-primary" },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="w-full h-56 bg-slate-100 rounded-2xl mb-4 overflow-hidden border border-slate-200 flex items-center justify-center">
                  {/* Image placeholder block */}
                  <Activity className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1 group-hover:text-primary transition-colors truncate">{item.title}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1"></span> {item.loc}
                </div>
                
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {item.date}</span>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">Risk Level</span>
                    <span className="text-xs font-semibold text-primary">{item.risk}</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold px-4 h-8">
                    View alert
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STEPS WITH GREEN GRADIENT BACKGROUND */}
      <section className="py-24 px-4 bg-gradient-to-r from-[#ebfbea] to-[#f4fdf4] border-y border-[#dcf5d8]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight max-w-md leading-[1.1]">
              Comply with confidence in just a few steps
            </h2>
            <p className="text-sm font-medium text-slate-600 max-w-xs text-right md:text-left">
              Follow our transparent, data-driven process and start securing your store through real automation today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting arrows (hidden on mobile) */}
            <div className="hidden md:block absolute top-12 left-[30%] text-primary/30"><ArrowRight className="h-6 w-6"/></div>
            <div className="hidden md:block absolute top-12 left-[63%] text-primary/30"><ArrowRight className="h-6 w-6"/></div>

            {[
              { step: '1', title: 'Upload inventory', desc: 'Browse our simple tools to upload your CSV or sync your catalog automatically.' },
              { step: '2', title: 'Sync with confidence', desc: 'Review in-depth match insights, assess potential risks, and secure your products with ease.' },
              { step: '3', title: 'Monitor & track', desc: 'Start generating passive compliance reports with real-time performance tracking.' }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-shadow">
                <div className="text-4xl font-black text-primary/20 mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
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
