import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { SocialLink } from "@/components/ui/social-link";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold text-[#DDE2C6] mb-6"
      >
        About Me
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6 text-[#DDE2C6]/80"
      >
        <p>
          Hi, I'm Rodney Mutwiri, a passionate software developer with a focus on creating
          intuitive and efficient solutions. I specialize in full-stack development,
          with expertise in modern web technologies and AI integration.
        </p>

        <p>
          My journey in software development started with a curiosity about how
          things work, which led me to explore various programming languages and
          frameworks. Today, I work on projects that combine cutting-edge
          technology with practical solutions.
        </p>

        <div className="py-4">
          <h2 className="text-2xl font-semibold text-[#DDE2C6] mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SkillCategory title="Frontend" skills={["React", "TypeScript", "Tailwind CSS", "Framer Motion"]} />
            <SkillCategory title="Backend" skills={["Node.js", "Python", "FastAPI", "MongoDB"]} />
            <SkillCategory title="Tools" skills={["Git", "Docker", "AWS", "VS Code"]} />
          </div>
        </div>

        <div className="pt-8">
          <h2 className="text-2xl font-semibold text-[#DDE2C6] mb-4">Let's Connect</h2>
          <div className="flex gap-4">
            <SocialLink href="https://github.com/yourusername" icon={<Github className="w-5 h-5" />} variant="ghost" />
            <SocialLink href="https://twitter.com/yourusername" icon={<Twitter className="w-5 h-5" />} variant="ghost" />
            <SocialLink href="https://linkedin.com/in/yourusername" icon={<Linkedin className="w-5 h-5" />} variant="ghost" />
            <SocialLink href="mailto:your.email@example.com" icon={<Mail className="w-5 h-5" />} variant="ghost" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="text-[#DDE2C6] font-medium mb-2">{title}</h3>
      <ul className="space-y-1">
        {skills.map((skill) => (
          <li key={skill} className="text-[#DDE2C6]/70">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
