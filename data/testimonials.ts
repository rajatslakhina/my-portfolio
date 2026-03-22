export interface Testimonial {
  id:      string;
  name:    string;
  title:   string;
  company: string;
  avatar?: string;
  text:    string;
  linkedin?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Gaurav Katiyar",
    title: "Technical Architect",
    company: "HCLTech",
    text: "Working with Rajat has been a great experience. He\u2019s one of those developers who\u2019s always willing to help, share knowledge, and collaborate to solve problems effectively. I\u2019ve seen him take ownership of challenging tasks, debug complex issues, and consistently deliver quality work on time. His strong sense of teamwork and positive attitude make projects smoother and more enjoyable. Any team would be lucky to have Rajat \u2014 a reliable developer and an even better teammate.",
    linkedin: "https://www.linkedin.com/in/rajat-s-lakhina-952785107/",
  },
  {
    id: "2",
    name: "Bharat Devgan",
    title: "Lead Developer",
    company: "Swift & SwiftUI",
    text: "I had the pleasure of working with Rajat, an exceptionally talented iOS Developer who brings both technical depth and a strong problem-solving mindset to every project. Rajat has a solid command over SwiftUI, Combine, and the Singleton pattern, and he has successfully implemented various iOS design patterns across multiple projects. What stands out most about Rajat is his ability to combine clean architecture with practical, real-world solutions \u2014 especially in the banking domain, where reliability and performance are crucial.",
    linkedin: "https://www.linkedin.com/in/rajat-s-lakhina-952785107/",
  },
];
