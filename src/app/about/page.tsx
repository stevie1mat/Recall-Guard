export const metadata = {
  title: 'About Us - RecallGuard Canada',
}

export default function AboutPage() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-8">
          About RecallGuard Canada
        </h1>
        <div className="prose prose-slate lg:prose-lg">
          <p>
            RecallGuard Canada was built with a simple mission: to help Canadian small businesses stay compliant and keep their customers safe from recalled products.
          </p>
          <p>
            Every day, the Government of Canada issues product recalls ranging from food safety warnings to consumer goods defects. For a small business owner, tracking these daily updates against thousands of SKUs is nearly impossible to do manually.
          </p>
          <h2>Our Solution</h2>
          <p>
            We built an automated matching engine that ingests the latest open data from the Government of Canada and cross-references it against your inventory. When a possible match is found, we alert you immediately so you can take action—removing the product from your shelves or notifying your customers.
          </p>
          <h2>Disclaimer</h2>
          <p>
            RecallGuard Canada is an independent SaaS platform and is <strong>not affiliated with the Government of Canada</strong>. We source our data from official open data portals, but businesses should always verify recalls on the official government website.
          </p>
        </div>
      </div>
    </div>
  )
}
