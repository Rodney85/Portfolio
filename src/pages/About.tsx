import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Code, Sparkles, Lightbulb, Brain, Rocket } from "lucide-react";
import { SocialLink } from "@/components/ui/social-link";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 space-y-16"
    >
      {/* Who I Am Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] p-8 shadow-xl border border-[#DDE2C6]/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDE2C6]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <h1 className="text-4xl font-bold text-[#DDE2C6] mb-4 relative">Who I Am</h1>
        <p className="text-xl text-[#DDE2C6]/90 relative">
          I'm Rodney Mutwiri - your tech partner who speaks the language of business and code
        </p>
      </motion.section>

      {/* My Superpower Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] p-8 shadow-xl border border-[#DDE2C6]/10"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#DDE2C6]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="flex items-center gap-4 mb-4 relative">
          <Sparkles className="w-8 h-8 text-[#DDE2C6]" />
          <h2 className="text-3xl font-bold text-[#DDE2C6]">My Superpower</h2>
        </div>
        <p className="text-lg text-[#DDE2C6]/80 relative">
          I transform complex technical challenges into simple, powerful digital solutions using AI and smart engineering
        </p>
      </motion.section>

      {/* What Makes Me Different Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <Lightbulb className="w-8 h-8 text-[#DDE2C6]" />
          <h2 className="text-3xl font-bold text-[#DDE2C6]">What Makes Me Different</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] shadow-xl border border-[#DDE2C6]/10"
          >
            <Code className="w-6 h-6 text-[#DDE2C6] mb-4" />
            <p className="text-[#DDE2C6]/80">I don't just write code, I solve business problems</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] shadow-xl border border-[#DDE2C6]/10"
          >
            <Brain className="w-6 h-6 text-[#DDE2C6] mb-4" />
            <p className="text-[#DDE2C6]/80">AI is my secret weapon</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] shadow-xl border border-[#DDE2C6]/10"
          >
            <Rocket className="w-6 h-6 text-[#DDE2C6] mb-4" />
            <p className="text-[#DDE2C6]/80">Every project is a unique digital strategy</p>
          </motion.div>
        </div>
      </motion.section>

      {/* My Approach Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] p-8 shadow-xl border border-[#DDE2C6]/10"
      >
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#DDE2C6]/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        <h2 className="text-3xl font-bold text-[#DDE2C6] mb-6 relative">My Approach</h2>
        <ul className="space-y-4 relative">
          <motion.li 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-lg text-[#DDE2C6]/80 p-4 rounded-lg bg-[#DDE2C6]/5"
          >
            <div className="w-2 h-2 rounded-full bg-[#DDE2C6]" />
            Deep understanding of your business
          </motion.li>
          <motion.li 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-lg text-[#DDE2C6]/80 p-4 rounded-lg bg-[#DDE2C6]/5"
          >
            <div className="w-2 h-2 rounded-full bg-[#DDE2C6]" />
            Custom AI-powered solutions
          </motion.li>
          <motion.li 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-lg text-[#DDE2C6]/80 p-4 rounded-lg bg-[#DDE2C6]/5"
          >
            <div className="w-2 h-2 rounded-full bg-[#DDE2C6]" />
            Technology that grows with you
          </motion.li>
        </ul>
      </motion.section>

      {/* Tools Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-[#DDE2C6]">Tools in My Digital Toolkit</h2>
        
        <div className="rounded-2xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] p-8 shadow-xl border border-[#DDE2C6]/10">
          <LogoCarousel
            logos={[
              { src: "/react.png", alt: "React" },
              { src: "/11120662_fi_brands_typescript_icon.png", alt: "TypeScript" },
              { src: "/9055799_bxl_tailwind_css_icon.png", alt: "Tailwind CSS" },
              { src: "/framer-motion-seeklogo.png", alt: "Framer Motion" },
              { src: "/convex.png", alt: "Convex" },
              { src: "/windsurf-logo.png", alt: "Windsurf" },
            ]}
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-4 p-6 rounded-xl bg-[#DDE2C6]/5"
            >
              <h3 className="text-xl font-semibold text-[#DDE2C6]">Frontend</h3>
              <ul className="space-y-2">
                {["React", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <motion.li 
                    key={tech}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-[#DDE2C6]/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DDE2C6]" />
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-4 p-6 rounded-xl bg-[#DDE2C6]/5"
            >
              <h3 className="text-xl font-semibold text-[#DDE2C6]">Backend & Tools</h3>
              <ul className="space-y-2">
                {["Convex", "Git", "Windsurf"].map((tech) => (
                  <motion.li 
                    key={tech}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-[#DDE2C6]/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DDE2C6]" />
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How We Work Together Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-[#DDE2C6] mb-8">How We Work Together</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Discovery", desc: "Understanding your vision" },
            { title: "Design", desc: "Crafting your unique solution" },
            { title: "Development", desc: "Building with precision" },
            { title: "Delivery", desc: "Transforming your business" }
          ].map((step, index) => (
            <motion.div
              key={step.title}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl bg-gradient-to-br from-[#1C1F37] to-[#2A2F4C] shadow-xl border border-[#DDE2C6]/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#DDE2C6]/10 flex items-center justify-center text-[#DDE2C6] font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-[#DDE2C6]/90">{step.title}</h3>
              </div>
              <p className="text-[#DDE2C6]/80">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center pt-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <Button
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-[#DDE2C6] to-[#C2C7AB] text-[#1C1F37] hover:from-[#DDE2C6]/90 hover:to-[#C2C7AB]/90 text-lg px-8 py-6 shadow-lg"
          >
            Let's Turn Your Tech Challenges into Opportunities
          </Button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
