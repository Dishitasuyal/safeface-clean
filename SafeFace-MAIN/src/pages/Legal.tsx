import { Scale, Phone, FileText, Shield, AlertCircle, ExternalLink, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Disclaimer } from "@/components/Disclaimer";

const legalResources = [
  {
    title: "Information Technology Act, 2000",
    description: "Section 66D covers punishment for cheating by personation using computer resources.",
    relevance: "Applicable to deepfake fraud and identity theft cases.",
  },
  {
    title: "Indian Penal Code",
    description: "Sections 499, 500 (Defamation), Section 509 (Insulting modesty of women).",
    relevance: "Can be used when deepfakes cause reputational harm.",
  },
  {
    title: "POCSO Act, 2012",
    description: "Protection of Children from Sexual Offences Act for cases involving minors.",
    relevance: "Strictly applicable when deepfakes involve children.",
  },
  {
    title: "Copyright Act, 1957",
    description: "Protection against unauthorized use of one's likeness and image.",
    relevance: "Applicable when deepfakes use copyrighted content.",
  },
];

const helplines = [
  {
    name: "National Cyber Crime Helpline",
    number: "1930",
    description: "24/7 helpline for reporting cyber crimes including deepfakes.",
  },
  {
    name: "Women Helpline",
    number: "181",
    description: "For women facing harassment through deepfake content.",
  },
  {
    name: "Cyber Crime Portal",
    number: "cybercrime.gov.in",
    description: "Online portal to file cyber crime complaints.",
    isLink: true,
  },
];

const complaintSteps = [
  "Preserve all evidence (screenshots, URLs, original content)",
  "Document the incident with dates and details",
  "Report to the platform where content was shared",
  "File a complaint at cybercrime.gov.in or call 1930",
  "Visit your nearest police station with evidence",
  "Consider consulting a cyber law expert for legal action",
];

export const Legal = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 inline-flex rounded-full bg-primary/10 p-4">
              <Scale className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Legal & Victim Support
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Understanding your rights and the legal framework around deepfakes in India.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="max-w-3xl mx-auto mb-12">
            <Disclaimer />
          </div>

          {/* Legal Framework */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Legal Framework
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {legalResources.map((resource, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-6 shadow-card"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="mt-4 flex items-start gap-2 text-sm text-primary">
                    <Shield className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{resource.relevance}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to File Complaint */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                How to File a Complaint
              </h2>
            </div>
            
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card">
              <div className="space-y-4">
                {complaintSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      <p className="text-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Helplines */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Helplines & Resources
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {helplines.map((helpline, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-6 shadow-card text-center"
                >
                  <div className="mb-4 inline-flex rounded-full bg-primary/10 p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {helpline.name}
                  </h3>
                  {helpline.isLink ? (
                    <a 
                      href={`https://${helpline.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-2xl font-bold text-primary hover:underline"
                    >
                      {helpline.number}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="mt-2 text-2xl font-bold text-primary">
                      {helpline.number}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {helpline.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-xl bg-primary/5 border border-primary/20 p-8 text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If you are a victim of deepfake harassment or fraud, don't hesitate to reach out to the authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">
                  Visit Cyber Crime Portal
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:1930">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 1930
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
