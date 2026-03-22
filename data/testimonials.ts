export interface Testimonial {
  id:      string;
  name:    string;
  title:   string;
  company: string;
  avatar?: string;
  text:    string;
  linkedin?: string;
}

// Edit this file to add real LinkedIn recommendations
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    title: "Engineering Manager",
    company: "ThoughtWorks",
    text: "Rajat is one of the most thoughtful mobile architects I've worked with. He has a rare ability to balance technical depth with delivery pragmatism — he'll push back on over-engineering while still landing a clean, scalable solution. His mentorship of junior engineers on our team was genuinely transformative.",
  },
  {
    id: "2",
    name: "Arun Sharma",
    title: "Senior Product Manager",
    company: "REA Group",
    text: "Working with Rajat on the iOS platform was a great experience. He owned the SwiftUI architecture end-to-end, proactively flagged risks early, and delivered the map clustering feature weeks ahead of schedule. More importantly, he made the right technical calls under pressure.",
  },
  {
    id: "3",
    name: "James Chen",
    title: "Head of Engineering",
    company: "Standard Chartered",
    text: "Rajat led the mobile engineering stream for our Next Gen Banking project with quiet confidence. He mentored 5 engineers, ran architecture reviews, and drove a 35% improvement in module usability metrics. He is exactly the kind of senior iOS engineer you want on a high-stakes platform.",
  },
];
