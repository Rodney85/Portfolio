import { motion } from "framer-motion";
import { Code, Sparkles, Lightbulb, Brain, Rocket } from "lucide-react";
import { LogoCarousel } from "../components/ui/logo-carousel";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-6 sm:px-8 space-y-16 overflow-x-hidden"
    >
      {/* Who I Am Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 p-8 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7F6B]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <h1 className="text-4xl font-serif text-[#93C5B5] mb-4 relative drop-shadow-sm">Who I Am</h1>
        <p className="text-xl text-[#E8D5C4] relative">
          I'm Rodney Mutwiri - a passionate Software Engineer with a background in Information Technology and expertise in AI Prompt Engineering. I transform complex technical challenges into simple, powerful digital solutions by leveraging cutting-edge technology and AI capabilities.
        </p>
      </motion.section>

      {/* My Superpower Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 p-8 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF7F6B]/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="flex items-center gap-4 mb-4 relative">
          <Sparkles className="w-8 h-8 text-[#FF7F6B]" />
          <h2 className="text-3xl font-serif text-[#93C5B5] drop-shadow-sm">My Superpower</h2>
        </div>
        <p className="text-lg text-[#E8D5C4] relative">
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
          <Lightbulb className="w-8 h-8 text-[#FF7F6B]" />
          <h2 className="text-3xl font-serif text-[#93C5B5] drop-shadow-sm">What Makes Me Different</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            <Code className="w-6 h-6 text-[#FF7F6B] mb-4 relative" />
            <p className="text-[#E8D5C4] relative">I don't just write code, I solve business problems</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            <Brain className="w-6 h-6 text-[#FF7F6B] mb-4 relative" />
            <p className="text-[#E8D5C4] relative">AI is my secret weapon</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            <Rocket className="w-6 h-6 text-[#FF7F6B] mb-4 relative" />
            <p className="text-[#E8D5C4] relative">Every project is a unique digital strategy</p>
          </motion.div>
        </div>
      </motion.section>

      {/* My Approach Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 p-8 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF7F6B]/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        <h2 className="text-3xl font-serif text-[#93C5B5] mb-6 relative drop-shadow-sm">My Approach</h2>
        <ul className="space-y-4 relative">
          <motion.li 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-lg text-[#E8D5C4] p-4 rounded-xl bg-[#93C5B5]/5 backdrop-blur-sm border border-[#93C5B5]/10 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF7F6B]" />
            Deep understanding of your business
          </motion.li>
          <motion.li 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-lg text-[#E8D5C4] p-4 rounded-xl bg-[#93C5B5]/5 backdrop-blur-sm border border-[#93C5B5]/10 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF7F6B]" />
            Custom AI-powered solutions
          </motion.li>
          <motion.li 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-lg text-[#E8D5C4] p-4 rounded-xl bg-[#93C5B5]/5 backdrop-blur-sm border border-[#93C5B5]/10 transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF7F6B]" />
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
        <h2 className="text-3xl font-serif text-[#93C5B5] drop-shadow-sm">Tools in My Digital Toolkit</h2>
        
        <div className="rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 p-8 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
          <LogoCarousel
            logos={[
              { src: "/react.png", alt: "React" },
              { src: "/11120662_fi_brands_typescript_icon.png", alt: "TypeScript" },
              { src: "/9055799_bxl_tailwind_css_icon.png", alt: "Tailwind CSS" },
              { src: "/framer-motion-seeklogo.png", alt: "Framer Motion" },
              { src: "/convex.png", alt: "Convex" },
              { src: "/windsurf-logo.png", alt: "Windsurf" },
            ]}
            className="mb-8 relative"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-4 p-6 rounded-xl bg-[#93C5B5]/5 backdrop-blur-sm border border-[#93C5B5]/10"
            >
              <h3 className="text-xl font-medium text-[#93C5B5]">Frontend</h3>
              <ul className="space-y-2">
                {["React", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <motion.li 
                    key={tech}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-[#E8D5C4]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F6B]" />
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="space-y-4 p-6 rounded-xl bg-[#93C5B5]/5 backdrop-blur-sm border border-[#93C5B5]/10"
            >
              <h3 className="text-xl font-medium text-[#93C5B5]">Backend & Tools</h3>
              <ul className="space-y-2">
                {["Convex", "Git", "Windsurf"].map((tech) => (
                  <motion.li 
                    key={tech}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-[#E8D5C4]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF7F6B]" />
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
        <h2 className="text-3xl font-serif text-[#93C5B5] mb-8 drop-shadow-sm">How We Work Together</h2>
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
              className="p-6 rounded-2xl bg-gradient-to-br from-[#93C5B5]/10 to-[#93C5B5]/5 shadow-lg border border-[#93C5B5]/10 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
              <span className="text-[#FF7F6B]/50 text-6xl font-bold absolute top-4 right-4">0{index + 1}</span>
              <div className="relative">
                <h3 className="text-xl font-medium text-[#93C5B5] mb-2">{step.title}</h3>
                <p className="text-[#E8D5C4]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center space-y-6"
      >
        <h2 className="text-3xl font-serif text-[#93C5B5] drop-shadow-sm">Ready to Build Something Amazing?</h2>
        <Button
          onClick={() => navigate('/contact')}
          className="bg-gradient-to-r from-[#FF7F6B] to-[#FF7F6B]/90 text-[#134E4A] px-8 py-3 rounded-xl hover:from-[#FF7F6B]/90 hover:to-[#FF7F6B] transition-all font-medium shadow-lg shadow-[#FF7F6B]/10"
        >
          Let's Talk
        </Button>
      </motion.section>
    </motion.div>
  );
}
